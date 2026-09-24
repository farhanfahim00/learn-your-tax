import { useState } from "react"
import { calculateTax } from "../lib/taxEngine"
import type { ResidenceStatus, TaxResult } from "../lib/taxEngine"

function TaxQuestions() {
  // step = which question we're on (0,1,2...). Last step shows the result.
  const [step, setStep] = useState(0)

  // The answers we collect as we go.
  const [status, setStatus] = useState<ResidenceStatus | null>(null)
  const [grossMonthly, setGrossMonthly] = useState<string>("")
  const [weeklyHours, setWeeklyHours] = useState<string>("")

  // The computed result (null until we calculate at the end).
  const [result, setResult] = useState<TaxResult | null>(null)

  // Run the engine with collected answers, then move to the result screen.
  function handleFinish() {
    const res = calculateTax({
      status: status!,                       // "!" = we know it's set by now
      grossMonthly: Number(grossMonthly),
      weeklyHours: weeklyHours ? Number(weeklyHours) : undefined,
    })
    setResult(res)
    setStep(99) // jump to result view
  }

  const euro = (n: number) =>
    n.toLocaleString("de-DE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 })

  return (
    <section className="py-24 px-8">
      <div className="max-w-xl mx-auto">

        {/* --- STEP 0: residence status --- */}
        {step === 0 && (
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              What's your situation?
            </h2>
            <div className="grid gap-3">
              {([
                ["werkstudent", "Working student (Werkstudent)"],
                ["employee", "Full-time employee"],
                ["bluecard", "Blue Card holder"],
                ["citizen", "German citizen"],
              ] as [ResidenceStatus, string][]).map(([value, label]) => (
                <button
                  key={value}
                  onClick={() => { setStatus(value); setStep(1) }}
                  className={`text-left px-5 py-4 rounded-xl border transition ${
                    status === value
                      ? "border-slate-900 bg-slate-50"
                      : "border-slate-200 hover:border-slate-400"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* --- STEP 1: gross monthly salary --- */}
        {step === 1 && (
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              What's your gross monthly salary?
            </h2>
            <input
              type="number"
              value={grossMonthly}
              onChange={(e) => setGrossMonthly(e.target.value)}
              placeholder="e.g. 1400"
              className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:border-slate-900 outline-none"
            />
            <p className="mt-2 text-sm text-slate-500">Gross = before deductions (Brutto).</p>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setStep(0)}
                className="px-5 py-3 rounded-xl border border-slate-300 text-slate-700"
              >
                Back
              </button>
              <button
                disabled={!grossMonthly}
                onClick={() => setStep(status === "werkstudent" ? 2 : 99)}
                onClickCapture={() => { if (status !== "werkstudent") handleFinish() }}
                className="px-5 py-3 rounded-xl bg-slate-900 text-white disabled:opacity-40"
              >
                {status === "werkstudent" ? "Next" : "See result"}
              </button>
            </div>
          </div>
        )}

        {/* --- STEP 2: weekly hours (werkstudent only) --- */}
        {step === 2 && (
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              How many hours per week do you work?
            </h2>
            <input
              type="number"
              value={weeklyHours}
              onChange={(e) => setWeeklyHours(e.target.value)}
              placeholder="e.g. 18"
              className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:border-slate-900 outline-none"
            />
            <p className="mt-2 text-sm text-slate-500">
              The 20-hour limit affects the Werkstudent privilege.
            </p>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="px-5 py-3 rounded-xl border border-slate-300 text-slate-700"
              >
                Back
              </button>
              <button
                disabled={!weeklyHours}
                onClick={handleFinish}
                className="px-5 py-3 rounded-xl bg-slate-900 text-white disabled:opacity-40"
              >
                See result
              </button>
            </div>
          </div>
        )}

        {/* --- RESULT --- */}
        {step === 99 && result && (
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              Your estimated breakdown
            </h2>

            <div className="rounded-2xl border border-slate-200 divide-y divide-slate-100">
              <Row label="Gross (yearly)" value={euro(result.grossYearly)} />
              <Row label="Income tax" value={euro(result.incomeTax)} />
              <Row label="Pension" value={euro(result.pension)} />
              {result.health > 0 && <Row label="Health insurance" value={euro(result.health)} />}
              {result.care > 0 && <Row label="Care insurance" value={euro(result.care)} />}
              {result.unemployment > 0 && <Row label="Unemployment insurance" value={euro(result.unemployment)} />}
              <Row label="Net (yearly)" value={euro(result.netYearly)} bold />
              <Row label="Net (monthly)" value={euro(result.netMonthly)} bold />
            </div>

            <div className="mt-6 space-y-3">
              {result.notes.map((note, i) => (
                <p key={i} className="text-sm text-slate-600 bg-slate-50 rounded-lg px-4 py-3">
                  {note}
                </p>
              ))}
            </div>

            <button
              onClick={() => { setStep(0); setResult(null); setStatus(null); setGrossMonthly(""); setWeeklyHours("") }}
              className="mt-8 px-5 py-3 rounded-xl border border-slate-300 text-slate-700"
            >
              Start over
            </button>
          </div>
        )}

      </div>
    </section>
  )
}

// A small helper component for each result row.
function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className="flex justify-between px-5 py-4">
      <span className={bold ? "font-semibold text-slate-900" : "text-slate-600"}>{label}</span>
      <span className={bold ? "font-semibold text-slate-900" : "text-slate-900"}>{value}</span>
    </div>
  )
}

export default TaxQuestions
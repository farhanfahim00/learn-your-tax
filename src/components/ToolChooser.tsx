import { useState } from "react"

import { Upload, MessageCircleQuestion } from "lucide-react"

// A TypeScript type: the choice can only ever be one of these three values.
// null = nothing chosen yet. This prevents typos like "payslp" — TS will catch them.
type Tool = "payslip" | "questions" | null

function ToolChooser() {
  // Declare state.
  //   selectedTool      -> the current value (starts as null: nothing chosen)
  //   setSelectedTool   -> the ONLY way to change it; calling it re-renders the UI
  // The <Tool> tells TypeScript what kind of value this state holds.
  const [selectedTool, setSelectedTool] = useState<Tool>(null)

  return (
    <section id="start" className="py-24 px-8 bg-slate-50">
      <div className="max-w-5xl mx-auto">

        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
            Start Here
          </h2>
          <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
            Decode a payslip you already have, or answer a few questions to
            understand your taxes from scratch.
          </p>
        </div>

        {/* Two cards side by side (stack on mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* CARD 1: Payslip.
              onClick calls setSelectedTool("payslip") — this changes state,
              which triggers a re-render. cursor-pointer + hover styles make it
              feel clickable. transition smooths the hover color change. */}
          <button
  onClick={() => setSelectedTool("payslip")}
  className="text-left bg-white p-10 rounded-2xl border border-slate-200 hover:border-slate-900 transition cursor-pointer"
>
  {/* Icon badge.
      A rounded square background with the icon centered inside.
      w-12 h-12 -> badge size
      bg-slate-100 -> light grey square
      The <Upload /> component:
        size={24}      -> icon size in pixels
        className="text-slate-900" -> icon color (icons inherit text color) */}
  <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center mb-6">
    <Upload size={24} className="text-slate-900" />
  </div>

  <h3 className="text-xl font-semibold text-slate-900">
    Understand your payslip
  </h3>
  <p className="mt-3 text-sm text-slate-600 leading-relaxed">
    Upload or paste your German payslip and see what every deduction
    means.
  </p>
  <span className="mt-6 inline-block text-sm font-medium text-slate-900">
    Upload document →
  </span>
</button>

          {/* CARD 2: Questions */}
          <button
  onClick={() => setSelectedTool("questions")}
  className="text-left bg-white p-10 rounded-2xl border border-slate-200 hover:border-slate-900 transition cursor-pointer"
>
  <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center mb-6">
    <MessageCircleQuestion size={24} className="text-slate-900" />
  </div>

  <h3 className="text-xl font-semibold text-slate-900">
    Understand your taxes
  </h3>
  <p className="mt-3 text-sm text-slate-600 leading-relaxed">
    Answer a few simple questions about your situation and get your
    estimated tax bracket explained clearly, step by step.
  </p>
  <span className="mt-6 inline-block text-sm font-medium text-slate-900">
    Start answering →
  </span>
</button>

        </div>

        {/* CONDITIONAL RENDERING (temporary placeholder).
            {selectedTool && (...)} means: if selectedTool is NOT null, show this.
            This is how we'll later swap in the actual tool. For now it just
            confirms the click + state are working. */}
        {selectedTool && (
          <div className="mt-10 text-center text-slate-700">
            You selected: <strong>{selectedTool}</strong> — the tool will load here.
          </div>
        )}

      </div>
    </section>
  )
}

export default ToolChooser
// ============================================================
// German tax calculation engine — 2026 values
// Educational estimate only. Not Steuerberatung.
// Sources: Grundfreibetrag €12,348; brackets per Einkommensteuertabelle 2026.
// ============================================================

export type ResidenceStatus = "werkstudent" | "employee" | "bluecard" | "citizen"

export interface TaxInput {
  status: ResidenceStatus
  grossMonthly: number   // gross salary per month, in EUR
  weeklyHours?: number    // only relevant for werkstudent (20h rule)
}

export interface TaxResult {
  grossYearly: number
  incomeTax: number          // yearly Lohn-/Einkommensteuer estimate
  pension: number            // yearly Rentenversicherung (employee share)
  health: number             // yearly Krankenversicherung (employee share)
  care: number               // yearly Pflegeversicherung (employee share)
  unemployment: number       // yearly Arbeitslosenversicherung (employee share)
  totalDeductions: number
  netYearly: number
  netMonthly: number
  steuerklasse: string
  notes: string[]            // plain-English caveats for the explanation layer
}

// --- 2026 constants ---
const GRUNDFREIBETRAG = 12348

// Employee social insurance rates (employee share only, 2026, approximate)
const RATE_PENSION = 0.093        // 9.3%
const RATE_HEALTH = 0.073 + 0.0125 // 7.3% base + ~1.25% avg Zusatzbeitrag (half of 2.5%)
const RATE_CARE = 0.018           // ~1.8% (childless, without Beitragszuschlag detail)
const RATE_UNEMPLOYMENT = 0.013   // 1.3%

// Progressive income tax on TAXABLE income (zu versteuerndes Einkommen), 2026 brackets.
function calcIncomeTax(taxable: number): number {
  if (taxable <= GRUNDFREIBETRAG) return 0

  // Bracket 1: 12,348–17,799 -> 14% to 24% progressive
  // Bracket 2: 17,799–69,878 -> 24% to 42% progressive
  // Bracket 3: 69,878–277,825 -> flat 42%
  // Bracket 4: above 277,825 -> flat 45%
  // Simplified linear-progression approximation within each band.
  if (taxable <= 17799) {
    const over = taxable - GRUNDFREIBETRAG
    const avgRate = 0.14 + (0.24 - 0.14) * (over / (17799 - GRUNDFREIBETRAG)) / 2
    return over * avgRate
  }
  if (taxable <= 69878) {
    const band1 = (17799 - GRUNDFREIBETRAG) * ((0.14 + 0.24) / 2)
    const over = taxable - 17799
    const avgRate = 0.24 + (0.42 - 0.24) * (over / (69878 - 17799)) / 2
    return band1 + over * avgRate
  }
  const band1 = (17799 - GRUNDFREIBETRAG) * ((0.14 + 0.24) / 2)
  const band2 = (69878 - 17799) * ((0.24 + 0.42) / 2)
  if (taxable <= 277825) {
    return band1 + band2 + (taxable - 69878) * 0.42
  }
  return band1 + band2 + (277825 - 69878) * 0.42 + (taxable - 277825) * 0.45
}

export function calculateTax(input: TaxInput): TaxResult {
  const grossYearly = input.grossMonthly * 12
  const notes: string[] = []

  const isWerkstudent = input.status === "werkstudent"
  const over20h = isWerkstudent && (input.weeklyHours ?? 0) > 20

  // --- Social insurance ---
  let pension = 0, health = 0, care = 0, unemployment = 0

  if (isWerkstudent && !over20h) {
    // Werkstudentenprivileg: only pension applies.
    pension = grossYearly * RATE_PENSION
    notes.push(
      "As a Werkstudent under 20 hours/week, you only pay the 9.3% pension contribution. You are exempt from health, care, and unemployment insurance (Werkstudentenprivileg)."
    )
  } else {
    pension = grossYearly * RATE_PENSION
    health = grossYearly * RATE_HEALTH
    care = grossYearly * RATE_CARE
    unemployment = grossYearly * RATE_UNEMPLOYMENT
    if (over20h) {
      notes.push(
        "Working more than 20 hours/week during term can cost you the Werkstudent privilege, meaning full social insurance applies."
      )
    }
  }

  const socialTotal = pension + health + care + unemployment

  // --- Taxable income (rough): gross minus social contributions ---
  const taxable = Math.max(0, grossYearly - socialTotal)
  const incomeTax = calcIncomeTax(taxable)

  // --- Steuerklasse (simplified, single person) ---
  const steuerklasse = "1 (single, one job)"

  if (incomeTax === 0) {
    notes.push(
      `Your taxable income is below the €${GRUNDFREIBETRAG.toLocaleString("de-DE")} Grundfreibetrag, so no income tax is due. Filing a return may refund any Lohnsteuer already withheld.`
    )
  }

  const totalDeductions = socialTotal + incomeTax
  const netYearly = grossYearly - totalDeductions

  notes.push("This is an educational estimate, not tax advice. It excludes church tax, marital splitting, and children.")

  return {
    grossYearly,
    incomeTax,
    pension,
    health,
    care,
    unemployment,
    totalDeductions,
    netYearly,
    netMonthly: netYearly / 12,
    steuerklasse,
    notes,
  }
}
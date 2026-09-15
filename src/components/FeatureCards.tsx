// Step 1: Define the content as DATA — an array of objects.
// Each object is one card. To add/remove/edit a card, you edit this array,
// not the markup below. This separation (data vs. presentation) is the point.
const features = [
  {
    title: "Guided tax breakdown",
    description:
      "Answer a few questions about your residence status, income, and expenses, and get your estimated tax bracket explained step by step.",
  },
  {
    title: "Payslip decoder",
    description:
      "Paste or upload your German payslip and see what every line means: Lohnsteuer, Soli, pension, health insurance (all processed on your device SAFELY).",
  },
  {
    title: "Built for internationals",
    description:
      "Special rules like the Werkstudent privilege and Steuerklassen are explained in plain English, not bureaucratic German.",
  },
]

function FeatureCards() {
  return (
    // id="features" lets the navbar "Features" link scroll here (#features).
    //   py-24    -> vertical breathing room
    //   px-8     -> horizontal padding
    //   bg-slate-50 -> a very light grey background, so this section visually
    //                  separates from the white hero above it
    <section id="features" className="py-24 px-8 bg-slate-50">
      <div className="max-w-5xl mx-auto">

        {/* Section heading, centered above the cards */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
            Everything you need to make sense of your taxes
          </h2>
          <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
            Three simple tools that turn Germany's confusing tax system into
            something you can actually understand.
          </p>
        </div>

        {/* The GRID.
            grid              -> use CSS grid layout
            grid-cols-1       -> 1 column by default (mobile: cards stack)
            md:grid-cols-3    -> 3 columns on medium+ screens (cards go side by side)
            gap-6             -> space between grid cells */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Step 2: LOOP over the data with .map().
              For each `feature` object, return one card.
              `key` must be unique per item — React uses it to track list items. */}
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-white p-8 rounded-2xl border border-slate-100"
            >
              <h3 className="text-lg font-semibold text-slate-900">
                {feature.title}
              </h3>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  )
}

export default FeatureCards
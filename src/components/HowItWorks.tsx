// Data first, as before: each step is an object in an array.
const steps = [
  {
    number: "1",
    title: "Answer a few questions",
    description:
      "Tell us your residence status, rough income, and living costs. Takes about two minutes.",
  },
  {
    number: "2",
    title: "See your breakdown",
    description:
      "Get your estimated tax bracket and social contributions, explained clearly in plain English.",
  },
  {
    number: "3",
    title: "Understand your payslip",
    description:
      "Optionally decode a real payslip, line by line, entirely on your own device.",
  },
]

function HowItWorks() {
  return (
    // id="how-it-works" matches the navbar link (#how-it-works)
    <section id="how-it-works" className="py-24 px-8">
      <div className="max-w-5xl mx-auto">

        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
            How it works
          </h2>
          <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
            Three steps from confused to clear.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {steps.map((step) => (
            <div key={step.number} className="text-center">

              {/* The number badge — a circle with the step number.
                  w-12 h-12       -> fixed width & height (square)
                  rounded-full    -> fully rounded = a circle
                  bg-slate-900    -> dark fill
                  text-white      -> white number
                  flex items-center justify-center -> center the number inside
                  mx-auto         -> center the circle itself horizontally
                  font-semibold   -> slightly bolder number */}
              <div className="w-12 h-12 rounded-full bg-slate-900 text-white flex items-center justify-center mx-auto font-semibold">
                {step.number}
              </div>

              <h3 className="mt-6 text-lg font-semibold text-slate-900">
                {step.title}
              </h3>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default HowItWorks
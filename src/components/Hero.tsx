function Hero() {
  return (
    // <section> is semantic HTML for a distinct page section.
    //   py-24        -> large vertical padding, gives the hero breathing room
    //   px-8         -> horizontal padding so text doesn't touch screen edges
    //   text-center  -> center-align all the text inside
    <section className="py-24 px-8 text-center">
      {/* Inner container: caps width and centers it.
          max-w-3xl -> don't let content get wider than ~48rem
          mx-auto   -> auto left/right margins = horizontally centered */}
      <div className="max-w-3xl mx-auto">

        {/* Headline.
            text-5xl md:text-6xl -> responsive size (bigger on desktop)
            font-bold            -> heavy weight
            tracking-tight       -> pull letters slightly closer (looks cleaner at large sizes)
            text-slate-900       -> near-black
            leading-tight        -> reduce line spacing so a 2-line headline stays compact */}
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-slate-900 leading-tight">
          Understand your German taxes in plain English
        </h1>

        {/* Supporting text.
            mt-6          -> margin top, space below the headline
            text-lg       -> slightly larger than body text
            text-slate-600-> softer grey so it sits below the headline in hierarchy
            max-w-xl mx-auto -> keep this line narrower than the headline, centered */}
        <p className="mt-6 text-lg text-slate-600 max-w-xl mx-auto">
          Answer a few simple questions or upload your payslip and get a clear
          breakdown of your tax bracket, social contributions, and what your
          payslip actually means. No data leaves your device. (100% Safe and Secure)
        </p>

        {/* CTA button row.
            mt-10 -> space above the buttons
            flex gap-4 justify-center -> lay buttons in a centered row with spacing */}
        <div className="mt-10 flex gap-4 justify-center">
          <button className="bg-slate-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-slate-700">
            Get started
          </button>
          <button className="border border-slate-300 text-slate-700 px-6 py-3 rounded-lg font-medium hover:border-slate-400">
            How it works
          </button>
        </div>

      </div>
    </section>
  )
}

export default Hero
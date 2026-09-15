function Navbar() {
  return (
    // <nav> is semantic HTML — it tells the browser "this is navigation".
    // Tailwind classes, decoded:
    //   flex            -> lay children out in a row
    //   items-center    -> vertically center them
    //   justify-between -> push first child left, last child right, space between
    //   px-8            -> horizontal padding (left + right)
    //   py-4            -> vertical padding (top + bottom)
    //   border-b        -> a thin line along the bottom edge
    //   border-slate-100-> make that line a very light grey
    <nav className="flex items-center justify-between px-8 py-4 border-b border-slate-100">
      {/* Left side: the logo / brand name */}
      <div className="text-xl font-bold text-slate-900">
        Learn Your Tax
      </div>

      {/* Middle: navigation links.
          hidden md:flex -> hidden on small screens, shown as a row on medium+ screens.
          This is responsive design: mobile users won't see these inline links. */}
      <div className="hidden md:flex items-center gap-8 text-sm text-slate-600">
        <a href="#features" className="hover:text-slate-900">Features</a>
        <a href="#how-it-works" className="hover:text-slate-900">How it works</a>
        <a href="#faq" className="hover:text-slate-900">FAQ</a>
      </div>

      {/* Right side: the call-to-action button */}
      <button className="bg-slate-900 text-white text-sm px-4 py-2 rounded-lg hover:bg-slate-700">
        Get started
      </button>
    </nav>
  )
}

export default Navbar
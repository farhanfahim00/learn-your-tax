import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import FeatureCards from "./components/FeatureCards"
import HowItWorks from "./components/HowItWorks"
import ToolChooser from "./components/ToolChooser"
import TaxQuestions from "./components/TaxQuestions"

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <FeatureCards />
      <ToolChooser />
      <TaxQuestions />
    </div>
  )
}

export default App
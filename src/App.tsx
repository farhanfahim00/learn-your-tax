import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import FeatureCards from "./components/FeatureCards"

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <FeatureCards />
    </div>
  )
}

export default App
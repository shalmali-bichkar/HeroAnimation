import Hero from "./components/Hero";
import CardsSection from "./components/CardsSection";

function App() {
  return (
    <div className="bg-black text-white">
      <Hero />
      <CardsSection /> {/* 👈 replace scroll section */}
    </div>
  );
}

export default App;
import { useMemo, useState } from "react";
import { carsData } from "../data/cars"; // இங்கிருந்து டேட்டாவை எடுக்கிறோம்
import CarCard from "../components/CarCard";

export default function FleetPage() {
  // loading தேவையில்லை, ஏனென்றால் டேட்டா இங்கேயே இருக்கிறது
  const [cars] = useState(carsData);
  const [filter, setFilter] = useState("All");

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(cars.map((car) => car.category)))],
    [cars]
  );

  const list = useMemo(
    () => (filter === "All" ? cars : cars.filter((car) => car.category === filter)),
    [filter, cars]
  );

  return (
    <main>
      {/* உங்கள் FilterBar மற்றும் மற்ற கோட் அப்படியே இருக்கும் */}
      <div className="grid">
        {list.map((car) => (
          <CarCard key={car.id} car={car} variant="detailed" />
        ))}
      </div>
    </main>
  );
}
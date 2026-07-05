import { useMemo, useState } from "react";
import useCars from "../hooks/useCars";
import CarCard, { CarCardSkeleton } from "../components/CarCard";

const SKELETON_KEYS = Array.from({ length: 6 }, (_, i) => `fleet-sk-${i}`);

function FilterBar({ categories, active, onChange }) {
  return (
    <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onChange(category)}
          className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors border ${
            active === category
              ? "bg-[#c08856] text-white border-[#c08856]"
              : "bg-white text-[#0f0f10] border-neutral-200 hover:border-[#c08856]"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default function FleetPage() {
  const { cars, loading } = useCars();
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
    <main className="pt-32 pb-20 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="text-center max-w-3xl mx-auto">
          <div className="subtitle-kicker">Our Fleet</div>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-[#0f0f10] mt-3">
            Explore Our Complete Fleet
          </h1>
          <p className="text-neutral-600 mt-4 leading-relaxed">
            Every car in our fleet is regularly serviced, sanitised, and ready for your next adventure.
          </p>
        </div>

        <FilterBar categories={categories} active={filter} onChange={setFilter} />

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading
            ? SKELETON_KEYS.map((key) => <CarCardSkeleton key={key} />)
            : list.map((car) => <CarCard key={car.id} car={car} variant="detailed" />)}
        </div>
      </div>
    </main>
  );
}

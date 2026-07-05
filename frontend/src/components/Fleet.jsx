import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import useCars from "../hooks/useCars";
import CarCard, { CarCardSkeleton } from "./CarCard";

export default function Fleet({ limit }) {
  const { cars, loading } = useCars();
  const list = limit ? cars.slice(0, limit) : cars;
  const skeletonKeys = Array.from({ length: limit || 4 }, (_, i) => `sk-${i}`);

  console.log("Cars list:", list); // இது கன்சோலில் என்ன காட்டுகிறது?
  console.log("Loading state:", loading);
  console.log("Fleet Component Rendering...");

  return (
    <section className="section bg-white" id="fleet">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="text-center max-w-2xl mx-auto">
          <div className="subtitle-kicker">Our Premium Fleet</div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[#0f0f10] mt-3">
            Handpicked cars, ready when you are
          </h2>
          <p className="text-neutral-600 mt-4 leading-relaxed">
            Choose from our wide range of well-maintained vehicles for your consistent and comfortable journey.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading
            ? skeletonKeys.map((key) => <CarCardSkeleton key={key} />)
            : list.map((car) => <CarCard key={car.id} car={car} variant="compact" />)}
        </div>

        {limit && (
          <div className="mt-14 flex justify-center">
            <Link
              to="/fleet"
              className="inline-flex items-center gap-2 border-2 border-[#c08856] text-[#c08856] hover:bg-[#c08856] hover:text-white px-8 py-3 rounded-full font-semibold text-sm uppercase tracking-wider transition-colors"
            >
              View More <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

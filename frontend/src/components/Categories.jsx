import { ArrowUpRight } from "lucide-react";
import { CATEGORIES, CATEGORY_IMAGES } from "../mock";

export default function Categories() {
  return (
    <section className="section bg-white" id="about">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="text-center max-w-3xl mx-auto">
          <div className="subtitle-kicker">About Us</div>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-[#0f0f10] mt-3 leading-[1.05]">
            Your Trusted Self Drive Car Rental in Chennai
          </h2>
          <p className="text-neutral-600 mt-6 leading-relaxed max-w-2xl mx-auto">
            At dating-cars, we make travel flexible and stress-free with reliable self-drive cars in Chennai. Whether it’s a short city ride or a weekend getaway across Tamil Nadu, our well-maintained fleet is ready for your journey. Enjoy the freedom to drive without a driver, with simple pick-up and drop-off options citywide — all designed for your comfort, privacy, and convenience.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {CATEGORIES.map((cat, idx) => (
            <div
              key={cat.id}
              className={`category-card group relative rounded-2xl overflow-hidden bg-[#0f0f10] text-white p-7 min-h-[280px] flex flex-col justify-between cursor-pointer border border-white/5 ${
                idx === 0 ? "lg:row-span-2 lg:min-h-[580px]" : ""
              }`}
            >
              <img
                src={CATEGORY_IMAGES[cat.id]}
                alt={cat.title}
                className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-45 transition-opacity duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f10] via-[#0f0f10]/70 to-transparent" />

              <div className="relative z-10">
                <div className="w-10 h-10 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center">
                  <span className="w-4 h-4 rounded-sm bg-[#c08856]" />
                </div>
              </div>

              <div className="relative z-10">
                <h3 className="font-display text-3xl font-bold">{cat.title}</h3>
                <p className="text-white/70 mt-3 text-sm leading-relaxed max-w-sm">{cat.description}</p>
                <div className="mt-5 flex items-center justify-between">
                  <span className="text-[13px] text-[#c08856] font-semibold tracking-wider uppercase">Explore</span>
                  <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center group-hover:bg-[#c08856] group-hover:border-[#c08856] transition-colors">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center max-w-4xl mx-auto">
          <p className="text-neutral-600 leading-relaxed">
            Whether you’re a tourist, a working professional, or someone who prefers flexibility over owning a car, our self-drive car rentals in Chennai are designed to put you in control of your journey.
          </p>
          <h3 className="font-display text-3xl md:text-4xl font-bold text-[#0f0f10] mt-8 leading-tight">
            Drive how you want, where you want — with no ownership and no hidden fees.
          </h3>
        </div>
      </div>
    </section>
  );
}

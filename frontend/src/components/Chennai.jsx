import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function Chennai() {
  return (
    <section className="section bg-[#f7f5f2]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div className="relative order-2 lg:order-1">
          <img
            src="https://images.unsplash.com/photo-1724992609079-75164f1ba2dd?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHwxfHxjaGVubmFpJTIwbWFyaW5hJTIwYmVhY2h8ZW58MHx8fHwxNzgyNzM5MjA2fDA&ixlib=rb-4.1.0&q=85"
            alt="Chennai iconic landmark"
            className="w-full aspect-[5/4] object-cover rounded-2xl shadow-xl"
          />
          <div className="absolute -bottom-6 -right-6 hidden md:block bg-white rounded-2xl p-5 shadow-lg border border-neutral-200/70 max-w-[220px]">
            <div className="font-display text-3xl font-bold text-[#c08856]">5000+</div>
            <div className="text-sm text-neutral-600 mt-1">Happy travellers explored Chennai with us</div>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <div className="subtitle-kicker">Explore Chennai</div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[#0f0f10] mt-3 leading-tight">
            Drive Through Chennai <span className="brand-text">on Your Own Terms</span>
          </h2>
          <p className="text-neutral-600 mt-6 leading-relaxed text-lg">
            Experience Chennai your way with flexible self-drive car rentals. From Marina Beach to T. Nagar or Mylapore, travel freely and comfortably—on your own time, without a driver.
          </p>
          <ul className="mt-6 space-y-3">
            {[
              "Unlimited kilometre packages",
              "24x7 roadside assistance",
              "Doorstep delivery across Chennai",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3 text-neutral-700">
                <CheckCircle2 className="w-5 h-5 text-[#c08856]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <a
            href="#fleet"
            className="mt-8 inline-flex items-center gap-2 bg-[#0f0f10] hover:bg-[#2a2a2c] text-white px-8 py-4 rounded-full font-semibold tracking-wider text-sm uppercase transition-colors"
          >
            Book Now <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

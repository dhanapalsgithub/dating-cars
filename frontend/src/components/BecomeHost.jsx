import { CheckCircle2 } from "lucide-react";
import HostDialog from "./HostDialog";

const BENEFITS = ["No commitment.", "You set the price.", "We handle the rest."];

const STATS = [
  { k: "₹25k+", v: "Avg. monthly earnings" },
  { k: "1,200+", v: "Cars listed with us" },
  { k: "24/7", v: "Owner support" },
  { k: "100%", v: "Insured trips" },
];

export default function BecomeHost() {
  return (
    <section id="become-host" className="section bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="relative rounded-3xl overflow-hidden bg-[#0f0f10]">
          <img
            src="https://images.unsplash.com/photo-1612380635197-a025736ddba1?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHwzfHxtb3VudGFpbiUyMHJvYWQlMjBjYXJ8ZW58MHx8fHwxNzgyOTE5MzM4fDA&ixlib=rb-4.1.0&q=85"
            alt="Become a host"
            className="absolute inset-0 w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0f0f10] via-[#0f0f10]/85 to-[#0f0f10]/40" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center p-8 md:p-14 lg:p-16">
            <div>
              <div className="subtitle-kicker text-[#d9a373]">Earn With Us</div>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white mt-3 leading-tight">
                Become a Host with <span className="brand-text">Dating cars</span>
              </h2>
              <p className="text-white/75 mt-5 leading-relaxed max-w-xl">
                Turn your parked car into a passive income machine. Join our self-drive platform and start earning every time someone books your vehicle — flexible, secure, and hassle-free.
              </p>
              <ul className="mt-6 space-y-2.5">
                {BENEFITS.map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-white/90">
                    <CheckCircle2 className="w-5 h-5 text-[#c08856]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <HostDialog />
            </div>

            <div className="hidden lg:grid grid-cols-2 gap-4">
              {STATS.map((s) => (
                <div key={s.v} className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6">
                  <div className="font-display text-3xl font-bold text-[#c08856]">{s.k}</div>
                  <div className="text-white/70 mt-2 text-sm">{s.v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

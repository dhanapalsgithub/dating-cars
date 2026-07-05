import { CheckCircle2, ShieldCheck, Clock, MapPin, Sparkles, Award } from "lucide-react";

const VALUES = [
  { icon: ShieldCheck, title: "Fully Insured", text: "Every rental comes with comprehensive insurance for total peace of mind." },
  { icon: Clock, title: "24/7 Support", text: "Round-the-clock assistance so you’re never alone on the road." },
  { icon: MapPin, title: "Chennai-wide Delivery", text: "We deliver and pick up your car anywhere in the city." },
  { icon: Sparkles, title: "Sanitised Fleet", text: "Every car is professionally cleaned and inspected before handover." },
  { icon: Award, title: "Trusted by Thousands", text: "5000+ delighted travellers and counting." },
  { icon: CheckCircle2, title: "No Hidden Fees", text: "Transparent pricing — what you see is what you pay." },
];

export default function AboutPage() {
  return (
    <main className="pt-32 pb-20 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="text-center max-w-3xl mx-auto">
          <div className="subtitle-kicker">About Us</div>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-[#0f0f10] mt-3 leading-tight">
            Driving Freedom Since Day One
          </h1>
          <p className="text-neutral-600 mt-6 leading-relaxed text-lg">
            QuzeeDrive was born from a simple idea — renting a car should be as easy as booking a cab. We’re on a mission to give every traveller in Chennai the keys to their own adventure.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <img
            src="https://images.unsplash.com/photo-1637080618498-b4a1cad84ae0?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NDh8MHwxfHNlYXJjaHwyfHxjaGVubmFpJTIwY2l0eXxlbnwwfHx8fDE3ODI5MTkzNTR8MA&ixlib=rb-4.1.0&q=85"
            alt="Chennai city"
            className="rounded-2xl aspect-[5/4] object-cover shadow-lg"
          />
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#0f0f10] leading-tight">
              A fleet built for every kind of journey
            </h2>
            <p className="text-neutral-600 mt-5 leading-relaxed">
              From peppy hatchbacks that weave through Chennai’s streets to spacious SUVs made for weekend escapes, our fleet is thoughtfully curated. Every car is inspected, cleaned and delivered ready-to-drive.
            </p>
            <div className="grid grid-cols-3 gap-4 mt-8">
              {[
                { k: "5000+", v: "Happy customers" },
                { k: "120+", v: "Cars in fleet" },
                { k: "98%", v: "5-star ratings" },
              ].map((s) => (
                <div key={s.v} className="rounded-2xl bg-[#f7f5f2] p-5">
                  <div className="font-display text-2xl font-bold text-[#c08856]">{s.k}</div>
                  <div className="text-neutral-600 text-xs mt-1 leading-snug">{s.v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-24">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-[#0f0f10] text-center">Why Choose QuzeeDrive</h2>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {VALUES.map((v) => (
              <div key={v.title} className="rounded-2xl border border-neutral-200 p-6 hover:border-[#c08856] transition-colors">
                <div className="w-11 h-11 rounded-xl bg-[#fdf3e8] flex items-center justify-center">
                  <v.icon className="w-5 h-5 text-[#c08856]" />
                </div>
                <h3 className="font-display text-xl font-bold text-[#0f0f10] mt-4">{v.title}</h3>
                <p className="text-neutral-600 mt-2 text-sm leading-relaxed">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

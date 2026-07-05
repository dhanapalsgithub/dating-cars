import { Fuel, Users, Cog, ArrowRight, Send } from "lucide-react";

export default function CarCard({ car, variant = "compact" }) {
  
  // WhatsApp booking function
  const handleWhatsAppClick = () => {
    const message = `Hello! I would like to book the ${car.name}. Could you please share the availability and booking process?`;
    const whatsappUrl = `https://wa.me/7639609585?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="car-card bg-[#fdfbf9] rounded-2xl overflow-hidden border border-neutral-200/70">
      <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100">
        <img src={car.image} alt={car.name} className="w-full h-full object-cover" />
        {car.tag && (
          <span className="absolute top-3 left-3 bg-[#050505] text-white text-[11px] font-semibold px-2.5 py-1 rounded-full tracking-wider">
            {car.tag}
          </span>
        )}
        {variant === "compact" && (
          <span className="absolute top-3 right-3 bg-white/95 text-[#050505] text-[11px] font-semibold px-2.5 py-1 rounded-full">
            {car.category}
          </span>
        )}
      </div>
      <div className="p-5">
        {variant === "detailed" && (
          <span className="text-[11px] font-semibold text-[#e67e22] uppercase tracking-wider">{car.category}</span>
        )}
        <h3 className={`font-display font-bold text-[#050505] ${variant === "detailed" ? "text-2xl mt-1" : "text-xl"}`}>
          {car.name}
        </h3>
        <div className="flex items-center gap-4 mt-3 text-[13px] text-neutral-600">
          <span className="flex items-center gap-1.5"><Cog className="w-3.5 h-3.5" /> {car.transmission}</span>
          <span className="flex items-center gap-1.5"><Fuel className="w-3.5 h-3.5" /> {car.fuel}</span>
          <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5" /> {car.seats}</span>
        </div>
        <div className="mt-5 flex items-end justify-between border-t border-neutral-200/80 pt-4">
          <div>
            <div className="text-[11px] text-neutral-500 uppercase tracking-wider">Starts at</div>
            <div className="font-display text-2xl font-bold text-[#050505]">
              ₹{car.pricePerDay.toLocaleString("en-IN")}
              <span className="text-sm font-medium text-neutral-500">/day</span>
            </div>
          </div>
          
          <button 
            onClick={handleWhatsAppClick}
            className={`inline-flex items-center gap-2 bg-[#e67e22] hover:bg-[#b35e16] text-white rounded-full font-semibold uppercase tracking-wider transition-colors ${variant === "detailed" ? "px-4 py-2.5 text-xs" : "w-9 h-9 justify-center"}`}
          >
            {variant === "detailed" ? (
              <>Book <Send className="w-3.5 h-3.5" /></>
            ) : (
              <ArrowRight className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export function CarCardSkeleton() {
  return (
    <div className="bg-[#fdfbf9] rounded-2xl overflow-hidden border border-neutral-200/70">
      <div className="aspect-[4/3] bg-neutral-200 animate-pulse" />
      <div className="p-5 space-y-3">
        <div className="h-5 w-2/3 bg-neutral-200 rounded animate-pulse" />
        <div className="h-3 w-full bg-neutral-200 rounded animate-pulse" />
        <div className="h-6 w-1/2 bg-neutral-200 rounded animate-pulse" />
      </div>
    </div>
  );
}
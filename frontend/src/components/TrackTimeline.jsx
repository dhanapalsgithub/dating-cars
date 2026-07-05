import { MapPin, Car, CheckCircle2, Clock } from "lucide-react";

const ICONS = {
  "Booking Confirmed": CheckCircle2,
  "Car Dispatched": Car,
  "En Route to Pickup Location": MapPin,
  "Awaiting Handover": Clock,
};

export default function TrackTimeline({ data }) {
  return (
    <div className="mt-12 rounded-2xl border border-neutral-200 p-8">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <div className="text-xs uppercase tracking-wider text-neutral-500">Booking</div>
          <div className="font-display text-xl font-bold text-[#0f0f10]">{data.booking_code}</div>
          {data.car_name && <div className="text-sm text-neutral-500 mt-1">Car: {data.car_name}</div>}
        </div>
        <span className="bg-[#c08856]/10 text-[#c08856] text-xs font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full">
          {data.status}
        </span>
      </div>

      <div className="mt-8 space-y-6">
        {data.steps.map((step) => {
          const Icon = ICONS[step.title] || CheckCircle2;
          return (
            <div key={step.title} className="flex items-start gap-4">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                  step.ok ? "bg-[#c08856] text-white" : "bg-neutral-100 text-neutral-400"
                }`}
              >
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1 border-b border-neutral-100 pb-6 last:border-0">
                <div className={`font-semibold ${step.ok ? "text-[#0f0f10]" : "text-neutral-500"}`}>{step.title}</div>
                <div className="text-sm text-neutral-500 mt-1">{step.time}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

import { useState } from "react";
import { format } from "date-fns";
import { Send, Calendar as CalendarIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from "./ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useToast } from "../hooks/use-toast";

const EMPTY_FORM = { name: "", phone: "", start: null, end: null, car: "" };

export default function BookingForm({ cars }) {
  const { toast } = useToast();
  const [form, setForm] = useState(EMPTY_FORM);

  // WhatsApp configuration - Replace with your actual number
  const WHATSAPP_NUMBER = "919999999999"; 

  const isValid = form.name && form.phone && form.start && form.end && form.car;

  const handleWhatsAppBooking = (e) => {
    e.preventDefault();

    if (!isValid) {
      toast({ 
        title: "Missing details", 
        description: "Please fill all fields to proceed with WhatsApp booking." 
      });
      return;
    }

    // Format the message
    const message = `Hello! I would like to book a car:%0A%0A` +
                    `*Name:* ${form.name}%0A` +
                    `*Phone:* ${form.phone}%0A` +
                    `*Trip Starts:* ${format(form.start, "PP")}%0A` +
                    `*Trip Ends:* ${format(form.end, "PP")}%0A` +
                    `*Selected Car:* ${form.car}`;

    const whatsappUrl = `https://wa.me/${7639609585}?text=${message}`;
    
    // Redirect to WhatsApp
    window.open(whatsappUrl, '_blank');
  };

  return (
    <form
      onSubmit={handleWhatsAppBooking}
      className="fade-up delay-3 booking-pill mt-14 bg-white rounded-2xl md:rounded-full p-4 md:p-2 md:pl-6 grid grid-cols-1 md:grid-cols-[1.2fr_1.2fr_1.2fr_1.2fr_1.2fr_auto] gap-3 md:gap-2 items-center divide-y md:divide-y-0 md:divide-x divide-neutral-200"
    >
      <Field label="NAME">
        <Input
          placeholder="Enter Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border-0 shadow-none focus-visible:ring-0 px-0 text-[14px] font-medium placeholder:text-neutral-400 h-auto py-0"
        />
      </Field>
      <Field label="PHONE NUMBER">
        <Input
          placeholder="Enter Number"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className="border-0 shadow-none focus-visible:ring-0 px-0 text-[14px] font-medium placeholder:text-neutral-400 h-auto py-0"
        />
      </Field>
      <Field label="TRIP STARTS">
        <DatePick date={form.start} onSelect={(d) => setForm({ ...form, start: d })} />
      </Field>
      <Field label="TRIP ENDS">
        <DatePick date={form.end} onSelect={(d) => setForm({ ...form, end: d })} />
      </Field>
      <Field label="SELECT CAR">
        <Select value={form.car} onValueChange={(v) => setForm({ ...form, car: v })}>
          <SelectTrigger className="border-0 shadow-none focus:ring-0 px-0 text-[14px] font-medium h-auto py-0">
            <SelectValue placeholder="Select car" />
          </SelectTrigger>
          <SelectContent>
            {Array.isArray(cars) && cars.map((c) => (
              <SelectItem key={c.id || c.name} value={c.name}>
                {c.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>
      
      <Button
        type="submit"
        className="w-14 h-14 rounded-full bg-[#e67e22] hover:bg-[#b35e16] text-white shrink-0 justify-self-end md:justify-self-auto shadow-md md:ml-2 transition-colors"
        aria-label="Send via WhatsApp"
      >
        <Send className="w-5 h-5" />
      </Button>
    </form>
  );
}

function Field({ label, children }) {
  return (
    <label className="flex flex-col gap-1 min-w-0 px-4 md:px-4 py-2 md:py-1">
      <span className="text-[10px] font-bold tracking-[0.14em] text-neutral-700">{label}</span>
      {children}
    </label>
  );
}

function DatePick({ date, onSelect }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="flex items-center justify-between gap-2 text-left text-[14px] font-medium text-neutral-800 hover:text-[#e67e22] transition-colors"
        >
          <span className={date ? "" : "text-neutral-400"}>
            {date ? format(date, "PP") : "Select date"}
          </span>
          <CalendarIcon className="w-4 h-4 text-neutral-500" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar mode="single" selected={date} onSelect={onSelect} initialFocus />
      </PopoverContent>
    </Popover>
  );
}
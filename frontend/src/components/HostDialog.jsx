import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { useToast } from "../hooks/use-toast";
import { hostsApi } from "../lib/api";

const EMPTY = { name: "", phone: "", city: "Chennai", car_model: "" };

export default function HostDialog() {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState(EMPTY);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.phone) {
      toast({ title: "Name and phone are required" });
      return;
    }
    try {
      setSubmitting(true);
      await hostsApi.create(form);
      toast({ title: "Welcome, future host!", description: "Our onboarding team will reach out within 24 hours." });
      setForm(EMPTY);
      setOpen(false);
    } catch (err) {
      toast({ title: "Could not submit", description: err?.response?.data?.detail || "Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="mt-8 inline-flex items-center gap-2 bg-[#c08856] hover:bg-[#a5713f] text-white px-8 py-4 rounded-full font-semibold tracking-wider text-sm uppercase transition-colors">
          Join Now <ArrowRight className="w-4 h-4" />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">Become a Host</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div className="space-y-1.5">
            <Label htmlFor="host-name">Full Name</Label>
            <Input id="host-name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Ravi Kumar" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="host-phone">Phone Number</Label>
            <Input id="host-phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+91 98xxxxxxx" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="host-city">City</Label>
              <Input id="host-city" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="host-car">Car Model</Label>
              <Input id="host-car" value={form.car_model} onChange={(e) => setForm({ ...form, car_model: e.target.value })} placeholder="e.g. Swift 2022" />
            </div>
          </div>
          <DialogFooter className="mt-2">
            <Button type="submit" disabled={submitting} className="bg-[#c08856] hover:bg-[#a5713f] text-white uppercase tracking-wider text-sm">
              {submitting ? "Submitting..." : "Submit Application"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

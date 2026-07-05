import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { useToast } from "../hooks/use-toast";
import { bookingsApi } from "../lib/api";
import TrackTimeline from "../components/TrackTimeline";

function TrackForm({ code, onChange, onSubmit, loading }) {
  return (
    <form
      onSubmit={onSubmit}
      className="mt-10 bg-white rounded-full border border-neutral-200 shadow-sm p-2 flex items-center gap-2"
    >
      <div className="flex items-center gap-2 pl-4 flex-1">
        <Search className="w-4 h-4 text-neutral-500" />
        <Input
          placeholder="Enter booking ID (e.g. QZ-2026-0142)"
          value={code}
          onChange={(e) => onChange(e.target.value)}
          className="border-0 shadow-none focus-visible:ring-0 px-0 h-11"
        />
      </div>
      <Button
        type="submit"
        disabled={loading}
        className="bg-[#c08856] hover:bg-[#a5713f] text-white rounded-full h-11 px-6 text-sm font-semibold uppercase tracking-wider"
      >
        {loading ? "Tracking..." : "Track"}
      </Button>
    </form>
  );
}

export default function TrackPage() {
  const { toast } = useToast();
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  const handleTrack = async (e) => {
    e.preventDefault();
    const trimmed = code.trim();
    if (!trimmed) {
      toast({ title: "Please enter a booking ID" });
      return;
    }
    setLoading(true);
    setError("");
    setData(null);
    try {
      const res = await bookingsApi.track(trimmed.toUpperCase());
      setData(res);
    } catch (err) {
      const notFound = err?.response?.status === 404;
      setError(notFound ? "Booking not found. Please double-check your code." : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="pt-32 pb-20 bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-6 lg:px-10">
        <div className="text-center max-w-2xl mx-auto">
          <div className="subtitle-kicker">Track My Ride</div>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-[#0f0f10] mt-3">Where’s my car?</h1>
          <p className="text-neutral-600 mt-4 leading-relaxed">
            Enter your booking ID to see the real-time status of your rental.
          </p>
        </div>

        <TrackForm code={code} onChange={setCode} onSubmit={handleTrack} loading={loading} />

        {error && (
          <div className="mt-8 text-center text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl py-4 px-6">
            {error}
          </div>
        )}

        {data && <TrackTimeline data={data} />}
      </div>
    </main>
  );
}

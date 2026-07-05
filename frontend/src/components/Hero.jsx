import BookingForm from "./BookingForm";
import useCars from "../hooks/useCars";

export default function Hero() {
  const { cars } = useCars();

  return (
    <section className="relative min-h-[100vh] flex items-center justify-center pt-24 pb-16">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1527612943839-a21564e10d99?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMHJvYWQlMjBjYXJ8ZW58MHx8fHwxNzgyOTE5MzM4fDA&ixlib=rb-4.1.0&q=85"
          alt="Self Drive Cars in Chennai"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 hero-overlay" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-10">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="fade-up font-display font-bold text-white text-5xl md:text-7xl lg:text-[86px] leading-[1.02]">
            Self Drive Cars<br />in Chennai
          </h1>
          <h2 className="fade-up delay-1 font-display text-white/95 text-3xl md:text-5xl mt-6 font-medium">
            Drive on Your Terms
          </h2>
          <p className="fade-up delay-2 text-white/85 text-base md:text-lg mt-6 max-w-2xl mx-auto leading-relaxed">
            Rent a car for a few hours or a few days. No driver, no hassle – just freedom to drive anywhere, anytime across Chennai and Tamil Nadu.
          </p>
        </div>

        <BookingForm cars={cars} />
      </div>
    </section>
  );
}

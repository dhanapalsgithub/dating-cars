import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { NAV_LINKS } from "../mock";
import logo from "../assets/logo.png";

export default function Header() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const transparent = isHome && !scrolled;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${transparent ? "bg-transparent" : "bg-white/95 backdrop-blur-md shadow-sm"
        }`}
    >
      <div className="max-w-7xl mx-auto px-36 lg:px-10 flex items-center justify-between h-20">
        <Link to="/" className="flex items-center gap-2">
          <img
            src={logo}
            alt="Dating Cars Logo"
            className="w-20 h-30 object-contain" // வட்ட வடிவில் லோகோ அழகாகத் தெரியும்
          />
          <span className="font-display font-bold text-xl text-[#f1b017]">
            Dating Cars
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-10">
          {NAV_LINKS.map((item) => {
            const active = location.pathname === item.href;
            return (
              <Link
                key={item.label}
                to={item.href}
                className={`nav-link text-[15px] font-medium transition-colors ${transparent ? "text-white/90 hover:text-white" : "text-[#0f0f10] hover:text-[#c08856]"
                  } ${active ? "active" : ""}`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#become-host"
            className="hidden md:inline-flex items-center gap-2 bg-[#c08856] hover:bg-[#a5713f] text-white text-[13px] font-semibold tracking-wider uppercase px-5 py-3 rounded-full transition-colors"
          >
            Become a Host <ArrowRight className="w-4 h-4" />
          </a>
          <button
            className={`lg:hidden p-2 rounded-md ${transparent ? "text-white" : "text-[#0f0f10]"}`}
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-white border-t border-neutral-200 shadow-md">
          <div className="px-6 py-4 flex flex-col gap-4">
            {NAV_LINKS.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                onClick={() => setOpen(false)}
                className="text-[#0f0f10] font-medium py-1"
              >
                {item.label}
              </Link>
            ))}
            <a href="#become-host" className="inline-flex items-center gap-2 bg-[#c08856] text-white font-semibold tracking-wider uppercase px-5 py-3 rounded-full text-[13px] w-fit" onClick={() => setOpen(false)}>
              Become a Host <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

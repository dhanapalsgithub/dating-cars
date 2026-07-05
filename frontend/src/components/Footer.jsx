import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Instagram, Facebook, Youtube } from "lucide-react";
import { NAV_LINKS } from "../mock";
import logo from "../assets/logo.png";

export default function Footer() {
  return (
    <footer className="bg-[#0f0f10] text-white pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-11 h-11 rounded-full bg-white/5 border border-[#c08856]/40 flex items-center justify-center">
                <span className="font-display font-bold text-[#c08856] text-lg">
                  <img
                    src={logo}
                    alt="Dating Cars Logo"
                    className="w-20 h-30 object-contain" // வட்ட வடிவில் லோகோ அழகாகத் தெரியும்
                  />
                </span>
              </div>
              <span className="font-display font-bold tracking-wide text-sm">DatingCars</span>
            </div>
            <p className="text-white/60 mt-5 text-sm leading-relaxed">
              Rent a car for a few hours or a few days. No driver, no hassle – just freedom to drive anywhere, anytime across Chennai and Tamil Nadu.
            </p>
            <div className="flex items-center gap-3 mt-6">
              {[
                { Icon: Instagram, label: "instagram" },
                { Icon: Facebook, label: "facebook" },
                { Icon: Youtube, label: "youtube" },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="https://www.instagram.com/p/DaAWZSLJDXR/?igsh=NjQza3JjanNtMGp0"
                  aria-label={label}
                  className="w-9 h-9 rounded-full border border-white/15 hover:border-[#f1b017] hover:bg-[#c08856] flex items-center justify-center transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display font-bold text-lg">Quick Links</h4>
            <ul className="mt-5 space-y-3 text-sm text-white/70">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="hover:text-[#c08856] transition-colors">{link.label}</Link>
                </li>
              ))}
              <li><a href="#become-host" className="hover:text-[#c08856] transition-colors">Become a Host</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-lg">Fleet Categories</h4>
            <ul className="mt-5 space-y-3 text-sm text-white/70">
              {["Hatchbacks", "Sedans", "SUVs", "Luxury Cars", "MUVs"].map((c) => (
                <li key={c}>
                  <Link to="/fleet" className="hover:text-[#c08856] transition-colors">{c}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-lg">Get in Touch</h4>
            <ul className="mt-5 space-y-4 text-sm text-white/70">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 mt-0.5 text-[#c08856]" />
                <span>7639609585</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 mt-0.5 text-[#c08856]" />
                <span>hello@datingcarsdrive.com</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 text-[#c08856]" />
                <span> near tollgate metro, Chennai, Tamil Nadu 600040</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <p>© {new Date().getFullYear()} DatingCars.2026 All rights reserved.(build by ri billing pro)</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
            <a href="#" className="hover:text-white">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

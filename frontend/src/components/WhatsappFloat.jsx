import { MessageCircle } from "lucide-react";

export default function WhatsappFloat() {
  return (
    <a
      href="https://api.whatsapp.com/send/?phone=9344784676&text&type=phone_number&app_absent=0"
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="whatsapp-btn fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25d366] hover:bg-[#1ebe5b] flex items-center justify-center shadow-lg transition-colors"
    >
      <MessageCircle className="w-6 h-6 text-white" fill="white" strokeWidth={0} />
    </a>
  );
}

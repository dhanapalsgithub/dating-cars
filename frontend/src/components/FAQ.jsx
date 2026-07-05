import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { FAQS } from "../mock";
import { MessageCircle } from "lucide-react";

export default function FAQ() {
  const half = Math.ceil(FAQS.length / 2);
  const left = FAQS.slice(0, half);
  const right = FAQS.slice(half);

  return (
    <section className="section bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="text-center max-w-2xl mx-auto">
          <div className="subtitle-kicker">FAQs</div>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-[#0f0f10] mt-3">
            Frequently Asked Questions
          </h2>
          <p className="text-neutral-600 mt-4 leading-relaxed">
            Got questions? We’ve got answers. Here’s everything you need to know about our self-drive car rental service in Chennai.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-5">
          <FaqColumn items={left} valuePrefix="l" />
          <div className="flex flex-col gap-5">
            <FaqColumn items={right} valuePrefix="r" />
            <a
              href="https://api.whatsapp.com/send/?phone=7639609585"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between gap-4 rounded-2xl border border-neutral-200 hover:border-[#c08856] px-6 py-5 transition-colors group"
            >
              <p className="text-[#0f0f10] font-medium text-[15px] leading-snug pr-2">
                Still have questions? Contact us on WhatsApp or call us directly for instant support.
              </p>
              <MessageCircle className="w-6 h-6 text-neutral-500 group-hover:text-[#c08856] shrink-0" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function FaqColumn({ items, valuePrefix }) {
  return (
    <Accordion type="single" collapsible className="flex flex-col gap-5">
      {items.map((f, idx) => (
        <AccordionItem
          key={`${valuePrefix}-${idx}`}
          value={`${valuePrefix}-${idx}`}
          className="border border-neutral-200 rounded-2xl px-6 data-[state=open]:border-[#c08856] data-[state=open]:bg-[#fdf9f4] transition-colors"
        >
          <AccordionTrigger className="text-left text-[15px] md:text-[16px] font-semibold text-[#0f0f10] hover:no-underline data-[state=open]:text-[#c08856]">
            {f.q}
          </AccordionTrigger>
          <AccordionContent className="text-neutral-600 leading-relaxed pb-5">
            {f.a}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

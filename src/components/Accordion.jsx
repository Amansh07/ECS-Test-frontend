/************** Common Item Accordion ****************/

import { useState } from "react";
import { Button } from "./Buttons";

export function AccordionItem({ id, title, children, isInitiallyOpen = false }) {
  const [open, setOpen] = useState(isInitiallyOpen);

  return (
    <section className="border border-gray-200 rounded-lg bg-white mb-3 overflow-hidden">
      {/* <button
        type="button"
        className="w-full flex items-center justify-between px-4 py-3 text-left bg-[#fbffe8]"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="text-sm font-semibold text-gray-800">
          {title}
        </span>
        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full border border-gray-400 text-xs text-gray-700">
          {open ? "−" : "+"}
        </span>
      </button> */}

        <Button
        type="button"
        buttonClassName="w-full flex items-center justify-between px-4 py-3 text-left bg-[#fbffe8]"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="text-sm font-semibold text-gray-800">
          {title}
        </span>
        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full border border-gray-400 text-xs text-gray-700">
          {open ? "−" : "+"}
        </span>
      </Button>
      {open && (
        <div className="px-4 pb-4 pt-3">
          {children}
        </div>
      )}
    </section>
  );
}

export function AccordionGroup({ items }) {
  return (
    <div>
      {items.map((item) => (
        <AccordionItem
          key={item.id}
          id={item.id}
          title={item.title}
          isInitiallyOpen={item.isInitiallyOpen}
        >
          {item.content}
        </AccordionItem>
      ))}
    </div>
  );
}

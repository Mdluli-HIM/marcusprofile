"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type BudgetOption = {
  label: string;
  value: string;
};

type BudgetSelectProps = {
  value: string;
  onChange: (value: string) => void;
  options: BudgetOption[];
  placeholder?: string;
};

export function BudgetSelect({
  value,
  onChange,
  options,
  placeholder = "Select budget range",
}: BudgetSelectProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  const selected = options.find((option) => option.value === value);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    window.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <div ref={rootRef} className="relative w-full">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="group flex h-[58px] w-full items-center justify-between border-b border-black/12 bg-transparent px-0 text-left transition-colors duration-200 hover:border-black/30"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span
          className={`text-[1rem] transition-colors ${
            selected ? "text-black" : "text-black/34"
          }`}
        >
          {selected ? selected.label : placeholder}
        </span>

        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-black/65"
        >
          <ChevronDown className="h-4 w-4" strokeWidth={2.2} />
        </motion.span>
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute left-0 top-[calc(100%+10px)] z-50 w-full overflow-hidden border border-black/10 bg-[#f3f0ea] shadow-[0_18px_50px_rgba(0,0,0,0.08)]"
          >
            <div
              role="listbox"
              className="flex flex-col py-2"
              aria-label="Budget range"
            >
              {options.map((option) => {
                const active = option.value === value;

                return (
                  <button
                    key={option.value}
                    type="button"
                    role="option"
                    aria-selected={active}
                    onClick={() => {
                      onChange(option.value);
                      setOpen(false);
                    }}
                    className={`flex items-center justify-between px-4 py-3 text-left text-[0.95rem] transition-colors duration-150 ${
                      active
                        ? "bg-[#ff4d12] text-white"
                        : "text-black/78 hover:bg-black hover:text-white"
                    }`}
                  >
                    <span>{option.label}</span>

                    <span className="ml-4">
                      {active ? (
                        <Check className="h-4 w-4" strokeWidth={2.2} />
                      ) : null}
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

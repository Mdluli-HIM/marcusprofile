"use client";

import Image from "next/image";
import Link from "next/link";
import type { FormEvent, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronDown, Plus } from "lucide-react";
import { SiteShell } from "@/components/layout/site-shell";

const CONTACT_EMAIL = "mphomdluli@icloud.com";
const BOOK_CALL_URL = "https://calendly.com/YOUR-CALENDLY-LINK";

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  budget: string;
  message: string;
};

type BudgetOption = {
  label: string;
  value: string;
};

const budgetOptions: BudgetOption[] = [
  { label: "Under R10,000", value: "under-10000" },
  { label: "R10,000 – R25,000", value: "10000-25000" },
  { label: "R25,000 – R50,000", value: "25000-50000" },
  { label: "R50,000+", value: "50000-plus" },
];

function validateForm(payload: FormState): string[] {
  const errors: string[] = [];

  if (!payload.firstName.trim()) errors.push("First name is required.");
  if (!payload.lastName.trim()) errors.push("Last name is required.");
  if (!payload.email.trim()) errors.push("Email is required.");
  if (!payload.message.trim()) errors.push("Message is required.");

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email);
  if (payload.email && !emailOk) errors.push("Email is invalid.");

  return errors;
}

function ActionButton({
  href,
  label,
  external = false,
}: {
  href: string;
  label: string;
  external?: boolean;
}) {
  const content = (
    <>
      <span className="inline-flex h-[56px] items-center bg-[#ff4d12] px-8 text-[0.95rem] font-medium uppercase tracking-[0.08em] text-black transition hover:brightness-[0.98]">
        {label}
      </span>
      <span className="inline-flex h-[56px] w-[56px] items-center justify-center bg-[#ff4d12] text-black">
        <Plus size={20} strokeWidth={2.2} />
      </span>
    </>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-stretch"
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className="inline-flex items-stretch">
      {content}
    </Link>
  );
}

function Field({
  label,
  type = "text",
  name,
  value,
  onChange,
}: {
  label: string;
  type?: string;
  name: keyof FormState;
  value: string;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
}) {
  return (
    <label className="block">
      <span className="mb-3 block text-[0.9rem] text-black/28 md:mb-4 md:text-[0.95rem]">
        {label}
      </span>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full border-0 border-b border-black/14 bg-transparent pb-4 text-[0.98rem] text-black outline-none placeholder:text-black/18 focus:border-black/40 md:pb-5 md:text-[1rem]"
      />
    </label>
  );
}

function BudgetSelect({
  value,
  onChange,
  options,
  placeholder = "Select budget range",
}: {
  value: string;
  onChange: (value: string) => void;
  options: BudgetOption[];
  placeholder?: string;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  const selected = options.find((option) => option.value === value);

  useEffect(() => {
    function handleOutside(event: MouseEvent) {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    window.addEventListener("mousedown", handleOutside);
    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("mousedown", handleOutside);
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <div ref={rootRef} className="relative w-full">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex h-[58px] w-full items-center justify-between border-0 border-b border-black/14 bg-transparent px-0 pb-4 text-left outline-none transition-colors hover:border-black/28 focus:border-black/40 md:pb-5"
      >
        <span
          className={`text-[0.98rem] md:text-[1rem] ${
            selected ? "text-black" : "text-black/32"
          }`}
        >
          {selected ? selected.label : placeholder}
        </span>

        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.18 }}
          className="text-black/60"
        >
          <ChevronDown size={18} strokeWidth={2.1} />
        </motion.span>
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: 8, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, y: 6, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-0 top-[calc(100%+10px)] z-50 w-full overflow-hidden border border-black/10 bg-[#f3f0ea] shadow-[0_18px_50px_rgba(0,0,0,0.08)]"
          >
            <div role="listbox" className="py-2">
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
                    className={`flex w-full items-center justify-between px-4 py-3 text-left text-[0.95rem] transition-colors ${
                      active
                        ? "bg-[#ff4d12] text-white"
                        : "text-black/80 hover:bg-black hover:text-white"
                    }`}
                  >
                    <span>{option.label}</span>
                    <span className="ml-4">
                      {active ? <Check size={16} strokeWidth={2.2} /> : null}
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

function SubmitButton({ children }: { children: ReactNode }) {
  return (
    <div className="inline-flex items-stretch">
      <button
        type="submit"
        className="inline-flex h-[56px] items-center bg-[#ff4d12] px-8 text-[0.95rem] font-medium uppercase tracking-[0.08em] text-black transition hover:brightness-[0.98]"
      >
        {children}
      </button>
      <span className="inline-flex h-[56px] w-[56px] items-center justify-center bg-[#ff4d12] text-black">
        <Plus size={20} strokeWidth={2.2} />
      </span>
    </div>
  );
}

export default function ContactPage() {
  const [form, setForm] = useState<FormState>({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    budget: "",
    message: "",
  });

  const [submitState, setSubmitState] = useState<{
    type: "idle" | "success" | "error";
    message: string;
  }>({
    type: "idle",
    message: "",
  });

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const errors = validateForm(form);

    if (errors.length > 0) {
      setSubmitState({ type: "error", message: errors[0] });
      return;
    }

    const subject = `Portfolio contact — ${form.firstName} ${form.lastName}`;
    const body = [
      `From: ${form.firstName} ${form.lastName}`,
      `Reply-to: ${form.email}`,
      `Company: ${form.company || "—"}`,
      `Budget: ${
        budgetOptions.find((option) => option.value === form.budget)?.label ||
        "—"
      }`,
      "",
      form.message,
    ].join("\n");

    const mailto = `mailto:${CONTACT_EMAIL}?${new URLSearchParams({
      subject,
      body,
    }).toString()}`;

    window.location.href = mailto;

    setSubmitState({
      type: "success",
      message: `Your mail app should open. If it doesn’t, write to ${CONTACT_EMAIL}.`,
    });
  }

  return (
    <SiteShell>
      <section className="min-h-screen bg-white px-5 py-8 md:px-8 md:py-10 xl:px-12">
        <div className="mx-auto max-w-[1560px]">
          <div className="grid gap-8 md:gap-10 xl:grid-cols-[0.92fr_0.58fr_1.04fr] xl:items-start">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="xl:pt-6"
            >
              <div className="mb-4 md:mb-5">
                <p className="text-[1.5rem] font-black uppercase leading-none tracking-[-0.08em] text-black md:text-[2rem]">
                  MARCUS
                </p>
              </div>

              <div className="relative h-[280px] overflow-hidden bg-black/5 sm:h-[380px] md:h-[480px] lg:h-[600px] xl:h-[860px]">
                <Image
                  src="/images/contact/contact-photo.jpg"
                  alt="Marcus Mdluli portrait"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 38vw"
                  priority
                  className="object-cover"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.06, ease: "easeOut" }}
              className="xl:pt-8"
            >
              <h1 className="text-[clamp(2.75rem,11vw,7.2rem)] font-light leading-[0.9] tracking-[-0.06em] text-black md:leading-[0.88] md:tracking-[-0.07em]">
                Let&apos;s
                <span className="block">talk</span>
              </h1>

              <div className="mt-10 space-y-6 text-[0.98rem] leading-[1.65] text-black/54 md:mt-16 md:space-y-8 md:text-[1.05rem] md:leading-8 lg:mt-24 xl:mt-28">
                <div>
                  <p>Email:</p>
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="block underline underline-offset-4 transition hover:text-black"
                  >
                    {CONTACT_EMAIL}
                  </a>
                </div>

                <div className="space-y-1">
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noreferrer"
                    className="block underline underline-offset-4 transition hover:text-black"
                  >
                    Instagram
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noreferrer"
                    className="block underline underline-offset-4 transition hover:text-black"
                  >
                    LinkedIn
                  </a>
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noreferrer"
                    className="block underline underline-offset-4 transition hover:text-black"
                  >
                    GitHub
                  </a>
                </div>

                <div>
                  <p>Location</p>
                  <p className="text-black/78">South Africa</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.12, ease: "easeOut" }}
              className="xl:pt-8"
            >
              <div>
                <p className="max-w-[650px] text-[clamp(1.5rem,5.5vw,3.2rem)] font-normal leading-[1.08] tracking-[-0.045em] text-black md:leading-[1.03] md:tracking-[-0.05em]">
                  Book a 15-minute intro call. Pick a time that works.
                </p>

                <div className="mt-6 md:mt-8">
                  <ActionButton
                    href={BOOK_CALL_URL}
                    label="Book a Call"
                    external
                  />
                </div>
              </div>

              <div className="mt-14 md:mt-20 lg:mt-24">
                <h2 className="text-[clamp(1.85rem,5vw,3.9rem)] font-normal leading-[1.02] tracking-[-0.055em] text-black md:leading-[0.98] md:tracking-[-0.06em]">
                  Send a message
                </h2>

                <form
                  onSubmit={handleSubmit}
                  className="mt-10 space-y-10 md:mt-14 md:space-y-14"
                >
                  <div className="grid gap-x-8 gap-y-8 md:grid-cols-2 md:gap-x-10 md:gap-y-12">
                    <Field
                      label="First Name*"
                      name="firstName"
                      value={form.firstName}
                      onChange={handleChange}
                    />
                    <Field
                      label="Last Name*"
                      name="lastName"
                      value={form.lastName}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="grid gap-x-8 gap-y-8 md:grid-cols-2 md:gap-x-10 md:gap-y-12">
                    <Field
                      label="Email*"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                    />
                    <Field
                      label="Company"
                      name="company"
                      value={form.company}
                      onChange={handleChange}
                    />
                  </div>

                  <label className="block">
                    <span className="mb-3 block text-[0.9rem] text-black/28 md:mb-4 md:text-[0.95rem]">
                      Budget range *
                    </span>
                    <BudgetSelect
                      value={form.budget}
                      onChange={(value) =>
                        setForm((prev) => ({
                          ...prev,
                          budget: value,
                        }))
                      }
                      options={budgetOptions}
                      placeholder="Select budget range"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-3 block text-[0.9rem] text-black/28 md:mb-4 md:text-[0.95rem]">
                      Tell us more about what you need*
                    </span>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={5}
                      className="w-full resize-none border-0 border-b border-black/14 bg-transparent pb-4 text-[0.98rem] text-black outline-none placeholder:text-black/18 focus:border-black/40 md:pb-5 md:text-[1rem]"
                    />
                  </label>

                  <div className="pt-2">
                    <SubmitButton>Send Message</SubmitButton>

                    {submitState.type !== "idle" && (
                      <p
                        className={`mt-4 text-sm ${
                          submitState.type === "success"
                            ? "text-green-700"
                            : "text-red-600"
                        }`}
                      >
                        {submitState.message}
                      </p>
                    )}
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}

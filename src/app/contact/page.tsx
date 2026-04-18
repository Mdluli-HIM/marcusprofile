"use client";

import Image from "next/image";
import Link from "next/link";
import type { FormEvent } from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { SiteShell } from "@/components/layout/site-shell";

const CONTACT_EMAIL = "marcusmdle@gmail.com";

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  budget: string;
  message: string;
};

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

function ActionButton({ href, label }: { href: string; label: string }) {
  return (
    <div className="inline-flex items-stretch">
      <Link
        href={href}
        className="inline-flex h-[56px] items-center bg-[#ff4d12] px-8 text-[0.95rem] font-medium uppercase tracking-[0.08em] text-black transition hover:brightness-[0.98]"
      >
        {label}
      </Link>
      <span className="inline-flex h-[56px] w-[56px] items-center justify-center bg-[#ff4d12] text-black">
        <Plus size={20} strokeWidth={2.2} />
      </span>
    </div>
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
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
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
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
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
      `Budget: ${form.budget || "—"}`,
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
      <section className="min-h-screen bg-[white px-5 py-8 md:px-8 md:py-10 xl:px-12">
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
                  <ActionButton href="/contact" label="Book a Call" />
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
                    <select
                      name="budget"
                      value={form.budget}
                      onChange={handleChange}
                      className="w-full border-0 border-b border-black/14 bg-transparent pb-4 text-[0.98rem] text-black outline-none focus:border-black/40 md:pb-5 md:text-[1rem]"
                    >
                      <option value="">Select budget range</option>
                      <option>Under R10,000</option>
                      <option>R10,000 – R25,000</option>
                      <option>R25,000 – R50,000</option>
                      <option>R50,000+</option>
                    </select>
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
                    <div className="inline-flex items-stretch">
                      <button
                        type="submit"
                        className="inline-flex h-[56px] items-center bg-[#f0a08a] px-8 text-[0.95rem] font-medium uppercase tracking-[0.08em] text-[#6d747f] transition hover:brightness-[0.98]"
                      >
                        Send Message
                      </button>
                      <span className="inline-flex h-[56px] w-[56px] items-center justify-center bg-[#f0a08a] text-[#6d747f]">
                        <Plus size={20} strokeWidth={2.2} />
                      </span>
                    </div>

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

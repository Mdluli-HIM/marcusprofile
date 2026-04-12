"use client";

import Image from "next/image";
import Link from "next/link";
import type { FormEvent } from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { SiteShell } from "@/components/layout/site-shell";

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  budget: string;
  message: string;
};

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
      <span className="mb-4 block text-[0.95rem] text-black/28">{label}</span>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full border-0 border-b border-black/14 bg-transparent pb-5 text-[1rem] text-black outline-none placeholder:text-black/18 focus:border-black/40"
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

  const [isSubmitting, setIsSubmitting] = useState(false);
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

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsSubmitting(true);
    setSubmitState({ type: "idle", message: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        const message =
          data?.errors?.[0] ||
          data?.error ||
          "Something went wrong. Please try again.";
        setSubmitState({ type: "error", message });
        return;
      }

      setSubmitState({
        type: "success",
        message: "Message sent successfully.",
      });

      setForm({
        firstName: "",
        lastName: "",
        email: "",
        company: "",
        budget: "",
        message: "",
      });
    } catch {
      setSubmitState({
        type: "error",
        message: "Unable to send right now. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <SiteShell>
      <section className="min-h-screen bg-[#f2f2ef] px-8 py-5 md:px-10 xl:px-12">
        <div className="mx-auto max-w-[1560px]">
          <div className="grid gap-12 xl:grid-cols-[0.92fr_0.58fr_1.04fr] xl:items-start">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="xl:pt-6"
            >
              <div className="mb-5">
                <p className="text-[2rem] font-black uppercase leading-none tracking-[-0.08em] text-black">
                  MARCUS
                </p>
              </div>

              <div className="relative h-[620px] overflow-hidden bg-black/5 md:h-[700px] xl:h-[860px]">
                <Image
                  src="/images/contact/contact-photo.jpg"
                  alt="Marcus Mdluli portrait"
                  fill
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
              <h1 className="text-[clamp(4.3rem,8vw,7.2rem)] font-light leading-[0.88] tracking-[-0.07em] text-black">
                Let&apos;s
                <span className="block">talk</span>
              </h1>

              <div className="mt-28 space-y-10 text-[1.05rem] leading-8 text-black/54">
                <div>
                  <p>Email:</p>
                  <a
                    href="mailto:your@email.com"
                    className="block underline underline-offset-4 transition hover:text-black"
                  >
                    your@email.com
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
                <p className="max-w-[650px] text-[clamp(2rem,4vw,3.2rem)] font-normal leading-[1.03] tracking-[-0.05em] text-black">
                  Book a 15-minute intro call. Pick a time that works.
                </p>

                <div className="mt-8">
                  <ActionButton href="/contact" label="Book a Call" />
                </div>
              </div>

              <div className="mt-24">
                <h2 className="text-[clamp(2.7rem,4vw,3.9rem)] font-normal leading-[0.98] tracking-[-0.06em] text-black">
                  Send a message
                </h2>

                <form onSubmit={handleSubmit} className="mt-14 space-y-14">
                  <div className="grid gap-x-10 gap-y-12 md:grid-cols-2">
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

                  <div className="grid gap-x-10 gap-y-12 md:grid-cols-2">
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
                    <span className="mb-4 block text-[0.95rem] text-black/28">
                      Budget range *
                    </span>
                    <select
                      name="budget"
                      value={form.budget}
                      onChange={handleChange}
                      className="w-full border-0 border-b border-black/14 bg-transparent pb-5 text-[1rem] text-black outline-none focus:border-black/40"
                    >
                      <option value="">Select budget range</option>
                      <option>Under R10,000</option>
                      <option>R10,000 – R25,000</option>
                      <option>R25,000 – R50,000</option>
                      <option>R50,000+</option>
                    </select>
                  </label>

                  <label className="block">
                    <span className="mb-4 block text-[0.95rem] text-black/28">
                      Tell us more about what you need*
                    </span>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={5}
                      className="w-full resize-none border-0 border-b border-black/14 bg-transparent pb-5 text-[1rem] text-black outline-none placeholder:text-black/18 focus:border-black/40"
                    />
                  </label>

                  <div className="pt-2">
                    <div className="inline-flex items-stretch">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="inline-flex h-[56px] items-center bg-[#f0a08a] px-8 text-[0.95rem] font-medium uppercase tracking-[0.08em] text-[#6d747f] transition hover:brightness-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
                      >
                        {isSubmitting ? "Sending..." : "Send Message"}
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

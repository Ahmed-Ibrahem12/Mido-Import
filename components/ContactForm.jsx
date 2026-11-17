"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { User, Mail, Phone, Package, MessageSquare, Send } from "lucide-react";
import { site } from "@/lib/site";

const inputClass =
  "w-full bg-transparent border-0 border-b border-slate-200 py-3.5 pl-10 pr-3 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-forest-600 focus:bg-forest-50/40 transition";

function Field({ icon: Icon, children }) {
  return (
    <div className="relative">
      <Icon size={18} className="absolute left-2 top-4 text-slate-400" />
      {children}
    </div>
  );
}

export default function ContactForm({ dict, defaultProduct }) {
  const params = useSearchParams();
  const queryString = params.toString();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    product: params.get("product") || defaultProduct,
    message: "",
  });

  useEffect(() => {
    const searchParams = new URLSearchParams(queryString);
    const selectedProduct = searchParams.get("product");
    if (selectedProduct) {
      let options = [];
      try {
        const parsedOptions = JSON.parse(searchParams.get("options") || "[]");
        if (Array.isArray(parsedOptions)) options = parsedOptions;
      } catch {
        options = [];
      }
      const thicknesses = searchParams
        .get("thickness")
        ?.split(",")
        .filter(Boolean);
      setForm((current) => {
        const selectedOptions = [
          ...options,
          ...(thicknesses || []).map((value) => `${value} mm`),
        ];
        const optionsText = `Selected options: ${selectedOptions.join(", ")}`;
        const message = !selectedOptions.length || current.message.includes(optionsText)
          ? current.message
          : [current.message.trim(), optionsText].filter(Boolean).join("\n");

        return { ...current, product: selectedProduct, message };
      });
    }
  }, [queryString]);

  const set = (key) => (e) =>
    setForm((current) => ({ ...current, [key]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();
    const l = dict.labels;
    const body = [
      `${l.name}: ${form.name}`,
      `${l.email}: ${form.email}`,
      `${l.phone}: ${form.phone}`,
      `${l.product}: ${form.product}`,
      "",
      `${l.message}:`,
      form.message,
    ].join("\n");
    const subject = `${dict.subject}: ${form.product}`;
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
  };

  return (
    <form className="space-y-6" onSubmit={onSubmit}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Field icon={User}>
          <input
            type="text"
            required
            placeholder={dict.name}
            value={form.name}
            onChange={set("name")}
            className={inputClass}
          />
        </Field>
        <Field icon={Mail}>
          <input
            type="email"
            required
            placeholder={dict.email}
            value={form.email}
            onChange={set("email")}
            className={inputClass}
          />
        </Field>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Field icon={Phone}>
          <input
            type="tel"
            placeholder={dict.phone}
            value={form.phone}
            onChange={set("phone")}
            className={inputClass}
          />
        </Field>
        <Field icon={Package}>
          <input
            type="text"
            required
            placeholder={dict.product}
            value={form.product}
            onChange={set("product")}
            className={inputClass}
          />
        </Field>
      </div>

      <Field icon={MessageSquare}>
        <textarea
          rows={4}
          required
          placeholder={dict.message}
          value={form.message}
          onChange={set("message")}
          className={`${inputClass} resize-none`}
        />
      </Field>

      <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2.5 px-9 py-4 rounded-xl bg-forest-600 hover:bg-forest-700 text-white text-label-lg transition shadow-lg cursor-pointer"
        >
          <span>{dict.submit}</span>
          <Send size={18} />
        </button>
        <span className="text-label-sm text-slate-400">{dict.note}</span>
      </div>
    </form>
  );
}

"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { productMeta } from "@/lib/products";

const tones = {
  green: {
    box: "bg-slate-50 border-slate-200/80",
    badge: "bg-forest-100 text-forest-800",
  },
  slate: {
    box: "bg-slate-50 border-slate-200/80",
    badge: "bg-slate-200 text-slate-700",
  },
  amber: {
    box: "bg-amber-50/60 border-amber-200/60",
    badge: "bg-amber-200 text-amber-900",
  },
};

export default function ProductsGrid({ lang, dict }) {
  const [active, setActive] = useState("all");
  const [selectedOptions, setSelectedOptions] = useState({});
  const isSelected = (itemId, option) =>
    selectedOptions[itemId]?.includes(option) || false;
  const toggleOption = (itemId, option) => {
    setSelectedOptions((current) => {
      const selected = current[itemId] || [];
      return {
        ...current,
        [itemId]: selected.includes(option)
          ? selected.filter((value) => value !== option)
          : [...selected, option],
      };
    });
  };
  const items =
    active === "all"
      ? dict.items
      : dict.items.filter((i) => i.filter === active);

  return (
    <div className="max-w-7xl mx-auto space-y-12">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-2 text-label-sm uppercase text-forest-600 mb-2">
            <span className="w-8 h-[2px] bg-gold-500" />
            <span>{dict.eyebrow}</span>
          </div>
          <h1 className="font-headline text-3xl md:text-headline-lg font-bold text-slate-900">
            {dict.title}
          </h1>
          <p className="text-base text-slate-600 mt-2 max-w-2xl">
            {dict.subtitle}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm">
          {Object.entries(dict.filters).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setActive(key)}
              className={`px-4 py-2 rounded-xl text-label-sm transition ${
                active === key
                  ? "bg-forest-600 text-white shadow"
                  : "text-slate-600 hover:text-forest-600"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {items.map((item, index) => {
          const meta = productMeta[item.id];
          const num = String(dict.items.indexOf(item) + 1).padStart(2, "0");
          return (
            <article
              key={item.id}
              className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-200 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative h-48 bg-stone-900 overflow-hidden">
                  <img
                    src={meta.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                  <span
                    className={`absolute top-4 left-4 px-3 py-1 rounded-full text-label-sm uppercase ${
                      meta.gold
                        ? "bg-gold-500 text-forest-950"
                        : "bg-forest-600/90 text-white"
                    }`}
                  >
                    {item.tag}
                  </span>
                  <span className="absolute top-4 right-4 font-headline text-3xl font-bold text-white/30">
                    {num}
                  </span>
                  <div className="absolute bottom-4 left-5 right-5">
                    <h3 className="font-headline text-headline-md text-white">
                      {item.title}
                    </h3>
                    <p className="text-label-sm text-gold-300 uppercase mt-0.5">
                      {item.grades}
                    </p>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  {item.blocks?.map((b) => (
                    <div
                      key={b.name}
                      className={`p-4 rounded-2xl border ${tones[b.tone].box}`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <button
                          type="button"
                          aria-pressed={isSelected(item.id, b.name)}
                          onClick={() => toggleOption(item.id, b.name)}
                          className={`text-label-lg text-left ${
                            isSelected(item.id, b.name)
                              ? "text-forest-700 underline underline-offset-4"
                              : "text-slate-900"
                          }`}
                        >
                          {b.name}
                        </button>
                        <span
                          className={`text-label-sm uppercase px-2.5 py-0.5 rounded-full ${tones[b.tone].badge}`}
                        >
                          {b.badge}
                        </span>
                      </div>
                      {b.rows ? (
                        <div className="text-sm text-slate-600">
                          {b.rows.map((r, i) => (
                            <div
                              key={r.label}
                              className={`flex justify-between py-1 ${
                                i < b.rows.length - 1
                                  ? "border-b border-slate-200/60"
                                  : ""
                              }`}
                            >
                              <span>{r.label}</span>
                              <span className="flex flex-wrap justify-end gap-1">
                                {r.value.split("/").map((value) => {
                                  const thickness = value.trim();
                                  const option = `${b.name} — ${r.label}: ${thickness} mm`;
                                  return (
                                    <button
                                      key={thickness}
                                      type="button"
                                      aria-pressed={isSelected(item.id, option)}
                                      onClick={() => toggleOption(item.id, option)}
                                      className={`px-2 py-0.5 rounded-lg border text-xs font-bold transition ${
                                        isSelected(item.id, option)
                                          ? "bg-forest-600 border-forest-600 text-white"
                                          : "bg-white border-slate-200 text-slate-800 hover:border-forest-400"
                                      }`}
                                    >
                                      {thickness} mm
                                    </button>
                                  );
                                })}
                              </span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-slate-600">{b.text}</p>
                      )}
                    </div>
                  ))}

                  {item.gradeOptions && (
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                      <span className="text-label-sm uppercase text-slate-500 block mb-2">
                        Select grade
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {item.gradeOptions.map((grade) => (
                          <button
                            key={grade}
                            type="button"
                            aria-pressed={isSelected(item.id, `Grade ${grade}`)}
                            onClick={() => toggleOption(item.id, `Grade ${grade}`)}
                            className={`px-3 py-2 rounded-xl border text-sm font-bold transition ${
                              isSelected(item.id, `Grade ${grade}`)
                                ? "bg-forest-600 border-forest-600 text-white"
                                : "bg-white border-slate-200 text-slate-800 hover:border-forest-400"
                            }`}
                          >
                            {grade}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {item.facts && (
                    <div className="grid grid-cols-2 gap-3">
                      {item.facts.map((f) => (
                        <div
                          key={f.label}
                          className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80"
                        >
                          <span className="text-label-sm uppercase text-slate-400 block">
                            {f.label}
                          </span>
                          <span className="text-xl font-bold text-slate-900 mt-1 block">
                            {f.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {item.thicknesses && (
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                      <span className="text-label-sm uppercase text-slate-500 block mb-2">
                        {dict.thicknesses}
                      </span>
                      <div
                        className="grid gap-2 text-center"
                        style={{
                          gridTemplateColumns: `repeat(${item.thicknesses.length}, 1fr)`,
                        }}
                      >
                        {item.thicknesses.map((t) => (
                          <button
                            key={t}
                            type="button"
                            aria-pressed={isSelected(item.id, `${t} mm`)}
                            onClick={() => toggleOption(item.id, `${t} mm`)}
                            className={`py-2 rounded-xl border text-sm font-bold transition ${
                              isSelected(item.id, `${t} mm`)
                                ? "bg-forest-600 border-forest-600 text-white"
                                : "bg-white border-slate-200 text-slate-800 hover:border-forest-400"
                            }`}
                          >
                            {t} mm
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {item.applications && (
                    <div className="p-4 rounded-2xl bg-forest-50/70 border border-forest-100 text-sm text-slate-600">
                      <strong className="text-forest-900 block mb-1">
                        {dict.applications}
                      </strong>
                      {item.applications}
                    </div>
                  )}
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link
                  href={`/${lang}/contact?product=${encodeURIComponent(item.title)}${
                    selectedOptions[item.id]?.length
                      ? `&options=${encodeURIComponent(JSON.stringify(selectedOptions[item.id]))}`
                      : ""
                  }`}
                  className="w-full py-3.5 px-4 rounded-xl bg-forest-50 hover:bg-forest-600 text-forest-800 hover:text-white text-label-lg transition flex items-center justify-center gap-2 border border-forest-200"
                >
                  <span>{dict.quote}</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

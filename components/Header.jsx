"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Mail, ArrowUpRight, Menu, X } from "lucide-react";
import { site } from "@/lib/site";

export default function Header({ lang, dict }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const links = [
    { href: `/${lang}`, label: dict.nav.home },
    { href: `/${lang}/about`, label: dict.nav.about },
    { href: `/${lang}/products`, label: dict.nav.products },
    { href: `/${lang}/contact`, label: dict.nav.contact },
  ];

  const isActive = (href) => pathname === href || pathname === `${href}/`;

  return (
    <header className="w-full border-b border-slate-200 bg-white/95 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 h-20 flex items-center justify-between">
        <Link href={`/${lang}`} className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-forest-700 flex items-center justify-center text-gold-300 shadow-md">
            <svg
              className="w-6 h-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path d="M12 2L3 7v10l9 5 9-5V7l-9-5z" />
              <path d="M12 22V12" />
              <path d="M21 7l-9 5-9-5" />
              <circle
                cx="12"
                cy="12"
                r="2.5"
                fill="currentColor"
                fillOpacity="0.3"
              />
            </svg>
          </div>
          <div>
            <span className="font-headline font-bold text-2xl tracking-wide block leading-none text-slate-900">
              MIDO
            </span>
            <span className="text-label-sm text-forest-600 uppercase mt-1 block">
              IMPORT-EXPORT d.o.o.
            </span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-label-lg text-slate-700">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={
                isActive(l.href)
                  ? "text-forest-600 border-b-2 border-forest-600 pb-0.5"
                  : "hover:text-forest-600 transition"
              }
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={`mailto:${site.email}`}
            className="hidden sm:flex w-10 h-10 rounded-full border border-slate-200 bg-slate-50 hover:bg-forest-50 text-slate-700 items-center justify-center transition"
          >
            <Mail size={18} />
          </a>
          <Link
            href={`/${lang}/contact`}
            className="hidden sm:flex px-6 py-2.5 rounded-full bg-forest-600 hover:bg-forest-700 text-white text-label-lg transition shadow-md items-center gap-2"
          >
            <span>{dict.nav.inquire}</span>
            <ArrowUpRight size={16} />
          </Link>
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center"
            aria-label="Menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="md:hidden border-t border-slate-200 bg-white px-6 py-4 flex flex-col gap-4 text-label-lg">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={
                isActive(l.href) ? "text-forest-600" : "text-slate-700"
              }
            >
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

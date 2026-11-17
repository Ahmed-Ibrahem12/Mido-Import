import Link from "next/link";
import { ArrowRight, Globe, Award } from "lucide-react";
import { getDictionary } from "@/lib/dictionaries";
import { productMeta } from "@/lib/products";
import Eyebrow from "@/components/Eyebrow";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return {
    title: dict.meta.home.title,
    description: dict.meta.home.description,
  };
}

export default async function Home({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const h = dict.home;
  const years = new Date().getFullYear() - 2012;

  const stats = [
    { value: "2012", label: h.stats.established },
    { value: `${years}+`, label: h.stats.years },
    { value: "2016", label: h.stats.award },
    { value: String(dict.products.items.length), label: h.stats.products },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative bg-forest-950 text-white overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=1800&q=80"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-forest-950 via-forest-950/80 to-forest-950/20" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-24 lg:py-36">
          <Eyebrow light>{h.eyebrow}</Eyebrow>
          <h1 className="font-headline font-bold text-4xl md:text-6xl leading-tight mt-5 max-w-3xl">
            {h.title1}
            <br />
            <span className="text-gold-400">{h.title2}</span>
          </h1>
          <p className="mt-6 text-lg text-slate-300 max-w-2xl leading-relaxed">
            {h.subtitle}
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href={`/${lang}/products`}
              className="px-7 py-3.5 rounded-full bg-gold-500 hover:bg-gold-400 text-forest-950 text-label-lg transition flex items-center gap-2"
            >
              {h.ctaProducts} <ArrowRight size={16} />
            </Link>
            <Link
              href={`/${lang}/contact`}
              className="px-7 py-3.5 rounded-full border border-white/30 hover:bg-white/10 text-white text-label-lg transition"
            >
              {h.ctaContact}
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="font-headline text-4xl font-bold text-forest-700">
                {s.value}
              </div>
              <div className="text-sm text-slate-500 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Markets */}
      <section className="arch-grid py-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Eyebrow>{h.markets.eyebrow}</Eyebrow>
          <h2 className="font-headline text-3xl md:text-headline-lg font-bold text-slate-900 mt-3">
            {h.markets.title}
          </h2>
          <div className="grid sm:grid-cols-3 gap-6 mt-10">
            {h.markets.items.map((m) => (
              <div
                key={m}
                className="p-6 rounded-2xl bg-forest-50 border border-forest-100 flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-forest-600 text-white flex items-center justify-center">
                  <Globe size={22} />
                </div>
                <span className="font-headline text-xl font-semibold text-slate-900">
                  {m}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products teaser */}
      <section className="bg-slate-50 py-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <Eyebrow>{h.productsSection.eyebrow}</Eyebrow>
              <h2 className="font-headline text-3xl md:text-headline-lg font-bold text-slate-900 mt-3">
                {h.productsSection.title}
              </h2>
            </div>
            <Link
              href={`/${lang}/products`}
              className="text-forest-600 hover:text-forest-800 text-label-lg flex items-center gap-2"
            >
              {h.productsSection.link} <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {dict.products.items.map((item) => (
              <Link
                key={item.id}
                href={`/${lang}/products`}
                className="group bg-white rounded-3xl overflow-hidden border border-slate-200 hover:shadow-xl transition"
              >
                <div className="relative h-48 bg-stone-900 overflow-hidden">
                  <img
                    src={productMeta[item.id].image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                  <span
                    className={`absolute top-4 left-4 px-3 py-1 rounded-full text-label-sm uppercase ${
                      productMeta[item.id].gold
                        ? "bg-gold-500 text-forest-950"
                        : "bg-forest-600/90 text-white"
                    }`}
                  >
                    {item.tag}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="font-headline text-headline-md text-slate-900">
                    {item.title}
                  </h3>
                  <p className="text-label-sm text-gold-600 uppercase mt-2">
                    {item.grades}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Award teaser */}
      <section className="bg-forest-950 text-white py-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center gap-8">
          <div className="w-16 h-16 shrink-0 rounded-2xl bg-gold-500/15 border border-gold-500/40 text-gold-400 flex items-center justify-center">
            <Award size={30} />
          </div>
          <div className="flex-1">
            <Eyebrow light>{h.award.eyebrow}</Eyebrow>
            <h2 className="font-headline text-3xl font-bold mt-3">
              {h.award.title}
            </h2>
            <p className="text-slate-300 mt-3 max-w-2xl leading-relaxed">
              {h.award.text}
            </p>
          </div>
          <Link
            href={`/${lang}/about`}
            className="text-gold-300 hover:text-gold-400 text-label-lg flex items-center gap-2"
          >
            {h.award.link} <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-5xl mx-auto bg-forest-700 text-white rounded-3xl p-10 md:p-14 text-center">
          <h2 className="font-headline text-3xl md:text-headline-lg font-bold">
            {h.cta.title}
          </h2>
          <p className="text-forest-100 mt-4 max-w-xl mx-auto">{h.cta.text}</p>
          <Link
            href={`/${lang}/contact`}
            className="inline-flex items-center gap-2 mt-8 px-8 py-4 rounded-full bg-gold-500 hover:bg-gold-400 text-forest-950 text-label-lg transition"
          >
            {h.cta.button} <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}

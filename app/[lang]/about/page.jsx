import {
  ShieldCheck,
  Ship,
  Handshake,
  Key,
  Compass,
  Globe,
} from "lucide-react";
import { getDictionary } from "@/lib/dictionaries";
import Eyebrow from "@/components/Eyebrow";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return {
    title: dict.meta.about.title,
    description: dict.meta.about.description,
  };
}

const cardIcons = [ShieldCheck, Ship, Handshake];

export default async function About({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const a = dict.about;
  const years = new Date().getFullYear() - 2012;

  return (
    <main className="arch-grid py-20 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-24">
        {/* Story */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-14 items-center">
          <div className="lg:col-span-5 relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl aspect-[4/5] bg-slate-100 relative">
              <img
                src="https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=900&q=85"
                alt="Beech lumber stocks"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-950/70 via-transparent to-transparent" />
            </div>
            <div className="absolute -bottom-6 -right-4 bg-forest-900 text-white p-6 rounded-2xl shadow-xl border border-gold-400/30 max-w-[260px]">
              <div className="flex items-center gap-3 mb-2">
                <span className="font-headline text-4xl font-bold text-gold-400">
                  {years}+
                </span>
                <span className="text-label-sm uppercase text-emerald-300 leading-tight">
                  {a.badgeLabel}
                </span>
              </div>
              <p className="text-sm text-slate-300 leading-snug">
                {a.badgeText}
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <Eyebrow>{a.eyebrow}</Eyebrow>
            <h1 className="font-headline text-3xl md:text-headline-lg font-bold text-slate-900 leading-tight">
              {a.title1}
              <br />
              <span className="text-forest-600">{a.title2}</span>
            </h1>
            <div className="space-y-4 text-base text-slate-600 leading-relaxed">
              <p>
                <strong className="text-slate-900 font-semibold">
                  MIDO IMPORT-EXPORT d.o.o.
                </strong>{" "}
                {a.p1}
              </p>
              <p>{a.p2}</p>
              <p>{a.p3}</p>
              <p>{a.p4}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-200">
              {a.cards.map((c, i) => {
                const Icon = cardIcons[i];
                return (
                  <div
                    key={c.title}
                    className="p-4 rounded-2xl bg-forest-50 border border-forest-100"
                  >
                    <Icon className="text-forest-600 mb-2" size={26} />
                    <h4 className="text-base font-bold text-slate-900">
                      {c.title}
                    </h4>
                    <p className="text-sm text-slate-500 mt-1">{c.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Award */}
        <section className="bg-forest-950 text-white rounded-3xl p-10 lg:p-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-sm p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
                <div className="cert-border rounded-xl p-6 text-slate-900 text-center">
                  <div className="border-2 border-gold-500/60 rounded-lg p-5">
                    <Key className="mx-auto text-gold-600 mb-1" size={30} />
                    <p className="text-label-sm uppercase text-stone-500">
                      hrvatski izvoznici
                    </p>
                    <h3 className="font-headline text-headline-md font-bold text-gold-600 my-2">
                      ZLATNI KLJUČ
                    </h3>
                    <p className="text-sm font-bold text-slate-900">
                      MIDO IMPORT-EXPORT d.o.o.
                    </p>
                    <div className="my-3 py-2 px-3 rounded-lg bg-gold-500/15 border border-gold-500/40">
                      <p className="text-label-sm uppercase text-forest-800 font-bold">
                        NAJBOLJI IZVOZNIK U EGIPAT U 2015.
                      </p>
                      <p className="text-[10px] text-stone-600 uppercase">
                        {a.award.certCaption}
                      </p>
                    </div>
                    <p className="text-[10px] text-stone-500">
                      U Zagrebu, 23. svibnja 2016.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-4">
              <Eyebrow light>{a.award.eyebrow}</Eyebrow>
              <h2 className="font-headline text-3xl md:text-headline-lg font-bold leading-tight">
                {a.award.title}
              </h2>
              <p className="text-base text-slate-300 leading-relaxed">
                {a.award.text1}
              </p>
              <p className="text-sm text-slate-400 leading-relaxed">
                {a.award.text2}
              </p>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 sm:p-10 rounded-3xl bg-forest-50/70 border border-forest-100">
            <div className="w-12 h-12 rounded-xl bg-forest-600 text-white flex items-center justify-center mb-6">
              <Compass size={24} />
            </div>
            <p className="text-label-sm uppercase text-forest-600 mb-2">
              {a.mission.label}
            </p>
            <h3 className="font-headline text-headline-md text-slate-900 font-bold mb-4">
              {a.mission.title}
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              {a.mission.text}
            </p>
          </div>

          <div className="p-8 sm:p-10 rounded-3xl bg-amber-50/70 border border-amber-200/60">
            <div className="w-12 h-12 rounded-xl bg-gold-500 text-forest-950 flex items-center justify-center mb-6">
              <Globe size={24} />
            </div>
            <p className="text-label-sm uppercase text-gold-600 mb-2">
              {a.vision.label}
            </p>
            <h3 className="font-headline text-headline-md text-slate-900 font-bold mb-4">
              {a.vision.title}
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              {a.vision.text}
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

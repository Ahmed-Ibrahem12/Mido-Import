import { Suspense } from "react";
import { MapPin, Mail, Phone } from "lucide-react";
import { getDictionary } from "@/lib/dictionaries";
import { site } from "@/lib/site";
import Eyebrow from "@/components/Eyebrow";
import ContactForm from "@/components/ContactForm";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return {
    title: dict.meta.contact.title,
    description: dict.meta.contact.description,
  };
}

export default async function Contact({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const c = dict.contact;

  const cards = [
    {
      icon: MapPin,
      label: c.addressLabel,
      node: <p className="text-sm text-slate-600">{site.address}</p>,
    },
    {
      icon: Mail,
      label: c.emailLabel,
      node: (
        <a
          href={`mailto:${site.email}`}
          className="text-sm text-forest-600 hover:underline"
        >
          {site.email}
        </a>
      ),
    },
    site.phone && {
      icon: Phone,
      label: c.phoneLabel,
      node: (
        <a
          href={`tel:${site.phone.replace(/\s/g, "")}`}
          className="text-sm text-slate-600"
        >
          {site.phone}
        </a>
      ),
    },
  ].filter(Boolean);

  return (
    <main className="py-16 px-6 lg:px-8 bg-slate-50/50">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Info */}
        <div className="lg:col-span-5 space-y-8">
          <div>
            <Eyebrow>{c.eyebrow}</Eyebrow>
            <h1 className="font-headline text-3xl md:text-headline-lg font-bold text-slate-900 leading-tight mt-3 mb-4">
              {c.title}
            </h1>
            <p className="text-base text-slate-600 leading-relaxed mb-8">
              {c.text}
            </p>

            <div className="space-y-4">
              {cards.map(({ icon: Icon, label, node }) => (
                <div
                  key={label}
                  className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-slate-200"
                >
                  <Icon className="text-forest-600 mt-0.5" size={24} />
                  <div>
                    <h4 className="text-base font-bold text-slate-900">
                      {label}
                    </h4>
                    {node}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-md h-56 bg-slate-100 relative">
            <iframe
              title="MIDO headquarters map"
              src="https://www.openstreetmap.org/export/embed.html?bbox=14.4345%2C45.3215%2C14.4485%2C45.3295&layer=mapnik&marker=45.3255%2C14.4415"
              className="w-full h-full border-0"
              loading="lazy"
            />
            <div className="absolute bottom-3 left-3 bg-white/95 px-3 py-1.5 rounded-xl shadow border border-slate-200 text-label-sm text-slate-800 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-600" />
              <span>{c.mapLabel}</span>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="lg:col-span-7">
          <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-lg">
            <h2 className="font-headline text-headline-md font-bold text-slate-900 mb-6">
              {c.formTitle}
            </h2>
            <Suspense fallback={null}>
              <ContactForm
                dict={c}
                defaultProduct={dict.products.items[0].title}
              />
            </Suspense>
          </div>
        </div>
      </div>
    </main>
  );
}

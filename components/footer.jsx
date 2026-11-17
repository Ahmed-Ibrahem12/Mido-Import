import { Mail, MapPin, Phone } from "lucide-react";
import { site } from "@/lib/site";

export default function Footer({ dict }) {
  return (
    <footer className="bg-forest-950 text-slate-400 px-6 lg:px-8 py-10 border-t border-white/10 text-sm">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="grid gap-8 md:grid-cols-[1.5fr_1fr]">
          <div className="max-w-2xl">
            <p className="leading-relaxed">{dict.footer.description}</p>
          </div>

          <address className="not-italic flex flex-col gap-3">
            <p className="flex items-start gap-2">
              <MapPin size={16} className="mt-0.5 shrink-0 text-gold-300" />
              <span>{site.address}</span>
            </p>
            <a
              href={`mailto:${site.email}`}
              className="flex items-center gap-2 hover:text-gold-300 transition"
            >
              <Mail size={16} />
              {site.email}
            </a>
            {site.phone && (
              <a
                href={`tel:${site.phone.replace(/\s/g, "")}`}
                className="flex items-center gap-2 hover:text-gold-300 transition"
              >
                <Phone size={16} />
                {site.phone}
              </a>
            )}
          </address>
        </div>

        <div className="border-t border-white/10 pt-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
          <p>
            © {new Date().getFullYear()} MIDO IMPORT-EXPORT d.o.o. {dict.footer.rights}
          </p>
          <p className="text-gold-300 uppercase tracking-wide">
            {dict.footer.tagline}
          </p>
        </div>
      </div>
    </footer>
  );
}

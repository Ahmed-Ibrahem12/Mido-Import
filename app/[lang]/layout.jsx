import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "../globals.css";
import Header from "@/components/Header";
import { getDictionary } from "@/lib/dictionaries";
import Footer from "@/components/footer";

const playfair = Playfair_Display({
  subsets: ["latin", "latin-ext"],
  variable: "--font-playfair",
});
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-jakarta",
});

export const metadata = {
  title: "MIDO IMPORT-EXPORT d.o.o.",
  description: "European Timber. Global Connections.",
};

export function generateStaticParams() {
  return [{ lang: "en" }];
}

export default async function LangLayout({ children, params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return (
    <html lang={lang}>
      <body className={`${playfair.variable} ${jakarta.variable} antialiased`}>
        <Header lang={lang} dict={dict} />
        {children}
        <Footer lang={lang} dict={dict} />
      </body>
    </html>
  );
}

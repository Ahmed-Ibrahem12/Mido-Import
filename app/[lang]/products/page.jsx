import { getDictionary } from "@/lib/dictionaries";
import ProductsGrid from "@/components/ProductsGrid";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return {
    title: dict.meta.products.title,
    description: dict.meta.products.description,
  };
}

export default async function Products({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <main className="bg-slate-50 py-16 px-6 lg:px-8">
      <ProductsGrid lang={lang} dict={dict.products} />
    </main>
  );
}

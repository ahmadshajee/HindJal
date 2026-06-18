import { getProducts } from "@/lib/products";
import { MainApp } from "@/components/main-app";

type ContactPageProps = {
  searchParams: Promise<{
    product?: string | string[];
  }>;
};

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const resolvedParams = await searchParams;
  const productParam = Array.isArray(resolvedParams?.product) ? resolvedParams?.product[0] : resolvedParams?.product;
  const products = await getProducts();

  return <MainApp initialPath={productParam ? `/contact?product=${productParam}` : "/contact"} products={products} />;
}
import { getProducts } from "@/lib/products";
import { MainApp } from "@/components/main-app";

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  const products = await getProducts();

  return <MainApp initialPath="/products" products={products} />;
}
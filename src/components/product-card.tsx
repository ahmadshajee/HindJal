import Link from "next/link";
import { formatRupees, type Product } from "@/lib/site";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const displayPrice = product.quoteOnly ? "Custom quote" : formatRupees(product.price);

  return (
    <article className="product-card fade-up" data-accent={product.accent} data-featured={product.featured ? "true" : "false"}>
      <div className="product-card__topline" />

      <div className="product-card__header">
        <div>
          <span className="product-card__badge">{product.category}</span>
          <h3 className="product-card__title">{product.name}</h3>
        </div>
        <div className="product-card__price">{displayPrice}</div>
      </div>

      <p className="product-card__meta">{product.unit}</p>
      <p className="product-card__description">{product.description}</p>

      <ul className="product-card__specs">
        {product.specs.map((spec) => (
          <li key={spec}>{spec}</li>
        ))}
      </ul>

      <div className="product-card__footer">
        <span className="product-card__unit">
          {product.quoteOnly ? "Tailored for bulk or special orders" : "Ready for quick checkout"}
        </span>
        <Link className="product-card__cta" href={`/contact?product=${product.slug}`}>
          {product.ctaLabel ?? "Order now"}
        </Link>
      </div>
    </article>
  );
}
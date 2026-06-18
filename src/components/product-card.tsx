import { NavigationLink } from "@/components/navigation-context";
import { type Product } from "@/lib/products";
import { formatRupees } from "@/lib/site";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const displayPrice = product.quoteOnly ? "Custom quote" : formatRupees(product.price);
  const hasImage = typeof product.imageUrl === "string" && product.imageUrl.trim().length > 0;

  return (
    <article className="product-card fade-up" data-accent={product.accent} data-featured={product.featured ? "true" : "false"}>
      <div className="product-card__topline" />

      <div className="product-card__media">
        {hasImage ? (
          // A plain img tag is used intentionally because CMS image hosts are fully dynamic.
          // eslint-disable-next-line @next/next/no-img-element
          <img alt={product.name} className="product-card__image" loading="lazy" src={product.imageUrl} />
        ) : (
          <div className="product-card__image-fallback" aria-hidden="true" />
        )}
      </div>

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
        {product.tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>

      <div className="product-card__footer">
        <span className="product-card__unit">
          {product.quoteOnly ? "Tailored for bulk or special orders" : "Ready for quick checkout"}
        </span>
        <NavigationLink className="product-card__cta" href={`/contact?product=${product.slug}`}>
          {product.ctaLabel ?? "Order now"}
        </NavigationLink>
      </div>
    </article>
  );
}
import Link from "next/link";
import { Skeleton } from "../ui/skeleton";

export const Products = async ({
  products,
  extraClassname = "",
}: {
  products: any[];
  extraClassname: string;
}) => {
  // Controleer of products bestaat en niet leeg is
  if (!products || products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-xl">Geen producten gevonden</p>
      </div>
    );
  }

  const gridClassname = [
    "grid gap-x-3.5 gap-y-6 sm:gap-y-9",
    extraClassname === "colums-mobile" && "grid-cols-auto-fill-110",
    extraClassname === "cart-ord-mobile" && "grid-cols-1",
    "sm:grid-cols-auto-fill-250",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={gridClassname}>
      {products.map((product, index) => {
        // Veilige toegang tot alle velden met fallbacks
        const {
          _id,
          productId,
          title = `Product ${index + 1}`,
          description = "",
          price = 0,
          stockStatus = "",
          categoryName = "products",
          imageUrl = "",
          merchantName = ""
        } = product;

        // Genereer een veilig ID voor de key
        const safeId = _id ? _id.toString() : `product-${index}`;
        
        // Maak een veilige product link
        const productLink = `/${categoryName || 'products'}/${productId || safeId}`;

        return (
          <div 
            key={safeId} 
            className="flex flex-col justify-between border border-solid border-[#2E2E2E] rounded-md overflow-hidden bg-[#0A0A0A]"
          >
            {/* Product afbeelding of placeholder */}
            <Link href={productLink} className="hover:scale-105 transition-all">
              {imageUrl ? (
                <img 
                  src={imageUrl} 
                  alt={title || `Product ${index + 1}`}
                  className="w-full aspect-[2/3] object-cover"
                />
              ) : (
                <div className="bg-gray-800 aspect-[2/3] flex items-center justify-center">
                  <span className="text-lg text-center p-4">
                    {title || `Product ${index + 1}`}
                  </span>
                </div>
              )}
            </Link>

            {/* Product informatie */}
            <div className="flex flex-col gap-2 p-3.5">
              <div className="flex items-start justify-between">
                <h3 className="text-sm font-medium">{title || `Product ${index + 1}`}</h3>
              </div>

              {merchantName && (
                <p className="text-xs text-gray-400">{merchantName}</p>
              )}

              {stockStatus && (
                <p className="text-xs text-green-500">{stockStatus}</p>
              )}

              <div className="flex items-start justify-between">
                <span className="font-bold text-sm">€{Number(price).toFixed(2)}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
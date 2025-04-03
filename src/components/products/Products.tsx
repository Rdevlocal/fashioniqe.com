import Link from "next/link";
import dynamic from "next/dynamic";
import { Skeleton } from "../ui/skeleton";

// Use dynamic import with ssr: false for wishlist button
const WishlistButton = dynamic(() => import("../cart/WishlistButton"), {
  ssr: false,
  loading: () => <Skeleton className="w-5 h-5" />,
});

export const Products = ({
  products,
  extraClassname = "",
  wishlistData = null,
  userSession = null
}: {
  products: any[];
  extraClassname: string;
  wishlistData?: any;
  userSession?: any;
}) => {
  // Ensure we have products
  if (!products || products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-xl">No products found</p>
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

  console.log(`Rendering ${products.length} products`);

  return (
    <div className={gridClassname}>
      {products.map((product, index) => {
        // Safely extract product data with fallbacks
        const productId = product._id ? product._id.toString() : `product-${index}`;
        
        // Determine category with fallbacks
        const category = product.category || product.categoryName || "product";
        
        // Handle quantity
        const quantity = product.quantity || 1;
        
        // Handle image with multiple fallbacks
        const image = 
          Array.isArray(product.image) && product.image.length > 0 ? product.image : 
          product.imageUrl ? [product.imageUrl] : 
          product.aw_image_url ? [product.aw_image_url] :
          product.merchant_deep_link ? ["/placeholder.jpg"] : ["/placeholder.jpg"];
        
        // Handle product name with fallbacks
        const name = product.name || product.product_name || product.title || `Product ${index + 1}`;
        
        // Handle price with fallbacks
        const price = 
          typeof product.price === 'number' ? product.price : 
          typeof product.store_price === 'number' ? product.store_price : 
          typeof product.display_price === 'string' && !isNaN(parseFloat(product.display_price.replace(/[^0-9.]/g, ''))) ? 
            parseFloat(product.display_price.replace(/[^0-9.]/g, '')) : 0;
                     
        const title = product.title || name;

        // Determine product link with appropriate ID
        const actualProductId = product.productId || product.aw_product_id || productId;
        const productLink = `/${category}/${actualProductId}`;

        const containerClassname = [
          "flex justify-between border border-solid border-[#2E2E2E] rounded-md overflow-hidden",
          extraClassname === "cart-ord-mobile" ? "flex-row sm:flex-col" : "flex-col",
        ]
          .filter(Boolean)
          .join(" ");
          
        const linkClassname =
          extraClassname === "cart-ord-mobile"
            ? "w-6/12 sm:w-full hover:scale-105 transition-all"
            : "hover:scale-105 transition-all";
            
        const infoClassname = [
          extraClassname === "cart-ord-mobile" ? "w-6/12 sm:w-full" : "",
          "flex justify-between flex-col gap-2.5 p-3.5 bg-[#0A0A0A] z-10",
        ]
          .filter(Boolean)
          .join(" ");

        // Determine what to display for the image
        const hasImage = image && image.length > 0;
        const imageUrl = hasImage ? image[0] : "/placeholder.jpg";

        return (
          <div key={productId} className={containerClassname}>
            <Link href={productLink} className={linkClassname}>
              {hasImage ? (
                <div className="aspect-[2/3] relative">
                  <img
                    src={imageUrl}
                    alt={name || title}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="aspect-[2/3] bg-gray-800 flex items-center justify-center text-center p-4">
                  <span>{name || title}</span>
                </div>
              )}
            </Link>
            <div className={infoClassname}>
              <div className="flex items-start justify-between">
                <h3 className="text-sm">{name || title}</h3>
                {wishlistData && userSession && (
                  <WishlistButton
                    session={userSession}
                    productId={JSON.stringify(productId)}
                    wishlistString={JSON.stringify(wishlistData)}
                  />
                )}
              </div>
              <div className="flex items-start justify-between">
                <span className="font-medium">€{Number(price).toFixed(2)}</span>
                
                {/* Display stock status if available */}
                {product.stockStatus && (
                  <span className="text-xs text-green-500">{product.stockStatus}</span>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
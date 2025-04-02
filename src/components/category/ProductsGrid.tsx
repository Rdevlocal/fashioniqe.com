// src/components/category/ProductsGrid.tsx
import React from "react";
import Link from "next/link";
import Image from "next/image";

interface ProductsGridProps {
  products: any[];
}

const ProductsGrid: React.FC<ProductsGridProps> = ({ products }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

const ProductCard = ({ product }: { product: any }) => {
  // Extract product data with fallbacks
  const {
    _id,
    name = product.title || "Product",
    price = 0,
    image = [],
    category = "product",
    discount,
    originalPrice,
  } = product;

  // Format product URL
  const productId = _id ? _id.toString() : "";
  const productLink = `/${category}/${productId}`;

  // Format price display
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };

  // Calculate discount percentage if available
  const discountPercentage = discount || (originalPrice && price < originalPrice 
    ? Math.round(((originalPrice - price) / originalPrice) * 100) 
    : null);

  return (
    <Link 
      href={productLink} 
      className="group border border-gray-800 rounded-lg overflow-hidden flex flex-col bg-[#0A0A0A] hover:border-gray-600 transition-all"
    >
      {/* Product Image */}
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-900">
        <Image
          src={image[0] || "/placeholder.jpg"}
          alt={name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
        />
        
        {/* Discount badge */}
        {discountPercentage && (
          <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
            -{discountPercentage}%
          </div>
        )}
      </div>
      
      {/* Product Info */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-sm mb-1 line-clamp-2 group-hover:text-blue-400 transition-colors">
          {name}
        </h3>
        
        <div className="mt-auto flex items-center">
          <div className="font-medium">
            {formatPrice(price)}
          </div>
          
          {/* Original price if discounted */}
          {originalPrice && price < originalPrice && (
            <div className="ml-2 text-sm text-gray-500 line-through">
              {formatPrice(originalPrice)}
            </div>
          )}
        </div>
        
        {/* Stock status */}
        {product.stockStatus && (
          <div className="mt-1 text-xs text-green-500">
            {product.stockStatus}
          </div>
        )}
      </div>
    </Link>
  );
};

export default ProductsGrid;
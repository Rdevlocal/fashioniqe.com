import { Products } from "@/components/products/Products";
import { getAllProducts } from "../actions";
import { Suspense } from "react";
import ProductSkeleton from "@/components/skeletons/ProductSkeleton";

interface SearchProps {
  searchParams: { [key: string]: string | undefined };
}

const normalizeText = (text: string = ""): string => {
  return text
    .replace(/[-_]/g, "")
    .replace(/[^\w\s]/g, "")
    .toLowerCase()
    .trim();
};

const Search: React.FC<SearchProps> = async ({ searchParams }) => {
  // Use Suspense to handle loading state
  return (
    <section className="pt-14">
      <h2 className="mb-5 text-xl font-bold sm:text-2xl">
        Zoekresultaten voor "{searchParams.q || ""}"
      </h2>
      
      <Suspense
        fallback={<ProductSkeleton extraClassname="" numberProducts={6} />}
      >
        <SearchResults query={searchParams.q || ""} />
      </Suspense>
    </section>
  );
};

// Separate component for the search results to use with Suspense
const SearchResults = async ({ query }: { query: string }) => {
  const products = await getAllProducts();
  
  // Ensure products is an array before filtering
  const productList = Array.isArray(products) ? products : [];
  
  // Handle the case when products is undefined or empty
  if (!productList || productList.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-xl">Geen producten gevonden</p>
      </div>
    );
  }

  // Filter products based on the search query
  const filteredProducts = productList.filter((product) => {
    // Check if the product has a name property
    const productName = product?.name || product?.title || "";
    const normalizedProductName = normalizeText(productName);
    const normalizedQuery = normalizeText(query);
    
    // Only filter if there's a query, otherwise return all products
    if (!normalizedQuery) return true;
    
    return normalizedProductName.includes(normalizedQuery);
  });

  return (
    <>
      {filteredProducts.length > 0 ? (
        <Products products={filteredProducts} extraClassname="" />
      ) : (
        <div className="text-center py-12">
          <p className="text-xl">Geen producten gevonden voor "{query}"</p>
        </div>
      )}
    </>
  );
};

export default Search;
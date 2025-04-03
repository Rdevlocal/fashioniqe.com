import { Products } from "@/components/products/Products";
import { getAllProducts } from "../actions";
import { Suspense } from "react";
import ProductSkeleton from "@/components/skeletons/ProductSkeleton";

interface SearchProps {
  searchParams: { [key: string]: string | undefined };
}

// Functie om tekst te normaliseren voor zoeken
const normalizeText = (text: string = ""): string => {
  return text
    .toLowerCase()
    .normalize('NFD')  // Decompose accented characters
    .replace(/[\u0300-\u036f]/g, '')  // Remove accent marks
    .replace(/[^\w\s]/g, '')  // Remove special characters
    .trim();
};

const Search: React.FC<SearchProps> = async ({ searchParams }) => {
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

// Aparte component voor zoekresultaten om Suspense te gebruiken
const SearchResults = async ({ query }: { query: string }) => {
  const products = await getAllProducts();
  
  // Zorg ervoor dat producten een array zijn
  const productList = Array.isArray(products) ? products : [];
  
  // Behandel het geval als producten niet beschikbaar zijn
  if (!productList || productList.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-xl">Geen producten gevonden</p>
      </div>
    );
  }

  // Filter producten op basis van zoekquery
  const filteredProducts = productList.filter((product) => {
    // Als er geen query is, toon alle producten
    if (!query) return true;

    // Genormaliseerde query
    const normalizedQuery = normalizeText(query);

    // Zoek in verschillende velden met verschillende gewichten
    const searchFields = [
      { field: product?.name || product?.title || '', weight: 3 },
      { field: product?.description || '', weight: 1 },
      { field: product?.category || '', weight: 1 },
      { field: product?.categoryName || '', weight: 1 }
    ];

    // Bereken de overeenkomst voor elk veld
    const matches = searchFields.some(({ field, weight }) => {
      const normalizedField = normalizeText(field);
      const matchScore = normalizedField.includes(normalizedQuery) ? weight : 0;
      return matchScore > 0;
    });

    return matches;
  });

  return (
    <>
      {filteredProducts.length > 0 ? (
        <Products products={filteredProducts} extraClassname="" />
      ) : (
        <div className="text-center py-12">
          <p className="text-xl">Geen producten gevonden voor "{query}"</p>
          <p className="text-sm text-gray-400 mt-2">
            Probeer andere zoektermen of bekijk onze collecties
          </p>
        </div>
      )}
    </>
  );
};

export default Search;
import { Products } from "@/components/products/Products";
import { getAllProducts } from "./actions";
import ProductSkeleton from "@/components/skeletons/ProductSkeleton";
import { Suspense } from "react";

export default async function Home() {
  // Haal producten op van de server
  const products = await getAllProducts();

  return (
    <section className="pt-14">
      <h1 className="text-2xl font-bold mb-8">Onze Collectie</h1>
      
      <Suspense
        fallback={<ProductSkeleton extraClassname="" numberProducts={8} />}
      >
        {products && products.length > 0 ? (
          <Products products={products} extraClassname="" />
        ) : (
          <div className="text-center py-12">
            <p className="text-xl">Geen producten gevonden</p>
          </div>
        )}
      </Suspense>
    </section>
  );
}
import { SingleProduct } from "@/components/products/SingleProduct";
import { Products } from "@/components/products/Products";
import { getProduct, getRandomProducts, getCategoryProducts } from "@/app/actions";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/libs/auth";
import { Suspense } from "react";
import ProductSkeleton from "@/components/skeletons/ProductSkeleton";
import SingleProductSkeleton from "@/components/skeletons/SingleProductSkeleton";

type Props = {
  params: {
    category: string;
    id: string;
  };
};

export async function generateMetadata({ params }: Props) {
  const product = await getProduct(params.id);
  const productTitle = product?.title || product?.name || "Product";

  return {
    title: `${productTitle} | Webshop`,
    description: product?.description || "Bekijk dit product in onze webshop",
  };
}

const ProductPage = async ({ params }: Props) => (
  <section className="pt-14">
    <Suspense
      fallback={
        <div>
          <SingleProductSkeleton />
          <h2 className="mt-24 mb-5 text-xl font-bold sm:text-2xl">
            BEKIJK OOK...
          </h2>
          <ProductSkeleton
            extraClassname={"colums-mobile"}
            numberProducts={6}
          />
        </div>
      }
    >
      <AllProducts id={params.id} category={params.category} />
    </Suspense>
  </section>
);

const AllProducts = async ({ id, category }: { id: string; category: string }) => {
  const session = await getServerSession(authOptions);
  const product = await getProduct(id);
  
  if (!product) {
    return (
      <div className="flex items-center justify-center py-12">
        <h1 className="text-2xl">Product niet gevonden</h1>
      </div>
    );
  }
  
  // Haal zowel willekeurige als vergelijkbare producten op
  const randomProducts = await getRandomProducts(id);
  const similarProducts = await getCategoryProducts(category);
  
  // Filter het huidige product uit de vergelijkbare producten
  const filteredSimilarProducts = similarProducts.filter(p => 
    p._id.toString() !== (product._id ? product._id.toString() : id)
  ).slice(0, 6); // Beperk tot 6 items

  const productJSON = JSON.stringify(product);

  return (
    <>
      <SingleProduct product={productJSON} session={session} />

      {filteredSimilarProducts && filteredSimilarProducts.length > 0 && (
        <>
          <h2 className="mt-24 mb-5 text-xl font-bold sm:text-2xl">
            VERGELIJKBARE ITEMS
          </h2>
          <Products products={filteredSimilarProducts} extraClassname={"colums-mobile"} />
        </>
      )}

      {randomProducts && randomProducts.length > 0 && (
        <>
          <h2 className="mt-24 mb-5 text-xl font-bold sm:text-2xl">
            BEKIJK OOK...
          </h2>
          <Products products={randomProducts} extraClassname={"colums-mobile"} />
        </>
      )}
    </>
  );
};

export default ProductPage;
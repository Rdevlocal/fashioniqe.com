import { Products } from "@/components/products/Products";
import { getCategoryProducts } from "../actions";
import ProductSkeleton from "@/components/skeletons/ProductSkeleton";
import { Suspense } from "react";

type Props = {
  params: {
    gender: string;
  };
};

export async function generateMetadata({ params }: Props) {
  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const capitalizedGender = capitalizeFirstLetter(params.gender);

  return {
    title: `${capitalizedGender} | Webshop`,
    description: `${capitalizedGender} producten in onze webshop`,
  };
}

const GenderPage = async ({ params }: Props) => {
  return (
    <section className="pt-14">
      <h1 className="text-2xl font-bold mb-8">
        {params.gender.charAt(0).toUpperCase() + params.gender.slice(1)}
      </h1>
      
      <Suspense
        fallback={<ProductSkeleton extraClassname="" numberProducts={6} />}
      >
        <GenderProducts gender={params.gender} />
      </Suspense>
    </section>
  );
};

const GenderProducts = async ({ gender }: { gender: string }) => {
  const products = await getCategoryProducts(gender);

  return (
    <>
      {products && products.length > 0 ? (
        <Products products={products} extraClassname="" />
      ) : (
        <div className="text-center py-12">
          <p className="text-xl">Geen producten gevonden in deze categorie</p>
        </div>
      )}
    </>
  );
};

export default GenderPage;
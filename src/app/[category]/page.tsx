import { Products } from "@/components/products/Products";
import { getCategoryProducts } from "../actions";
import ProductSkeleton from "@/components/skeletons/ProductSkeleton";
import { Suspense } from "react";

type Props = {
  params: {
    category: string;
  };
};

export async function generateMetadata({ params }: Props) {
  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const capitalizedCategory = capitalizeFirstLetter(params.category);

  return {
    title: `${capitalizedCategory} | Webshop`,
    description: `${capitalizedCategory} Products in our webshop`,
  };
}

const CategoryPage = async ({ params }: Props) => {
  return (
    <section className="pt-14">
      <h1 className="text-2xl font-bold mb-8">
        {params.category.charAt(0).toUpperCase() + params.category.slice(1)}
      </h1>
      
      <Suspense
        fallback={<ProductSkeleton extraClassname="" numberProducts={6} />}
      >
        <CategoryProducts category={params.category} />
      </Suspense>
    </section>
  );
};

const CategoryProducts = async ({ category }: { category: string }) => {
  const products = await getCategoryProducts(category);

  return (
    <>
      {products && products.length > 0 ? (
        <Products products={products} extraClassname="" />
      ) : (
        <div className="text-center py-12">
          <p className="text-xl">No Product in this category</p>
        </div>
      )}
    </>
  );
};

export default CategoryPage;
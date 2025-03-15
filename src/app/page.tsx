"use client";

import { Suspense, useState } from "react";
import { Products } from "../components/products/Products";
import { getAllProducts } from "./actions";
import ProductSkeleton from "@/components/skeletons/ProductSkeleton";

const Home = () => {
  const [filters, setFilters] = useState({
    price: "",
    brand: "",
    size: "",
    pasvorm: "",
  });

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  return (
    <section className="pt-14">
      <div className="filters">
        <input
          type="text"
          name="price"
          placeholder="Price"
          value={filters.price}
          onChange={handleFilterChange}
        />
        <input
          type="text"
          name="brand"
          placeholder="Brand"
          value={filters.brand}
          onChange={handleFilterChange}
        />
        <input
          type="text"
          name="size"
          placeholder="Size"
          value={filters.size}
          onChange={handleFilterChange}
        />
        <input
          type="text"
          name="pasvorm"
          placeholder="Pasvorm"
          value={filters.pasvorm}
          onChange={handleFilterChange}
        />
      </div>
      <Suspense
        fallback={<ProductSkeleton extraClassname="" numberProducts={18} />}
      >
        <AllProducts filters={filters} />
      </Suspense>
    </section>
  );
};

interface Filters {
  price: string;
  brand: string;
  size: string;
  pasvorm: string;
}
const AllProducts = async ({ filters }: { filters: Filters }) => {
  const products = await getAllProducts();
  return <Products products={products} extraClassname="" />;
};

export default Home;

"use client";

import { useEffect, useMemo, useState } from "react";
import datastore from "./data/data";
import Table from "./components/table";

import type { Products, Operator, Property, Filters } from "./types/types";

// TODO: Extract logic into it's own file and add the filters
const filterProducts = (products: Products, filters?: Filters) => {
  if (filters) {
    return products;
  } else {
    return products;
  }
};

const Home = () => {
  // datastore values
  const [products, setProducts] = useState<Products>([]);
  const [operators, setOperators] = useState<Operator[]>([]);
  const [properties, setProperties] = useState<Property[]>([]);

  // user updated values
  const [filters, setFilters] = useState<Filters>();

  useEffect(() => {
    setProducts(datastore.getProducts());
    setOperators(datastore.getOperators());
    setProperties(datastore.getProperties());
  }, [setProducts, setOperators, setProperties]);

  const visibleProducts = useMemo(
    () => filterProducts(products, filters),
    [products, filters]
  );

  return (
    <main className="flex min-h-screen flex-col gap-10 w-full p-24">
      <div></div>
      <section className="w-full">
        <Table headers={properties} rows={visibleProducts} />
      </section>
    </main>
  );
};

export default Home;

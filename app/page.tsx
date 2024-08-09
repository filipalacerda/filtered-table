"use client";

import { useEffect, useMemo, useState } from "react";
import datastore from "./data/data";
import Table from "./components/table";
import Search from "./components/search";

import { filterProducts } from "./filterProducts/filterProducts";

import type { Products, Operator, Property, Filters } from "./types/types";

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
    setProperties(datastore.getProperties() as Property[]);
  }, [setProducts, setOperators, setProperties]);

  const visibleProducts = useMemo(
    () => filterProducts(products, filters),
    [products, filters]
  );

  const handleOnSearch = (values: Filters) => {
    setFilters(values);
  };

  const handleOnClear = () => {
    setFilters({});
  };

  return (
    <main className="flex min-h-screen flex-col gap-10 w-full p-24">
      <section className="flex flex-row justify-between">
        <Search
          categories={properties}
          operators={operators}
          onSubmit={handleOnSearch}
          onClear={handleOnClear}
        />
      </section>
      <section className="w-full">
        <Table headers={properties} rows={visibleProducts} />
      </section>
    </main>
  );
};

export default Home;

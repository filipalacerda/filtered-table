"use client";

import { useEffect, useMemo, useState } from "react";
import datastore from "./data/data";
import Table from "./components/table";
import Search from "./components/search";

import { filterProducts } from "./filterProducts/filterProducts";

import type { Products, Operator, Property, Filters } from "./types/types";

const App = () => {
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
    <main className="app">
      <section className="search-container">
        <Search
          categories={properties}
          operators={operators}
          onChange={handleOnSearch}
          onClear={handleOnClear}
        />
      </section>
      <section className="table-container">
        <Table headers={properties} rows={visibleProducts} />
      </section>
    </main>
  );
};

export default App;

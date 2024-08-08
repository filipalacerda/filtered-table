"use client";

import { useEffect, useMemo, useState } from "react";
import datastore from "./data/data";

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
    <main className="flex min-h-screen flex-col items-center justify-between p-24"></main>
  );
};

export default Home;

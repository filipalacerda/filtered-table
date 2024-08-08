"use client";

import { useEffect, useMemo, useState } from "react";
import datastore from "./data/data";

import type { Products, Operator, Property } from "./types/types";

export default function Home() {
  // datastore values
  const [products, setProducts] = useState<Products>([]);
  const [operators, setOperators] = useState<Operator[]>([]);
  const [properties, setProperties] = useState<Property[]>([]);

  useEffect(() => {
    setProducts(datastore.getProducts());
    setOperators(datastore.getOperators());
    setProperties(datastore.getProperties());
  }, [setProducts, setOperators, setProperties]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24"></main>
  );
}

import { Filters, Products } from "../types/types";

const filterProducts = (products: Products, filters?: Filters) => {
  if (!filters || (filters && !Object.keys(filters).length)) {
    return products;
  } else {
    return [];
  }
};

export { filterProducts };

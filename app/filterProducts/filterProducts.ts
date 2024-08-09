import { Filters, Products } from "../types/types";

const normalizeValueToString = (value: string | number) => {
  if (typeof value === "string") {
    return value.toLowerCase();
  } else if (typeof value === "number") {
    return value.toString().toLowerCase();
  }
  return value;
};

const normalizeValueToNumber = (value: string | number) => {
  if (typeof value === "string") {
    return parseInt(value);
  }

  return value;
};

/**
 * Performs the equal search.
 *
 * Since the value can be capitalized or a number,
 * we normalize both the values for each case.
 *
 * @param products
 * @param filters
 * @returns array
 */
const equalFilter = (products: Products, filters: Filters) => {
  const propertyId = filters.property?.id;
  const propertyType = filters.property?.type;
  const filterValue = filters.value as string;
  // Only filters after the user types in a value
  if (!filterValue) {
    return products;
  } else {
    return products.reduce((acc, product) => {
      product.property_values.forEach((value) => {
        if (value.property_id === propertyId) {
          if (propertyType === "string" || propertyType === "enumerated") {
            if (
              normalizeValueToString(value.value) ===
              normalizeValueToString(filterValue)
            ) {
              acc.push(product);
            }
          } else if (propertyType === "number") {
            if (
              normalizeValueToNumber(value.value) ===
              normalizeValueToNumber(filterValue)
            ) {
              acc.push(product);
            }
          }
        }
      });
      return acc;
    }, [] as Products);
  }
};

/**
 * greater_than operator is only used for number properties.
 *
 * We need to parseInt the value input by the user
 * and compare with the property_id value
 *
 * @param products
 * @param filters
 * @returns array
 */
const greaterThanFilter = (products: Products, filters: Filters) => {
  const propertyId = filters.property?.id;
  const filterValue = parseInt(filters.value as string);
  // Only filters after the user types in a value
  if (!filterValue) {
    return products;
  } else {
    return products.reduce((acc, product) => {
      product.property_values.forEach((value) => {
        const valueProperty = value.value as number;
        if (value.property_id === propertyId) {
          if (valueProperty > filterValue) {
            acc.push(product);
          }
        }
      });
      return acc;
    }, [] as Products);
  }
};

/**
 * less_than operator is only used for number properties.
 *
 * We need to parseInt the value input by the user
 * and compare with the property_id value
 *
 * @param products
 * @param filters
 * @returns array
 */
const lessThanFilter = (products: Products, filters: Filters) => {
  const propertyId = filters.property?.id;
  const filterValue = parseInt(filters.value as string);
  // Only filters after the user types in a value
  if (!filterValue) {
    return products;
  } else {
    return products.reduce((acc, product) => {
      product.property_values.forEach((value) => {
        const valueProperty = value.value as number;
        if (value.property_id === propertyId) {
          if (valueProperty < filterValue) {
            acc.push(product);
          }
        }
      });
      return acc;
    }, [] as Products);
  }
};

/**
 * If any filter is applied, returns all the products
 * where the property selected has a value
 *
 * @param products
 * @param filters
 * @returns
 */
const anyFilter = (products: Products, filters: Filters) => {
  const propertyId = filters.property?.id;

  return products.reduce((acc, product) => {
    product.property_values.forEach((value) => {
      if (
        value.property_id === propertyId &&
        (value.value || value.value !== null)
      ) {
        acc.push(product);
      }
    });
    return acc;
  }, [] as Products);
};

/**
 * For the none filter, we want to return the products that don't have an object on the property_values array
 * In this case, i'm assuming the property_id needs to be taken in consideration
 * and that the order of the property_values array matches the index of the selected property
 *
 * @param products
 * @param filters
 * @returns
 */
const noneFilter = (products: Products, filters: Filters) => {
  const propertyId = filters.property?.id as number;

  return products.reduce((acc, product) => {
    // if the value is not defined, the `property_values` object does not exist
    if (product.property_values[propertyId] === undefined) {
      acc.push(product);
    }
    return acc;
  }, [] as Products);
};

/**
 * In the in filter, the value could have more than one world typed in.
 * According to the specs, the values will be separated by a comma.
 *
 * This function also assumes that a number can be typed in
 * although the input type is a number and won't allow for more than one number to be typed
 *
 * @param products
 * @param filters
 */
const inFilter = (products: Products, filters: Filters) => {
  const propertyId = filters.property?.id;
  const propertyType = filters.property?.type;
  const filterValues = filters.value ? filters.value?.split(", ") : [];

  let i: number;
  const result: Products = [];

  for (i = 0; i <= filterValues?.length; i++) {
    const filterValue = filterValues[i];

    products.forEach((product) => {
      product.property_values.forEach((value) => {
        if (value.property_id === propertyId) {
          if (propertyType === "string" || propertyType === "enumerated") {
            if (
              normalizeValueToString(value.value) ===
              normalizeValueToString(filterValue)
            ) {
              result.push(product);
            }
          } else if (propertyType === "number") {
            if (
              normalizeValueToNumber(value.value) ===
              normalizeValueToNumber(filterValue)
            ) {
              result.push(product);
            }
          }
        }
      });
    });
  }
  return result;
};
/**
 * The contains filter checks if the product has the value typed in
 * @param products
 * @param filters
 */
const containsFilter = (products: Products, filters: Filters) => {
  const propertyId = filters.property?.id;
  const filterValue = filters.value as string;
  // Only filters after the user types in a value
  if (!filterValue) {
    return products;
  } else {
    return products.reduce((acc, product) => {
      product.property_values.forEach((value) => {
        if (value.property_id === propertyId) {
          if (
            normalizeValueToString(value.value).includes(
              normalizeValueToString(filterValue)
            )
          ) {
            acc.push(product);
          }
        }
      });
      return acc;
    }, [] as Products);
  }
};

const filterProducts = (products: Products, filters?: Filters) => {
  if (!filters || (filters && !Object.keys(filters).length)) {
    return products;
  } else {
    switch (filters?.operator?.id) {
      case "equals":
        return equalFilter(products, filters);
      case "greater_than":
        return greaterThanFilter(products, filters);
      case "less_than":
        return lessThanFilter(products, filters);
      case "any":
        return anyFilter(products, filters);
      case "none":
        return noneFilter(products, filters);
      case "in":
        return inFilter(products, filters);
      case "contains":
        return containsFilter(products, filters);
      default:
        return products;
    }
  }
};

export {
  filterProducts,
  normalizeValueToString,
  normalizeValueToNumber,
  equalFilter,
  greaterThanFilter,
  lessThanFilter,
};

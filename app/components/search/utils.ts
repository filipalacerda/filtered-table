import { Operator, PropertyType } from "@/app/types/types";

const categoryOperatorsMap = {
  string: ["equals", "any", "none", "in", "contains"],
  number: ["equals", "greater_than", "less_than", "any", "none", "in"],
  enumerated: ["equals", "any", "none", "in"],
};

/**
 * Not all operators are available for each property type.
 *
 * This function maps the available operators for each property type
 *
 * @param operators
 * @param currentCategoryProperty
 * @returns array
 */
const filterOperators = (
  operators: Operator[],
  currentCategoryProperty?: PropertyType
) => {
  let result: [] | Operator[];
  const availableOperators =
    currentCategoryProperty && categoryOperatorsMap[currentCategoryProperty];

  if (availableOperators) {
    result = operators.reduce((acc: Operator[], value: Operator) => {
      if (availableOperators.includes(value.id)) {
        acc.push(value);
      }
      return acc;
    }, []);
  } else {
    result = [];
  }
  return result;
};

export { filterOperators };

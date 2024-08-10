import {
  filterProducts,
  normalizeValueToNumber,
  normalizeValueToString,
  equalFilter,
  greaterThanFilter,
  lessThanFilter,
  anyFilter,
  noneFilter,
  inFilter,
  containsFilter,
} from "./filterProducts";

import datastore from "../data/data";
import { Property } from "../types/types";

describe("FilterProducts", () => {
  const products = datastore.getProducts();
  const properties = datastore.getProperties();
  const operators = datastore.getOperators();

  describe(normalizeValueToNumber.name, () => {
    it("return a number when provided value is a string", () => {
      expect(normalizeValueToNumber("5")).toEqual(5);
    });
    it("returns the provided value if it is not a string", () => {
      expect(normalizeValueToNumber(5)).toEqual(5);
    });
  });

  describe(normalizeValueToString.name, () => {
    it("returns a lower case string", () => {
      expect(normalizeValueToString("Headphones")).toEqual("headphones");
      expect(normalizeValueToString(5)).toEqual("5");
    });

    it("trims the whitespaces", () => {
      expect(normalizeValueToString(" cup")).toEqual("cup");
    });
  });

  describe(filterProducts.name, () => {
    describe("with no filters", () => {
      it("should return the products", () => {
        const result = filterProducts(products, {});
        expect(result).toEqual(products);
      });
    });

    describe("with equals operator", () => {
      it("should return the products where the value matches the property", () => {
        const result = filterProducts(products, {
          property: properties[0] as Property,
          operator: operators[0],
          value: "Headphones",
        });

        expect(result).toEqual([
          {
            id: 0,
            property_values: [
              {
                property_id: 0,
                value: "Headphones",
              },
              {
                property_id: 1,
                value: "black",
              },
              {
                property_id: 2,
                value: 5,
              },
              {
                property_id: 3,
                value: "electronics",
              },
              {
                property_id: 4,
                value: "false",
              },
            ],
          },
        ]);
      });
    });

    describe("with greater_than filter", () => {
      it("should return the products where the value is bigger than the provided value", () => {
        const result = filterProducts(products, {
          property: properties[2] as Property,
          operator: operators[1],
          value: "10",
        });

        expect(result).toEqual([
          {
            id: 5,
            property_values: [
              {
                property_id: 0,
                value: "Hammer",
              },
              {
                property_id: 1,
                value: "brown",
              },
              {
                property_id: 2,
                value: 19,
              },
              {
                property_id: 3,
                value: "tools",
              },
            ],
          },
        ]);
      });
    });

    describe("with less_than filter", () => {
      it("returns the products where the property value is less than the provided value", () => {
        const result = filterProducts(products, {
          property: properties[2] as Property,
          operator: operators[2],
          value: "3",
        });

        expect(result).toEqual([
          {
            id: 4,
            property_values: [
              {
                property_id: 0,
                value: "Key",
              },
              {
                property_id: 1,
                value: "silver",
              },
              {
                property_id: 2,
                value: 1,
              },
              {
                property_id: 3,
                value: "tools",
              },
            ],
          },
        ]);
      });
    });

    describe("with any filter", () => {
      it("should return products where the property is defined", () => {
        const result = filterProducts(products, {
          property: {
            id: 4,
            name: "wireless",
            type: "enumerated",
            values: ["true", "false"],
          },
          operator: {
            text: "Has any value",
            id: "any",
          },
        });

        expect(result).toEqual([
          {
            id: 0,
            property_values: [
              {
                property_id: 0,
                value: "Headphones",
              },
              {
                property_id: 1,
                value: "black",
              },
              {
                property_id: 2,
                value: 5,
              },
              {
                property_id: 3,
                value: "electronics",
              },
              {
                property_id: 4,
                value: "false",
              },
            ],
          },
          {
            id: 1,
            property_values: [
              {
                property_id: 0,
                value: "Cell Phone",
              },
              {
                property_id: 1,
                value: "black",
              },
              {
                property_id: 2,
                value: 3,
              },
              {
                property_id: 3,
                value: "electronics",
              },
              {
                property_id: 4,
                value: "true",
              },
            ],
          },
          {
            id: 2,
            property_values: [
              {
                property_id: 0,
                value: "Keyboard",
              },
              {
                property_id: 1,
                value: "grey",
              },
              {
                property_id: 2,
                value: 5,
              },
              {
                property_id: 3,
                value: "electronics",
              },
              {
                property_id: 4,
                value: "false",
              },
            ],
          },
        ]);
      });
    });

    describe("with none filter", () => {
      it("should return the products where the given property is not defined", () => {
        const result = filterProducts(products, {
          property: {
            id: 4,
            name: "wireless",
            type: "enumerated",
            values: ["true", "false"],
          },
          operator: {
            text: "Has no value",
            id: "none",
          },
        });

        expect(result).toEqual([
          {
            id: 3,
            property_values: [
              {
                property_id: 0,
                value: "Cup",
              },
              {
                property_id: 1,
                value: "white",
              },
              {
                property_id: 2,
                value: 3,
              },
              {
                property_id: 3,
                value: "kitchenware",
              },
            ],
          },
          {
            id: 4,
            property_values: [
              {
                property_id: 0,
                value: "Key",
              },
              {
                property_id: 1,
                value: "silver",
              },
              {
                property_id: 2,
                value: 1,
              },
              {
                property_id: 3,
                value: "tools",
              },
            ],
          },
          {
            id: 5,
            property_values: [
              {
                property_id: 0,
                value: "Hammer",
              },
              {
                property_id: 1,
                value: "brown",
              },
              {
                property_id: 2,
                value: 19,
              },
              {
                property_id: 3,
                value: "tools",
              },
            ],
          },
        ]);
      });
    });

    describe("with in filter", () => {
      it("should return the products with an exact match of each of the values", () => {
        const result = filterProducts(products, {
          property: {
            id: 0,
            name: "Product Name",
            type: "string",
          },
          operator: {
            text: "Is any of",
            id: "in",
          },
          value: "headphones, cup",
        });

        expect(result).toEqual([
          {
            id: 0,
            property_values: [
              {
                property_id: 0,
                value: "Headphones",
              },
              {
                property_id: 1,
                value: "black",
              },
              {
                property_id: 2,
                value: 5,
              },
              {
                property_id: 3,
                value: "electronics",
              },
              {
                property_id: 4,
                value: "false",
              },
            ],
          },
          {
            id: 3,
            property_values: [
              {
                property_id: 0,
                value: "Cup",
              },
              {
                property_id: 1,
                value: "white",
              },
              {
                property_id: 2,
                value: 3,
              },
              {
                property_id: 3,
                value: "kitchenware",
              },
            ],
          },
        ]);
      });
    });

    describe("with contains filter", () => {
      it("should return the products where the property contains the value provided", () => {
        const result = filterProducts(products, {
          property: {
            id: 0,
            name: "Product Name",
            type: "string",
          },
          operator: {
            text: "Contains",
            id: "contains",
          },
          value: "phone",
        });

        expect(result).toEqual([
          {
            id: 0,
            property_values: [
              {
                property_id: 0,
                value: "Headphones",
              },
              {
                property_id: 1,
                value: "black",
              },
              {
                property_id: 2,
                value: 5,
              },
              {
                property_id: 3,
                value: "electronics",
              },
              {
                property_id: 4,
                value: "false",
              },
            ],
          },
          {
            id: 1,
            property_values: [
              {
                property_id: 0,
                value: "Cell Phone",
              },
              {
                property_id: 1,
                value: "black",
              },
              {
                property_id: 2,
                value: 3,
              },
              {
                property_id: 3,
                value: "electronics",
              },
              {
                property_id: 4,
                value: "true",
              },
            ],
          },
        ]);
      });
    });

    describe("when no operator is provided", () => {
      it("returns the products", () => {
        const result = filterProducts(products, {
          property: properties[0] as Property,
          value: "",
        });

        expect(result).toEqual(products);
      });
    });
  });

  describe(equalFilter.name, () => {
    it("returns the provided products when no value is provided", () => {
      const result = equalFilter(products, {
        property: properties[0] as Property,
        operator: operators[0],
      });

      expect(result).toEqual(products);
    });

    it("returns the product property value that equals the provided value", () => {
      const result = equalFilter(products, {
        property: properties[0] as Property,
        operator: operators[0],
        value: "Headphones",
      });

      expect(result).toEqual([
        {
          id: 0,
          property_values: [
            {
              property_id: 0,
              value: "Headphones",
            },
            {
              property_id: 1,
              value: "black",
            },
            {
              property_id: 2,
              value: 5,
            },
            {
              property_id: 3,
              value: "electronics",
            },
            {
              property_id: 4,
              value: "false",
            },
          ],
        },
      ]);
    });

    it("returns the exact match when value is a number", () => {
      const result = equalFilter(products, {
        property: properties[2] as Property,
        operator: operators[0],
        value: "19",
      });

      expect(result).toEqual([
        {
          id: 5,
          property_values: [
            {
              property_id: 0,
              value: "Hammer",
            },
            {
              property_id: 1,
              value: "brown",
            },
            {
              property_id: 2,
              value: 19,
            },
            {
              property_id: 3,
              value: "tools",
            },
          ],
        },
      ]);
    });
  });

  describe(greaterThanFilter.name, () => {
    it("returns the provided products when no value is provided", () => {
      const result = greaterThanFilter(products, {
        property: properties[2] as Property,
        operator: operators[1],
      });

      expect(result).toEqual(products);
    });

    it("returns the products where the property value is bigger than the provided value", () => {
      const result = greaterThanFilter(products, {
        property: properties[2] as Property,
        operator: operators[1],
        value: "10",
      });

      expect(result).toEqual([
        {
          id: 5,
          property_values: [
            {
              property_id: 0,
              value: "Hammer",
            },
            {
              property_id: 1,
              value: "brown",
            },
            {
              property_id: 2,
              value: 19,
            },
            {
              property_id: 3,
              value: "tools",
            },
          ],
        },
      ]);
    });
  });

  describe(lessThanFilter.name, () => {
    it("returns the provided products when no value is provided", () => {
      const result = lessThanFilter(products, {
        property: properties[3] as Property,
        operator: operators[3],
      });

      expect(result).toEqual(products);
    });

    it("returns the products where the property value is less than the provided value", () => {
      const result = lessThanFilter(products, {
        property: properties[2] as Property,
        operator: operators[2],
        value: "3",
      });

      expect(result).toEqual([
        {
          id: 4,
          property_values: [
            {
              property_id: 0,
              value: "Key",
            },
            {
              property_id: 1,
              value: "silver",
            },
            {
              property_id: 2,
              value: 1,
            },
            {
              property_id: 3,
              value: "tools",
            },
          ],
        },
      ]);
    });
  });

  describe(anyFilter.name, () => {
    it("should return products where the property is defined", () => {
      const result = anyFilter(products, {
        property: {
          id: 4,
          name: "wireless",
          type: "enumerated",
          values: ["true", "false"],
        },
        operator: {
          text: "Has any value",
          id: "any",
        },
      });

      expect(result).toEqual([
        {
          id: 0,
          property_values: [
            {
              property_id: 0,
              value: "Headphones",
            },
            {
              property_id: 1,
              value: "black",
            },
            {
              property_id: 2,
              value: 5,
            },
            {
              property_id: 3,
              value: "electronics",
            },
            {
              property_id: 4,
              value: "false",
            },
          ],
        },
        {
          id: 1,
          property_values: [
            {
              property_id: 0,
              value: "Cell Phone",
            },
            {
              property_id: 1,
              value: "black",
            },
            {
              property_id: 2,
              value: 3,
            },
            {
              property_id: 3,
              value: "electronics",
            },
            {
              property_id: 4,
              value: "true",
            },
          ],
        },
        {
          id: 2,
          property_values: [
            {
              property_id: 0,
              value: "Keyboard",
            },
            {
              property_id: 1,
              value: "grey",
            },
            {
              property_id: 2,
              value: 5,
            },
            {
              property_id: 3,
              value: "electronics",
            },
            {
              property_id: 4,
              value: "false",
            },
          ],
        },
      ]);
    });
  });

  describe(noneFilter.name, () => {
    it("should return the products where the given property is not defined", () => {
      const result = noneFilter(products, {
        property: {
          id: 4,
          name: "wireless",
          type: "enumerated",
          values: ["true", "false"],
        },
        operator: {
          text: "Has no value",
          id: "none",
        },
      });

      expect(result).toEqual([
        {
          id: 3,
          property_values: [
            {
              property_id: 0,
              value: "Cup",
            },
            {
              property_id: 1,
              value: "white",
            },
            {
              property_id: 2,
              value: 3,
            },
            {
              property_id: 3,
              value: "kitchenware",
            },
          ],
        },
        {
          id: 4,
          property_values: [
            {
              property_id: 0,
              value: "Key",
            },
            {
              property_id: 1,
              value: "silver",
            },
            {
              property_id: 2,
              value: 1,
            },
            {
              property_id: 3,
              value: "tools",
            },
          ],
        },
        {
          id: 5,
          property_values: [
            {
              property_id: 0,
              value: "Hammer",
            },
            {
              property_id: 1,
              value: "brown",
            },
            {
              property_id: 2,
              value: 19,
            },
            {
              property_id: 3,
              value: "tools",
            },
          ],
        },
      ]);
    });
  });

  describe(inFilter.name, () => {
    it("should return all the products when no value is provided", () => {
      const result = inFilter(products, {
        property: {
          id: 0,
          name: "Product Name",
          type: "string",
        },
        operator: {
          text: "Is any of",
          id: "in",
        },
      });

      expect(result).toEqual(products);
    });

    it("should return the products with an exact match of each of the values when values are string", () => {
      const result = inFilter(products, {
        property: {
          id: 0,
          name: "Product Name",
          type: "string",
        },
        operator: {
          text: "Is any of",
          id: "in",
        },
        value: "headphones, cup",
      });

      expect(result).toEqual([
        {
          id: 0,
          property_values: [
            {
              property_id: 0,
              value: "Headphones",
            },
            {
              property_id: 1,
              value: "black",
            },
            {
              property_id: 2,
              value: 5,
            },
            {
              property_id: 3,
              value: "electronics",
            },
            {
              property_id: 4,
              value: "false",
            },
          ],
        },
        {
          id: 3,
          property_values: [
            {
              property_id: 0,
              value: "Cup",
            },
            {
              property_id: 1,
              value: "white",
            },
            {
              property_id: 2,
              value: 3,
            },
            {
              property_id: 3,
              value: "kitchenware",
            },
          ],
        },
      ]);
    });

    it("should return the products with an exact match of each of the values when values are numbers", () => {
      const result = inFilter(products, {
        property: {
          id: 2,
          name: "weight (oz)",
          type: "number",
        },
        operator: {
          text: "Is any of",
          id: "in",
        },
        value: "5,3",
      });

      expect(result).toEqual([
        {
          id: 0,
          property_values: [
            {
              property_id: 0,
              value: "Headphones",
            },
            {
              property_id: 1,
              value: "black",
            },
            {
              property_id: 2,
              value: 5,
            },
            {
              property_id: 3,
              value: "electronics",
            },
            {
              property_id: 4,
              value: "false",
            },
          ],
        },
        {
          id: 2,
          property_values: [
            {
              property_id: 0,
              value: "Keyboard",
            },
            {
              property_id: 1,
              value: "grey",
            },
            {
              property_id: 2,
              value: 5,
            },
            {
              property_id: 3,
              value: "electronics",
            },
            {
              property_id: 4,
              value: "false",
            },
          ],
        },
        {
          id: 1,
          property_values: [
            {
              property_id: 0,
              value: "Cell Phone",
            },
            {
              property_id: 1,
              value: "black",
            },
            {
              property_id: 2,
              value: 3,
            },
            {
              property_id: 3,
              value: "electronics",
            },
            {
              property_id: 4,
              value: "true",
            },
          ],
        },

        {
          id: 3,
          property_values: [
            {
              property_id: 0,
              value: "Cup",
            },
            {
              property_id: 1,
              value: "white",
            },
            {
              property_id: 2,
              value: 3,
            },
            {
              property_id: 3,
              value: "kitchenware",
            },
          ],
        },
      ]);
    });
  });

  describe(containsFilter.name, () => {
    it("should return the products when no value is provided", () => {
      const result = containsFilter(products, {
        property: {
          id: 0,
          name: "Product Name",
          type: "string",
        },
        operator: {
          text: "Contains",
          id: "contains",
        },
      });

      expect(result).toEqual(products);
    });
    it("should return the products where the property contains the value provided", () => {
      const result = containsFilter(products, {
        property: {
          id: 0,
          name: "Product Name",
          type: "string",
        },
        operator: {
          text: "Contains",
          id: "contains",
        },
        value: "phone",
      });

      expect(result).toEqual([
        {
          id: 0,
          property_values: [
            {
              property_id: 0,
              value: "Headphones",
            },
            {
              property_id: 1,
              value: "black",
            },
            {
              property_id: 2,
              value: 5,
            },
            {
              property_id: 3,
              value: "electronics",
            },
            {
              property_id: 4,
              value: "false",
            },
          ],
        },
        {
          id: 1,
          property_values: [
            {
              property_id: 0,
              value: "Cell Phone",
            },
            {
              property_id: 1,
              value: "black",
            },
            {
              property_id: 2,
              value: 3,
            },
            {
              property_id: 3,
              value: "electronics",
            },
            {
              property_id: 4,
              value: "true",
            },
          ],
        },
      ]);
    });
  });
});

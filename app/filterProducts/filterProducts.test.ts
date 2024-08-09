import {
  filterProducts,
  normalizeValueToNumber,
  normalizeValueToString,
  equalFilter,
  greaterThanFilter,
} from "./filterProducts";

import datastore from "../data/data";
import { Property } from "../types/types";

describe("FilterProducts", () => {
  const products = datastore.getProducts();
  const properties = datastore.getProperties();
  const operators = datastore.getOperators();

  describe(filterProducts.name, () => {
    describe("when operator is equals", () => {
      // Property Product Name | Value Headphones
      it("should return the exact match of the provided property_id", () => {});

      it("should not return any other value besides the exact match of the provided property_id", () => {});
    });

    describe("when the operator is greater_than", () => {
      // Propery weight || Value 4
      it("should return the prodcuts where the property_id is bigger than the provided value", () => {});

      it("should not return products where the property_id is less than the provided value", () => {});
    });

    describe("when the operator is less_than", () => {
      // Property weight | Value 4
      it("should return the prodcuts where the property_id is smaller than the provided value", () => {});

      it("should not return products where the property_id is bigger than the provided value", () => {});
    });

    describe("when the operator is any", () => {
      // property wireless
      it("should return products where the property_id is defined or is not null", () => {});

      it("should not return products where the property_id is not defined or is not null", () => {});
    });

    describe("when the operator is none", () => {
      // property wirelesse
      it("should return prodcuts where the property_id is not defined or is null", () => {});

      it("should not return products where the property_id is defined or is not null", () => {});
    });

    describe("when the operator is in", () => {
      // TODO IN THE CODE: WE NEED TO CHECK IF MORE THAN ONE VALUE IS SUBMITTED

      // property Product Name | Value Headphones and Cup
      it("should return products here the property_id is exactly one of the provided values", () => {});
    });

    describe("when the operator is contains", () => {
      // property Product Name | Value phone
      it("should return products where the property_id contains the submitted value", () => {});
      it("should not return products where the property_id does not contain the submitted value", () => {});
    });
  });

  describe(normalizeValueToNumber.name, () => {
    it("return a number when provided value is a string", () => {
      expect(normalizeValueToNumber("5")).toEqual(5);
    });
  });

  describe(normalizeValueToString.name, () => {
    it("returns a lower case string", () => {
      expect(normalizeValueToString("Headphones")).toEqual("headphones");
      expect(normalizeValueToString(5)).toEqual("5");
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
  });

  describe(greaterThanFilter.name, () => {
    it("returns the provided products when no value is provided", () => {
      const result = greaterThanFilter(products, {
        property: properties[2] as Property,
        operator: operators[0],
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
});

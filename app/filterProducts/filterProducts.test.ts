import { filterProducts } from "./filterProducts";
describe("FilterProducts", () => {
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
});

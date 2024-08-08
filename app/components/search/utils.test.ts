import { filterOperators } from "./utils";

describe("Search utils", () => {
  describe("filterOperators", () => {
    describe("when property is string", () => {
      it("should return [equals, has any value, has no valye, is any of, contains]", () => {});

      it("should not contain [Is greater than, is less than]", () => {});
    });

    describe("when property is number", () => {
      it("should return [equals, is greater than, is less than, has any value, has no value, is any of]", () => {});
      it("should not contain [Contains]", () => {});
    });

    describe("when property is enumerated", () => {
      it("should return [equals, has any value, has no value, is any of]", () => {});

      it("should not contain [contains, is less than, is greater than]", () => {});
    });
  });
});

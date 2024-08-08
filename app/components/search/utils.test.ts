import { Operator } from "@/app/types/types";
import { filterOperators } from "./utils";
import datastore from "@/app/data/data";

describe("Search utils", () => {
  const operators = datastore.getOperators();
  describe(filterOperators.name, () => {
    describe("when no property is provided", () => {
      it("should return an empty array", () => {
        const result = filterOperators(operators);
        expect(result).toEqual([]);
      });
    });

    describe("when property is string", () => {
      let result: Operator[];

      beforeEach(() => {
        result = filterOperators(operators, "string");
      });

      it("should return [equals, has any value, has no valye, is any of, contains]", () => {
        expect(result).toEqual([
          {
            text: "Equals",
            id: "equals",
          },
          {
            text: "Has any value",
            id: "any",
          },
          {
            text: "Has no value",
            id: "none",
          },
          {
            text: "Is any of",
            id: "in",
          },
          {
            text: "Contains",
            id: "contains",
          },
        ]);
      });

      it("should not contain [Is greater than, is less than]", () => {
        expect(result).toEqual(
          expect.not.arrayContaining([
            {
              text: "Is greater than",
              id: "greater_than",
            },
            {
              text: "Is less than",
              id: "less_than",
            },
          ])
        );
      });
    });

    describe("when property is number", () => {
      let result: Operator[];

      beforeEach(() => {
        result = filterOperators(operators, "number");
      });

      it("should return [equals, is greater than, is less than, has any value, has no value, is any of]", () => {
        expect(result).toEqual([
          {
            text: "Equals",
            id: "equals",
          },
          {
            text: "Is greater than",
            id: "greater_than",
          },
          {
            text: "Is less than",
            id: "less_than",
          },
          {
            text: "Has any value",
            id: "any",
          },
          {
            text: "Has no value",
            id: "none",
          },
          {
            text: "Is any of",
            id: "in",
          },
        ]);
      });

      it("should not contain [Contains]", () => {
        expect(result).toEqual(
          expect.not.arrayContaining([
            {
              text: "Contains",
              id: "contains",
            },
          ])
        );
      });
    });

    describe("when property is enumerated", () => {
      let result: Operator[];

      beforeEach(() => {
        result = filterOperators(operators, "enumerated");
      });

      it("should return [equals, has any value, has no value, is any of]", () => {
        expect(result).toEqual([
          {
            text: "Equals",
            id: "equals",
          },
          {
            text: "Has any value",
            id: "any",
          },
          {
            text: "Has no value",
            id: "none",
          },
          {
            text: "Is any of",
            id: "in",
          },
        ]);
      });

      it("should not contain [contains, is less than, is greater than]", () => {
        expect(result).toEqual(
          expect.not.arrayContaining([
            {
              text: "Contains",
              id: "contains",
            },
            {
              text: "Is greater than",
              id: "greater_than",
            },
            {
              text: "Is less than",
              id: "less_than",
            },
          ])
        );
      });
    });
  });
});

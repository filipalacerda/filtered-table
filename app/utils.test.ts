import { capitalizeName } from "./utils";

describe("General utils", () => {
  describe(capitalizeName.name, () => {
    it("should capitalize the first letter of the provided string", () => {
      expect(capitalizeName("hello world")).toEqual("Hello world");
    });
  });
});

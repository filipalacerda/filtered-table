import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

import DynamicInput from "./dynamicInput";

describe(DynamicInput.name, () => {
  const onChange = jest.fn();
  let container: HTMLElement;

  describe("when component renders", () => {
    beforeEach(() => {
      container = render(
        <DynamicInput type="string" handleChange={onChange} />
      ).container;
    });

    it("should match snapshot", () => {
      expect(container).toMatchSnapshot();
    });
  });

  describe("when type is string", () => {
    beforeEach(() => {
      render(<DynamicInput type="string" handleChange={onChange} />);
    });

    it("should render a input with type text", () => {
      expect(screen.getByTestId("text-field").getAttribute("type")).toEqual(
        "text"
      );
    });

    it("should call handleChange when the user types a value", async () => {
      const input = screen.getByTestId("text-field");
      await userEvent.type(input, "A");

      expect(onChange).toHaveBeenCalledWith("A");
    });
  });

  describe("when type is number", () => {
    beforeEach(() => {
      render(<DynamicInput type="number" handleChange={onChange} />);
    });

    it("should render a input with type text", () => {
      expect(screen.getByTestId("text-field").getAttribute("type")).toEqual(
        "text"
      );
    });

    it("should call handleChange when the user types a value", async () => {
      const input = screen.getByTestId("text-field");
      await userEvent.type(input, "50");

      expect(onChange).toHaveBeenCalledWith("50");
    });
  });

  describe("when type is enumerated", () => {
    beforeEach(() => {
      render(
        <DynamicInput
          type="enumerated"
          handleChange={onChange}
          values={["tools", "electronics", "kitchenware"]}
        />
      );
    });

    it("should render a select input", () => {
      expect(screen.getByTestId("select-field")).toBeInTheDocument();
    });

    it("should call handleChange when the user selects a value", async () => {
      const input = screen.getByTestId("select-field");

      await userEvent.click(input);

      await userEvent.selectOptions(input, "electronics");

      expect(onChange).toHaveBeenCalledWith("electronics");
    });
  });

  describe('when type is enumerated and operator is "in"', () => {
    beforeEach(() => {
      render(
        <DynamicInput
          type="enumerated"
          operator="in"
          handleChange={onChange}
          values={["tools", "electronics", "kitchenware"]}
        />
      );
    });

    it("should render a checkbox input", () => {
      expect(screen.getByTestId("checkbox-field")).toBeInTheDocument();
    });

    it("should call on change when the user selects a checkbox", async () => {
      const input1 = screen.getByTestId("tools-checkbox");
      const input2 = screen.getByTestId("electronics-checkbox");

      await userEvent.click(input1);

      expect(onChange).toHaveBeenCalledWith("tools");

      await userEvent.click(input2);

      expect(onChange).toHaveBeenCalledWith("tools,electronics");
    });
  });
});

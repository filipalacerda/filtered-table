import { getByTestId, getByText, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

import datastore from "@/app/data/data";
import type { Property } from "@/app/types/types";

import Search from "./index";

describe(Search.name, () => {
  const onChange = jest.fn();
  const onClear = jest.fn();
  const operators = datastore.getOperators();
  const properties = datastore.getProperties();

  let container: HTMLElement;

  beforeEach(() => {
    container = render(
      <Search
        onChange={onChange}
        onClear={onClear}
        categories={properties as Property[]}
        operators={operators}
      />
    ).container;
  });

  describe("when component renders", () => {
    it("should match snapshot", () => {
      expect(container).toMatchSnapshot();
    });

    it("should render the category select with the first option", () => {
      expect(screen.getByTestId("category-select")).toBeInTheDocument();
      expect(screen.getByText("Choose Category")).toBeInTheDocument();
    });

    it("should not render operators select by default", () => {
      expect(screen.queryByTestId("operator-select")).not.toBeInTheDocument();
    });

    it("should not render the value input by default", () => {
      expect(screen.queryByTestId("value-input")).not.toBeInTheDocument();
    });

    it("should render the Clear button", () => {
      expect(screen.getByRole("button", { name: "Clear" })).toBeInTheDocument();
    });
  });

  describe("when the user select a category for the first time", () => {
    beforeEach(async () => {
      const input = screen.getByTestId("category-select");

      await userEvent.click(input);

      await userEvent.selectOptions(input, "Product Name");
    });

    it("should render the operators select", () => {
      expect(screen.getByTestId("operator-select")).toBeInTheDocument();
    });

    it("should render the value input", () => {
      expect(screen.getByTestId("text-field")).toBeInTheDocument();
    });

    it("should call onChange callback with the selected value", () => {
      expect(onChange).toHaveBeenCalledWith({
        property: {
          id: 0,
          name: "Product Name",
          type: "string",
        },
        operator: undefined,
        value: undefined,
      });
    });
  });

  describe("when the user selects an operator", () => {
    it("should call onChange callback", async () => {
      const input = screen.getByTestId("category-select");

      await userEvent.click(input);

      await userEvent.selectOptions(input, "Product Name");

      const operatorsField = screen.getByTestId("operator-select");
      await userEvent.click(operatorsField);

      await userEvent.selectOptions(operatorsField, "equals");

      expect(onChange).toHaveBeenCalledWith({
        property: {
          id: 0,
          name: "Product Name",
          type: "string",
        },
        operator: {
          text: "Equals",
          id: "equals",
        },
        value: undefined,
      });
    });
  });

  describe("when the user types a value", () => {
    it("should call onChange callback", async () => {
      const input = screen.getByTestId("category-select");

      await userEvent.click(input);

      await userEvent.selectOptions(input, "Product Name");

      const operatorsField = screen.getByTestId("operator-select");
      await userEvent.click(operatorsField);

      await userEvent.selectOptions(operatorsField, "equals");

      const inputField = screen.getByTestId("text-field");

      await userEvent.type(inputField, "value");

      expect(onChange).toHaveBeenCalledWith({
        property: {
          id: 0,
          name: "Product Name",
          type: "string",
        },
        operator: {
          text: "Equals",
          id: "equals",
        },
        value: "value",
      });
    });
  });

  describe("when the user resets the form", () => {
    let operatorsField: HTMLElement | null;
    let categoriesField: HTMLElement;
    let valueField: HTMLElement | null;

    let clearButton: HTMLElement;

    beforeEach(async () => {
      categoriesField = screen.getByTestId("category-select");

      clearButton = screen.getByRole("button", { name: "Clear" });
      // Change category
      await userEvent.click(categoriesField);
      await userEvent.selectOptions(categoriesField, "Product Name");

      // These fields are only visble after the categories value is changed
      operatorsField = screen.queryByTestId("operator-select");
      valueField = screen.queryByTestId("text-field");
      // Change operator
      await userEvent.click(operatorsField as HTMLElement);
      await userEvent.selectOptions(operatorsField as HTMLElement, "equals");
      // Change input value
      await userEvent.type(valueField as HTMLElement, "value");
    });

    it("should clear the fields", async () => {
      await userEvent.click(clearButton);

      expect((categoriesField as HTMLOptionElement).value).toEqual("-1");

      expect(operatorsField).not.toBeInTheDocument();

      expect(valueField).not.toBeInTheDocument();
    });

    it("should call onClear callback", async () => {
      await userEvent.click(clearButton);
      expect(onClear).toHaveBeenCalled();
    });
  });
});

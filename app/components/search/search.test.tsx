import { getByTestId, getByText, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

import datastore from "@/app/data/data";
import type { Property } from "@/app/types/types";

import Search from "./index";

describe(Search.name, () => {
  const onSubmit = jest.fn();
  const onClear = jest.fn();
  const operators = datastore.getOperators();
  const properties = datastore.getProperties();

  let container: HTMLElement;

  beforeEach(() => {
    container = render(
      <Search
        onSubmit={onSubmit}
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

    it("should render the submit button", () => {
      expect(
        screen.getByRole("button", { name: "Search" })
      ).toBeInTheDocument();
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
      expect(screen.getByTestId("string-field")).toBeInTheDocument();
    });
  });

  describe("When the user re-selects a category", () => {
    let input: HTMLElement;

    beforeEach(async () => {
      input = screen.getByTestId("category-select");

      await userEvent.click(input);

      await userEvent.selectOptions(input, "Product Name");
    });

    it("should reset the operators field", async () => {
      const operatorsField = screen.getByTestId("operator-select");
      await userEvent.click(operatorsField);

      await userEvent.selectOptions(operatorsField, "equals");
      // Test that the value changed
      expect(
        (
          screen.getByRole("option", {
            name: "Choose Operator",
          }) as HTMLOptionElement
        ).selected
      ).toBe(false);

      await userEvent.click(input);

      await userEvent.selectOptions(input, "color");

      expect(
        (
          screen.getByRole("option", {
            name: "Choose Operator",
          }) as HTMLOptionElement
        ).selected
      ).toBe(true);
    });

    it("should reset the value field", async () => {
      const inputField = screen.getByTestId("string-field");

      await userEvent.type(inputField, "value");

      await expect(inputField.getAttribute("value")).toEqual("value");

      await userEvent.click(input);

      await userEvent.selectOptions(input, "color");

      expect(inputField.getAttribute("value")).toEqual("");
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
      valueField = screen.queryByTestId("string-field");
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

  describe("when the user submits the form", () => {
    describe("with values", () => {
      it("should call the onSubmit callback with the selected options", async () => {
        const categoriesField = screen.getByTestId("category-select");

        const submitButton = screen.getByRole("button", { name: "Search" });
        // Change category
        await userEvent.click(categoriesField);
        await userEvent.selectOptions(categoriesField, "Product Name");

        // These fields are only visble after the categories value is changed
        const operatorsField = screen.queryByTestId("operator-select");
        const valueField = screen.queryByTestId("string-field");
        // Change operator
        await userEvent.click(operatorsField as HTMLElement);
        await userEvent.selectOptions(operatorsField as HTMLElement, "equals");
        // Change input value
        await userEvent.type(valueField as HTMLElement, "value");

        await userEvent.click(submitButton);

        expect(onSubmit).toHaveBeenCalledWith({
          property: {
            id: 0,
            name: "Product Name",
            type: "string",
          },
          operator: { text: "Equals", id: "equals" },
          value: "value",
        });
      });
    });

    describe("without values", () => {
      let submitButton: HTMLElement;

      beforeEach(async () => {
        submitButton = screen.getByRole("button", { name: "Search" });
        await userEvent.click(submitButton);
      });

      it("should not call onSubmit callback", () => {
        expect(onSubmit).not.toHaveBeenCalled();
      });

      it("should show error message", () => {
        expect(screen.getByTestId("error-message")).toBeInTheDocument();
      });

      describe("when the user types the values", () => {
        it("should clear error state", async () => {
          const categoriesField = screen.getByTestId("category-select");

          // Change category
          await userEvent.click(categoriesField);
          await userEvent.selectOptions(categoriesField, "Product Name");

          // These fields are only visble after the categories value is changed
          const operatorsField = screen.queryByTestId("operator-select");
          const valueField = screen.queryByTestId("string-field");
          // Change operator
          await userEvent.click(operatorsField as HTMLElement);
          await userEvent.selectOptions(
            operatorsField as HTMLElement,
            "equals"
          );
          // Change input value
          await userEvent.type(valueField as HTMLElement, "value");

          // submit the form again
          await userEvent.click(submitButton);

          expect(screen.queryByTestId("error-message")).not.toBeInTheDocument();
        });
      });
    });
  });
});

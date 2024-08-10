import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import datastore from "./data/data";

import Home from "./page";
import userEvent from "@testing-library/user-event";

describe(Home.name, () => {
  let container: HTMLElement;
  const products = datastore.getProducts();

  beforeEach(() => {
    container = render(<Home />).container;
  });

  describe("when component renders", () => {
    it("should match snapshot", () => {
      expect(container).toMatchSnapshot();
    });

    it("should render the category select", () => {
      expect(screen.getByTestId("category-select")).toBeInTheDocument();
    });

    it("should not render the operator selector", () => {
      expect(screen.queryByTestId("operator-selector")).not.toBeInTheDocument();
    });

    it("should not render the value field", () => {
      expect(screen.queryByTestId("text-field")).not.toBeInTheDocument();
      expect(screen.queryByTestId("select-field")).not.toBeInTheDocument();
    });

    it("should render the clear button", () => {
      expect(screen.getByRole("button", { name: "Clear" })).toBeInTheDocument();
    });

    it("should render a table with all the products", () => {
      expect(container.querySelectorAll("tbody tr").length).toEqual(
        products.length
      );
    });
  });

  describe("when the user performs a search action", () => {
    let inputField: HTMLElement;

    beforeEach(async () => {
      const categoryInput = screen.getByTestId("category-select");

      await userEvent.click(categoryInput);

      await userEvent.selectOptions(categoryInput, "Product Name");

      const operatorsField = screen.getByTestId("operator-select");
      await userEvent.click(operatorsField);

      await userEvent.selectOptions(operatorsField, "equals");

      inputField = screen.getByTestId("text-field");
    });

    it("should render only the correct results on the table", async () => {
      await userEvent.type(inputField, "headphones");

      expect(
        screen.getByText(products[0].property_values[0].value)
      ).toBeInTheDocument();

      expect(
        screen.queryByText(products[1].property_values[0].value)
      ).not.toBeInTheDocument();
    });

    it("should render the no results message when no results are found", async () => {
      await userEvent.type(inputField, "no matches");

      expect(
        screen.getByText(
          "No results found! Please try another search combination."
        )
      ).toBeInTheDocument();
    });

    it("should clear the filters when the user clicks on the clear button", async () => {
      await userEvent.type(inputField, "no matches");

      await userEvent.click(screen.getByRole("button", { name: "Clear" }));

      expect(
        screen.getByText(products[0].property_values[0].value)
      ).toBeInTheDocument();
    });
  });
});

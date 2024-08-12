import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Table from "./index";

import datastore from "../../data/data";
import { Property } from "@/app/types/types";
import { capitalizeName } from "@/app/utils";

describe(Table.name, () => {
  const headers = datastore.getProperties();
  const rows = datastore.getProducts();

  let container: HTMLElement;

  describe("when component renders", () => {
    it("should match snapshot", () => {
      container = render(
        <Table headers={headers as Property[]} rows={rows} />
      ).container;
      expect(container).toMatchSnapshot();
    });
  });

  describe("headers", () => {
    it("should render all the provided headers", () => {
      render(<Table headers={headers as Property[]} rows={rows} />);

      expect(
        screen.getByText(capitalizeName(headers[0].name))
      ).toBeInTheDocument();
      expect(
        screen.getByText(capitalizeName(headers[1].name))
      ).toBeInTheDocument();
      expect(
        screen.getByText(capitalizeName(headers[2].name))
      ).toBeInTheDocument();
      expect(
        screen.getByText(capitalizeName(headers[3].name))
      ).toBeInTheDocument();
      expect(
        screen.getByText(capitalizeName(headers[4].name))
      ).toBeInTheDocument();
    });
  });

  describe("rows", () => {
    describe("with data", () => {
      beforeEach(() => {
        container = render(
          <Table headers={headers as Property[]} rows={rows} />
        ).container;
      });

      it("should render the correct number of rows", () => {
        expect(container.querySelectorAll("tbody tr").length).toEqual(
          rows.length
        );
      });

      it("should render provided data to a row", () => {
        const firstRow = rows[0].property_values;
        expect(screen.getByText(firstRow[0].value)).toBeInTheDocument();
        // There's two `black` text being rendered in the table
        expect(screen.getAllByText(firstRow[1].value).length).toEqual(2);
        // There's two `5` text being rendered in the table
        expect(screen.getAllByText(firstRow[2].value).length).toEqual(2);
        // There's three `electronics` text being rendered in the table
        expect(screen.getAllByText(firstRow[3].value).length).toEqual(3);
        // There's two `false` text being rendered in the table
        expect(screen.getAllByText(firstRow[4].value).length).toEqual(2);
      });
    });

    describe("without data", () => {
      beforeEach(() => {
        container = render(
          <Table headers={headers as Property[]} rows={[]} />
        ).container;
      });

      it("should render only one row", () => {
        expect(container.querySelectorAll("tbody tr").length).toEqual(1);
      });

      it("should render no results message", () => {
        expect(
          screen.getByText(
            "No results found! Please try another search combination."
          )
        ).toBeInTheDocument();
      });
    });
  });
});

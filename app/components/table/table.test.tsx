import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Table from "./index";

import datastore from "../../data/data";
import { Property } from "@/app/types/types";

describe(Table.name, () => {
  const headers = datastore.getProperties();
  const rows = datastore.getProducts();

  let container: HTMLElement;

  beforeEach(() => {
    container = render(
      <Table headers={headers as Property[]} rows={rows} />
    ).container;
  });

  describe("when component renders", () => {
    it("should match snapshot", () => {
      expect(container).toMatchSnapshot();
    });
  });

  describe("headers", () => {
    it("should render all the provided headers", () => {
      expect(screen.getByText(headers[0].name)).toBeInTheDocument();
      expect(screen.getByText(headers[1].name)).toBeInTheDocument();
      expect(screen.getByText(headers[2].name)).toBeInTheDocument();
      expect(screen.getByText(headers[3].name)).toBeInTheDocument();
      expect(screen.getByText(headers[4].name)).toBeInTheDocument();
    });
  });

  describe("rows", () => {
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
});

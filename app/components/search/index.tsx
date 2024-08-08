"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import type { Operator, Property, Filters } from "../../types/types";

type SearchProps = {
  categories: Property[];
  operators: Operator[];
  onSubmit: ({ property, operator, value }: Filters) => void;
  onClear: () => void;
};

/**
 * Renders a form with 5 items:
 * - a select field for the categories
 * - a select field for the operators - TODO: Filters depend on the property type
 * - a dynamic field that depends on the categories for the search value
 * - a search button that allows the user to perform the filter
 * - a clear button that resets the state of the form
 */
const Search = ({ categories, operators, onClear, onSubmit }: SearchProps) => {
  // We need to save the selected values
  const [currentOperator, setCurrentOperator] = useState<Operator>();
  const [currentCategoryProperty, setCurrentCategoryProperty] =
    useState<Property>();
  const [value, setValue] = useState<string>("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {};

  const handleOperatorChange = (e: ChangeEvent<HTMLSelectElement>) => {};

  const handleValueChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {};

  /**
   * The value option depends on the category selected
   * It could be a string, a number or enumerated list.
   * Depending on the type, we render a different type of input
   * @returns React.Element
   */
  const getValueOption = () => {
    const type = currentCategoryProperty?.type;

    if (type === "enumerated") {
      return (
        <select
          onChange={handleValueChange}
          className="border p-2 border-gray-400 rounded-sm text-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option>Choose Value</option>
          {currentCategoryProperty?.values &&
            currentCategoryProperty?.values.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
        </select>
      );
    } else if (type === "string") {
      return (
        <input
          type="text"
          onChange={handleValueChange}
          className="border border-gray-400 rounded-sm font-light text-sm p-2"
        />
      );
    } else if (type === "number") {
      return (
        <input
          type="number"
          onChange={handleValueChange}
          className="border border-gray-400 rounded-sm font-light text-sm p-2"
        />
      );
    }
  };

  const handleOnClear = () => {};

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full justify-between border border-sky-900 py-10 px-4 rounded-sm"
    >
      <div className="flex gap-10">
        <fieldset className="flex gap-2 items-center">
          <label htmlFor="category" className="font-light">
            Category:
          </label>
          <select
            name="category"
            id="category"
            onChange={handleCategoryChange}
            className="border p-2 border-gray-400 rounded-sm text-sm focus:border-blue-500 focus:ring-blue-500"
            value={currentCategoryProperty?.id}
          >
            <option value="-1">Choose Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </fieldset>
        <fieldset className="flex gap-2 items-center">
          <label htmlFor="operator">Operator:</label>
          <select
            name="operator"
            id="operator"
            onChange={handleOperatorChange}
            className="border p-2 border-gray-400 rounded-sm text-sm focus:border-blue-500 focus:ring-blue-500"
            value={currentOperator?.id}
          >
            <option value="empty">Choose Operator</option>
            {operators.map((operator) => (
              <option key={operator.id} value={operator.id}>
                {operator.text}
              </option>
            ))}
          </select>
        </fieldset>
        {currentCategoryProperty && currentCategoryProperty.id !== -1 && (
          <fieldset className="flex gap-2 items-center">
            <label htmlFor="value">Value:</label>
            {getValueOption()}
          </fieldset>
        )}
      </div>
      <div className="flex gap-10">
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-700 text-white  py-2 px-4 rounded"
        >
          Search
        </button>
        <button
          type="button"
          onClick={handleOnClear}
          className="bg-blue-500 hover:bg-blue-700 text-white  py-2 px-4 rounded"
        >
          Clear
        </button>
      </div>
    </form>
  );
};

export default Search;

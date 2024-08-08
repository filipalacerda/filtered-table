"use client";

import { ChangeEvent, FormEvent, useMemo, useState } from "react";
import type { Operator, Property, Filters } from "../../types/types";

import DynamicInput from "./dynamicInput";
import { filterOperators } from "./utils";

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

  /**
   * Not all operators are available for every type.
   * We need to filter the operators depending on the category type
   */
  const visibleOperators = useMemo(
    () => filterOperators(operators, currentCategoryProperty?.type),
    [operators, currentCategoryProperty]
  );

  /**
   * When the user selects a category, we need to update the state.
   * We search for the correspondent id, since we'll need the full object for the onSubmit callback
   *
   * We'll also need the category to show the possible operators
   *
   * We need to reset the operators and the value everytime the user changes the category,
   * because the values are different.
   *
   * @param e: ChangeEvent
   */
  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;

    const categorySelected = categories.filter((category) => {
      return category.id === parseInt(value);
    })[0];

    setCurrentCategoryProperty(categorySelected);
    setCurrentOperator({ id: "empty", text: "" });
    setValue("");
  };

  /**
   * When the user selects an operator, we need to store it
   * in order to be able to use it on the onSubmit callback
   * @param e: ChangeEvent
   */
  const handleOperatorChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;

    const operatorSelected = operators.filter((operator) => {
      return operator.id === value;
    })[0];

    setCurrentOperator(operatorSelected);
  };

  /**
   * When the user types a value or selects an option,
   * we need to store the value so we can use it on the onSubmit callback
   * @param e: ChangeEvent
   */
  const handleValueChange = (value: string) => {
    setValue(value);
  };

  /**
   * Resets the form state
   * Calls onClear callback
   */
  const handleOnClear = () => {
    setCurrentCategoryProperty({ id: -1, name: "", type: undefined });
    setCurrentOperator({ id: "empty", text: "" });
    setValue("");

    onClear();
  };

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
        {visibleOperators.length > 0 && (
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
              {visibleOperators.map((operator) => (
                <option key={operator.id} value={operator.id}>
                  {operator.text}
                </option>
              ))}
            </select>
          </fieldset>
        )}
        {currentCategoryProperty && currentCategoryProperty.id !== -1 && (
          <fieldset className="flex gap-2 items-center">
            <label htmlFor="value">Value:</label>
            <DynamicInput
              type={currentCategoryProperty.type}
              values={currentCategoryProperty.values}
              handleChange={handleValueChange}
            />
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

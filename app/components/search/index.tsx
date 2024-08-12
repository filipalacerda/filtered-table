"use client";

import { ChangeEvent, useMemo, useState } from "react";
import type { Operator, Property, Filters } from "../../types/types";

import DynamicInput from "./dynamicInput";
import { filterOperators } from "./utils";

import "./styles.css";

type SearchProps = {
  categories: Property[];
  operators: Operator[];
  onChange: ({ property, operator, value }: Filters) => void;
  onClear: () => void;
};

/**
 * Renders a form with 4 items:
 * - a select field for the categories
 * - a select field for the operators
 * - a dynamic field that depends on the categories for the search value
 * - a clear button that resets the state of the form
 */
const Search = ({ categories, operators, onClear, onChange }: SearchProps) => {
  // We need to save the selected values
  const [currentOperator, setCurrentOperator] = useState<Operator>();
  const [currentCategoryProperty, setCurrentCategoryProperty] =
    useState<Property>();
  const [currentValue, setCurrentValue] = useState<string>();

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
   * We search for the correspondent id, since we'll need the full object for the onChange callback
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

    onChange({
      property: categorySelected,
      operator: currentOperator,
      value: currentValue,
    });
  };

  /**
   * When the user selects an operator, we need to store it
   * in order to be able to use it on the onChange callback
   * @param e: ChangeEvent
   */
  const handleOperatorChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;

    const operatorSelected = operators.filter((operator) => {
      return operator.id === value;
    })[0];

    setCurrentOperator(operatorSelected);

    onChange({
      property: currentCategoryProperty,
      operator: operatorSelected,
      value: currentValue,
    });
  };

  /**
   * When the user types a value or selects an option,
   * we need to store the value so we can use it on the onChange callback
   * @param e: ChangeEvent
   */
  const handleValueChange = (value: string) => {
    setCurrentValue(value);

    onChange({
      property: currentCategoryProperty,
      operator: currentOperator,
      value,
    });
  };

  /**
   * Resets the form state and error state
   * Calls onClear callback
   */
  const handleOnClear = () => {
    setCurrentCategoryProperty({ id: -1, name: "", type: undefined });
    setCurrentOperator({ id: "empty", text: "" });
    setCurrentValue("");

    onClear();
  };

  // We only want to render the input when the property is defined
  // and the operator is not none or any
  const isDynamicInputVisible =
    currentCategoryProperty &&
    currentCategoryProperty.id !== -1 &&
    currentOperator?.id !== "none" &&
    currentOperator?.id !== "any";

  return (
    <form className="search-form">
      <div className="fields-container">
        <fieldset className="fieldset">
          <label htmlFor="category" className="label">
            Category:
          </label>
          <select
            aria-required
            required
            data-testid="category-select"
            name="category"
            id="category"
            onChange={handleCategoryChange}
            className="input"
            value={currentCategoryProperty?.id}
          >
            <option value="-1">Choose Category</option>
            {categories.map((category) => (
              <option
                key={category.id}
                value={category.id}
                className="bg-white"
              >
                {category.name}
              </option>
            ))}
          </select>
        </fieldset>
        {visibleOperators.length > 0 && (
          <fieldset className="fieldset">
            <label htmlFor="operator" className="label">
              Operator:
            </label>
            <select
              aria-required
              required
              data-testid="operator-select"
              name="operator"
              id="operator"
              onChange={handleOperatorChange}
              className="input"
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
        {isDynamicInputVisible && (
          <fieldset className="fieldset">
            <label htmlFor="value" className="label">
              Value:
            </label>
            <DynamicInput
              data-testid="value-input"
              type={currentCategoryProperty.type}
              values={currentCategoryProperty.values}
              handleChange={handleValueChange}
            />
          </fieldset>
        )}
      </div>
      <div>
        <button type="button" onClick={handleOnClear} className="clear-button">
          Clear
        </button>
      </div>
    </form>
  );
};

export default Search;

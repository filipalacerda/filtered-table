import { ChangeEvent } from "react";

import type { PropertyType } from "@/app/types/types";

type DynamicInputProps = {
  value?: string;
  type: PropertyType;
  values?: string[];
  handleChange: (value: string) => void;
};

/**
 * We need to render a different input type depending on the property type.
 * If the type is a string, it returns a text input
 * If the type is a number, it returns a number input
 * If the type is enumerated, it returns a select input
 *
 * If the type does not match any of the above, this component will return null
 *
 * @param param0
 * @returns React.Element | null
 */
const DynamicInput = ({
  value,
  type,
  values,
  handleChange,
}: DynamicInputProps) => {
  const onChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    handleChange(e.target.value);
  };

  return type === "string" ? (
    <input
      value={value}
      data-testid="string-field"
      type="text"
      onChange={onChange}
      className="border border-gray-400 rounded-sm font-light text-sm p-2"
    />
  ) : type === "number" ? (
    <input
      value={value}
      data-testid="number-field"
      type="number"
      onChange={onChange}
      className="border border-gray-400 rounded-sm font-light text-sm p-2"
    />
  ) : type === "enumerated" ? (
    <select
      value={value}
      data-testid="select-field"
      onChange={onChange}
      className="border p-2 border-gray-400 rounded-sm text-sm focus:border-blue-500 focus:ring-blue-500"
    >
      <option>Choose Value</option>

      {values &&
        values.map((value: string) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
    </select>
  ) : null;
};

export default DynamicInput;

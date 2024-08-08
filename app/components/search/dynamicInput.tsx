import { ChangeEvent } from "react";

type DynamicInputProps = {
  type: string;
  values?: string[];
  handleChange: (value: string) => void;
};

const DynamicInput = ({ type, values, handleChange }: DynamicInputProps) => {
  const onChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    handleChange(e.target.value);
  };

  return type === "string" ? (
    <input
      data-testid="string-field"
      type="text"
      onChange={onChange}
      className="border border-gray-400 rounded-sm font-light text-sm p-2"
    />
  ) : type === "number" ? (
    <input
      data-testid="number-field"
      type="number"
      onChange={onChange}
      className="border border-gray-400 rounded-sm font-light text-sm p-2"
    />
  ) : type === "enumerated" ? (
    <select
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

import { ChangeEvent, useEffect, useMemo, useState } from "react";

import type { PropertyType } from "@/app/types/types";

type DynamicInputProps = {
  type: PropertyType;
  values?: string[];
  handleChange: (value: string) => void;
  operator: string;
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
  type,
  values,
  handleChange,
  operator,
}: DynamicInputProps) => {
  const [checkboxValue, setCheckboxValue] = useState("");

  const onChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    handleChange(e.target.value);
  };

  const onCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    let newValue;
    if (checkboxValue.length) {
      newValue = checkboxValue.concat(",", e.target.value);
    } else {
      newValue = e.target.value;
    }

    setCheckboxValue(newValue);
    handleChange(newValue);
  };

  return (
    <div>
      {type === "string" ||
        (type === "number" && (
          <input
            data-testid="text-field"
            type="text"
            onChange={onChange}
            className="input"
          />
        ))}

      {type === "enumerated" && operator === "in" && (
        <div className="checkboxes">
          {values?.map((value) => (
            <div key={value}>
              <label htmlFor={`${value}-checkbox`}>{value}</label>
              <input
                name={`${value}-checkbox`}
                id={`${value}-checkbox`}
                type="checkbox"
                value={value}
                onChange={onCheckboxChange}
              />
            </div>
          ))}
        </div>
      )}

      {type === "enumerated" && operator !== "in" && (
        <select
          data-testid="select-field"
          onChange={onChange}
          className="input"
        >
          <option>Choose Value</option>

          {values &&
            values.map((value: string) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
        </select>
      )}
    </div>
  );
};

export default DynamicInput;

import React, { FunctionComponent } from "react";
import OrigSelect, { SingleValue, MultiValue } from "react-select";

interface Option {
  label: string;
  value: string;
}
interface SelectProps {
  options: Option[];
  handleChange: (
    selectedOption: SingleValue<Option> | MultiValue<Option>
  ) => void;
  isMulti?: boolean;
}

export const Select: FunctionComponent<SelectProps> = ({
  options,
  handleChange,
  isMulti,
}) => {
  return (
    <OrigSelect
      menuPlacement="auto"
      menuPortalTarget={document.body}
      styles={{
        menuPortal: (base) => ({ ...base, zIndex: 9999 }),
        input: (base) => ({ ...base, fontSize: "1rem" }),
        container: (provided) => ({
          ...provided,
          fontSize: "1.25rem",
        }),
        // multiValue: (base) => {
        //   return {
        //     ...base,
        //     backgroundColor: theme.palette.secondary.main,
        //   };
        // },
        // multiValueLabel: (base) => ({
        //   ...base,
        //   color: "white",
        // }),
      }}
      options={options}
      isMulti={isMulti}
      onChange={handleChange}
    />
  );
};

import React, { FunctionComponent } from 'react';
import OrigSelect, { SingleValue, MultiValue } from 'react-select';
import CreatableSelect from 'react-select/creatable';

import { colourNameToHex } from '../../utils/color';

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
  createable?: boolean;
  defaultValue?: Option;
  isClearable?: boolean;
}

export const Select: FunctionComponent<SelectProps> = ({
  options,
  handleChange,
  isMulti,
  createable,
  defaultValue,
  isClearable,
}) => {
  return createable ? (
    <CreatableSelect
      isClearable={isClearable}
      menuPlacement="auto"
      menuPortalTarget={document.body}
      defaultValue={defaultValue}
      styles={{
        menuPortal: (base) => ({ ...base, zIndex: 9999 }),
        input: (base) => ({ ...base, fontSize: '1rem' }),
        container: (provided) => ({
          ...provided,
          fontSize: '1.25rem',
        }),
      }}
      options={options}
      isMulti={isMulti}
      onChange={handleChange}
    />
  ) : (
    <OrigSelect
      menuPlacement="auto"
      isClearable={isClearable}
      menuPortalTarget={document.body}
      styles={{
        menuPortal: (base) => ({ ...base, zIndex: 9999 }),
        input: (base) => ({ ...base, fontSize: '1rem' }),
        container: (provided) => ({
          ...provided,
          fontSize: '1.25rem',
        }),
      }}
      defaultValue={defaultValue}
      options={options}
      isMulti={isMulti}
      onChange={handleChange}
    />
  );
};

const dot = (color = '#ccc') => ({
  alignItems: 'center',
  display: 'flex',

  ':before': {
    backgroundColor: color,
    borderRadius: 10,
    border: '1px solid black',
    content: '" "',
    display: 'block',
    marginRight: 8,
    height: 15,
    width: 15,
  },
});

export const ColorSelect: FunctionComponent<SelectProps> = ({
  options,
  handleChange,
  isMulti,
  defaultValue,
}) => {
  return (
    <OrigSelect
      menuPlacement="auto"
      menuPortalTarget={document.body}
      defaultValue={defaultValue}
      styles={{
        menuPortal: (base) => ({ ...base, zIndex: 9999 }),
        container: (provided) => ({
          ...provided,
          fontSize: '1.25rem',
        }),
        singleValue: (styles, { data }) => {
          const hex = colourNameToHex(data.value);
          return { ...styles, ...dot(hex) };
        },
        option: (base, { data }) => {
          const hex = colourNameToHex(data.value);
          return {
            ...base,
            ...dot(hex),
          };
        },
      }}
      options={options}
      isMulti={isMulti}
      onChange={handleChange}
    />
  );
};

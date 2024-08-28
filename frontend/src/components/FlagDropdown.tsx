import React from 'react';
import ReactCountryFlag from "react-country-flag"

interface FlagDropdownProps {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string; flagCode: string }[];
}

const FlagDropdown: React.FC<FlagDropdownProps> = ({ value, onChange, options }) => {
  return (
    <div className="flex-wrap p-1 bg-white rounded-lg">
      <ReactCountryFlag
      className="w-full h-full mr-1"
        countryCode={options.find((option) => option.value === value).flagCode} 
        svg
      />
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="p-1 focus:outline-none"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}

          </option>
        ))}
      </select>
    </div>
  );
};

export default FlagDropdown;
import React from 'react';
import ReactCountryFlag from "react-country-flag"

interface FlagDropdownProps {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string; flagCode: string }[];
}

const FlagDropdown: React.FC<FlagDropdownProps> = ({ value, onChange, options }) => {
  return (
    <div className="flex-wrap  bg-slate-50 rounded-lg">
      <ReactCountryFlag
      className="w-full h-full mx-1"
        countryCode={options.find((option) => option.value === value).flagCode} 
        svg
      />
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-lg border-0 p-1 text-base md:text-lg 2xl:text-xl appearance-none focus:outline-none focus:ring-0 text-grey-50 font-medium"
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
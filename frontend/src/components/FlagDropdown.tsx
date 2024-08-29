import React from 'react';
import ReactCountryFlag from "react-country-flag"

interface FlagDropdownProps {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string; flagCode: string }[];
}

const FlagDropdown: React.FC<FlagDropdownProps> = ({ value, onChange, options }) => {
  return (
    <div className="flex-wrap p-1 bg-slate-50 rounded-lg">
      <ReactCountryFlag
      className="w-full h-full mr-1"
        countryCode={options.find((option) => option.value === value).flagCode} 
        svg
      />
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="md: p-1 text-base md:text-lg 2xl:text-xl focus:outline-none appearance-none bg-transparent text-grey-50 font-medium"
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
import React from 'react';
import Flag from 'react-world-flags';

interface FlagDropdownProps {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string; flagCode: string }[];
}

const FlagDropdown: React.FC<FlagDropdownProps> = ({ value, onChange, options }) => {
  return (
    <div className="flag-dropdown flex items-center">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="p-4 border border-gray-300 rounded-l-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className="flag-icon ml-2">
        <Flag code={options.find((option) => option.value === value)?.flagCode || ''} height="16" />
      </div>
    </div>
  );
};

export default FlagDropdown;
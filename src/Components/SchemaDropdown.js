import React from 'react';

const SchemaDropdown = ({ options, selectedOption, onChange }) => {
  return (
    <div className="schema-dropdown">
      <select
        value={selectedOption}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">Select schema</option>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SchemaDropdown;

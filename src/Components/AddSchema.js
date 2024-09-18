import React from "react";

const AddSchema = ({
  selectedSchema,
  setSelectedSchema,
  getAvailableOptions,
  handleAddSchema,
}) => {
  return (
    <div>
      <div className="addsegment">
        <select
          value={selectedSchema}
          onChange={(e) => setSelectedSchema(e.target.value)}
        >
          <option value="">Add Schema to Segment</option>
          {getAvailableOptions().map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <button className="delete-button">-</button>
      </div>
      <div className="addnew">
        <a href="javascript:void(0)" onClick={handleAddSchema}>
          + Add new schema
        </a>
      </div>
    </div>
  );
};

export default AddSchema;

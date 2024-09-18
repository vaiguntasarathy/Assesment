import React from "react";
import schemaOptions from "./SchemaOptions";

const SchemaList = ({ schemas, handleChangeSchemaInBlueBox, handleDeleteSchema, getAvailableOptions }) => {
  return (
    <div className="blue-box">
      {schemas.map((item) => (
        <div key={item.id} className="schema-item">
          <select
            value={item.schema}
            onChange={(e) =>
              handleChangeSchemaInBlueBox(item.id, e.target.value)
            }
          >
            <option value="">Select schema</option>
            {getAvailableOptions()
              .concat(
                schemaOptions.filter((option) => option.value === item.schema)
              )
              .map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
          </select>

          <button
            onClick={() => handleDeleteSchema(item.id)}
            className="delete-button"
          >
            -
          </button>
        </div>
      ))}
    </div>
  );
};

export default SchemaList;

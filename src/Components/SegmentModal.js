import React, { useState } from "react";
import schemaOptions from "./SchemaOptions";

const SegmentModal = ({ closeModal }) => {
  const [segmentName, setSegmentName] = useState("");
  const [schemas, setSchemas] = useState([]);
  const [selectedSchema, setSelectedSchema] = useState("");

  const webhookUrl =
    "https://webhook.site/dcfb32fa-037d-4973-b334-23635e8681f2";

  const getAvailableOptions = () => {
    const selectedValues = schemas.map((item) => item.schema);
    return schemaOptions.filter(
      (option) => !selectedValues.includes(option.value)
    );
  };

  const handleAddSchema = () => {
    if (!selectedSchema) return;

    setSchemas([...schemas, { schema: selectedSchema, id: Date.now() }]);
    setSelectedSchema("");
  };

  const handleChangeSchemaInBlueBox = (id, newSchema) => {
    const updatedSchemas = schemas.map((item) =>
      item.id === id ? { ...item, schema: newSchema } : item
    );
    setSchemas(updatedSchemas);
  };

  const handleDeleteSchema = (id) => {
    const updatedSchemas = schemas.filter((item) => item.id !== id);
    setSchemas(updatedSchemas);
  };

  const handleSubmit = async () => {
    const dataToSend = {
      segment_name: segmentName,
      schema: schemas.map((schema) => {
        const selectedOption = schemaOptions.find(
          (option) => option.value === schema.schema
        );
        return { [selectedOption.value]: selectedOption.label };
      }),
    };

    await fetch(webhookUrl, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataToSend),
    });

    closeModal();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-box">
          <h2> &lt; Save Segment</h2>
          <div className="segment">
            <label>Segment Name:</label>
            <input
              type="text"
              value={segmentName}
              onChange={(e) => setSegmentName(e.target.value)}
              placeholder="Enter segment name"
            />
          </div>
          <p>
            To save your segment, you need to add the schemas to build the
            query.
          </p>

          {schemas.length > 0 && (
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
                        schemaOptions.filter(
                          (option) => option.value === item.schema
                        )
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
          )}

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

          <div className="button-group">
            <button onClick={handleSubmit} className="savebtn">
              Save the Segment
            </button>
            <button onClick={closeModal} className="cancelbtn">
              cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SegmentModal;

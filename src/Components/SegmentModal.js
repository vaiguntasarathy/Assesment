import React, { useState } from "react";
import schemaOptions from "./SchemaOptions";
import SchemaList from "./SchemaList";
import AddSchema from "./AddSchema";
import ModalButtons from "./Buttons";
import WebhookUrl from "../Utils/Webhook";

const SegmentModal = ({ closeModal }) => {
  const [segmentName, setSegmentName] = useState("");
  const [schemas, setSchemas] = useState([]);
  const [selectedSchema, setSelectedSchema] = useState("");

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

    await fetch(WebhookUrl, {
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
            <label>Enter the Name of the Segment:</label>
            <input
              type="text"
              value={segmentName}
              onChange={(e) => setSegmentName(e.target.value)}
              placeholder="Name of the segment  "
            />
          </div>
          <p>
            To save your segment, you need to add the schemas to build the
            query.
          </p>

          {schemas.length > 0 && (
            <SchemaList
              schemas={schemas}
              handleChangeSchemaInBlueBox={handleChangeSchemaInBlueBox}
              handleDeleteSchema={handleDeleteSchema}
              getAvailableOptions={getAvailableOptions}
            />
          )}

          <AddSchema
            selectedSchema={selectedSchema}
            setSelectedSchema={setSelectedSchema}
            getAvailableOptions={getAvailableOptions}
            handleAddSchema={handleAddSchema}
          />

          <ModalButtons handleSubmit={handleSubmit} closeModal={closeModal} />
        </div>
      </div>
    </div>
  );
};

export default SegmentModal;

import React from "react";
import InputGroup from "../InputGroup";


const TextField = ({ label, name, value, error, onChange, type = "input" }) => (
  <InputGroup label={label} htmlFor={name} error={error}>
    {type === "textarea" ? (
      <textarea
        id={name}
        name={name}
        value={value || ""}
        onChange={onChange}
        autoComplete="off"
        aria-invalid={!!error}
        aria-describedby={`${name}-error`}
      />
    ) : (
      <input
        id={name}
        name={name}
        value={value || ""}
        onChange={onChange}
        autoComplete="off"
        aria-invalid={!!error}
        aria-describedby={`${name}-error`}
      />
    )}
  </InputGroup>
);

export default TextField;

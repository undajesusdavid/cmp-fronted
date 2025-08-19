import React from "react";
import InputGroup from "../InputGroup";

const SelectField = ({
  label,
  name,
  value,
  onChange,
  options = [],
  loading,
  error,
  getOptionLabel = (opt) => opt.nombre || "Sin nombre", // valor por defecto
}) => (
  <InputGroup label={label} htmlFor={name} error={error} loading={loading}>
    <select
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      aria-invalid={!!error}
      aria-describedby={`${name}-error`}
    >
      <option value="">-- Seleccione --</option>
      {options.length > 0 ? (
        options.map((opt) => (
          <option key={opt.id} value={opt.id}>
            {getOptionLabel(opt)}
          </option>
        ))
      ) : (
        <option disabled>No hay opciones disponibles</option>
      )}
    </select>
  </InputGroup>
);

export default SelectField;

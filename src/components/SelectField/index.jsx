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
  disabled = false, // nueva prop opcional
  getOptionLabel = (opt) => opt.nombre || "Sin nombre",
}) => (
  <InputGroup label={label} htmlFor={name} error={error} loading={loading}>
    <select
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      aria-invalid={!!error}
      aria-describedby={`${name}-error`}
      disabled={disabled} // aplicamos la prop aquí
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

import React from "react";
import InputGroup from "../../../../components/InputGroup";
import FormGroup from "../../../../components/FormGroup";

const Fields = ({ form, errors, onChange, onSubmit, departamentos = [] }) => {
  return (
    <form onSubmit={onSubmit}>
      <FormGroup
        direction="horizontal"
        wrap="true"
        titulo="Expediente"
        collapsible={true}
      >
        <InputGroup
          label="Departamento"
          htmlFor="departamento_id"
          error={errors.departamento_id}
        >
          <select
            id="departamento_id"
            name="departamento_id"
            value={form.departamento_id}
            onChange={onChange}
          >
            <option value="">Seleccione un departamento</option>
            {departamentos.map((dep) => (
              <option key={dep.id} value={dep.id}>
                {dep.nombre}
              </option>
            ))}
          </select>
        </InputGroup>

        <InputGroup
          label="Codigo"
          htmlFor="codigo"
          error={errors.codigo}
        >
          <input
            id="codigo"
            name="codigo"
            value={form.codigo}
            onChange={onChange}
            autoComplete="off"
          />
        </InputGroup>


        <InputGroup
          label="Ejercicio Fiscal"
          htmlFor="ejercicio_fiscal"
          error={errors.ejercicio_fiscal}
        >
          <input
            id="ejercicio_fiscal"
            name="ejercicio_fiscal"
            value={form.ejercicio_fiscal}
            onChange={onChange}
            autoComplete="off"
          />
        </InputGroup>

        <InputGroup
          label="Descripción"
          htmlFor="descripcion"
          error={errors.descripcion}
        >
          <input
            id="descripcion"
            name="descripcion"
            value={form.descripcion}
            onChange={onChange}
            autoComplete="off"
          />
        </InputGroup>
      </FormGroup>
    </form>
  );
};

export default Fields;

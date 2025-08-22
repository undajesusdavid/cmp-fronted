import React from "react";
import InputGroup from "../../../../components/InputGroup";
import FormGroup from "../../../../components/FormGroup";
import SelectField from "../../../../components/SelectField";
import DefaultButton from "../../../../components/DefaultButton";

const safe = (val) => val ?? "";

const Fields = ({
  form,
  loadingSubmit,
  submitLabel,
  onSubmit,
  errorsValidation: errors,
  onChange,
  metadata,
}) => {
  const { departamentos } = metadata;
  return (
    <form onSubmit={onSubmit}>
      <FormGroup
        direction="horizontal"
        wrap="true"
        titulo="Expediente"
        collapsible={true}
      >
        <SelectField
          label="Departamento"
          name="departamento_id"
          value={safe(form.departamento_id)}
          onChange={onChange}
          options={departamentos?.data || []}
          loading={departamentos?.loading}
          error={errors?.departamento_id}
          getOptionLabel={(opt) => `${opt.nombre}`}
        />

        <InputGroup label="Codigo" htmlFor="codigo" error={errors.codigo}>
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
      <DefaultButton type="submit" disabled={loadingSubmit}>
        {loadingSubmit ? "Registrando..." : submitLabel || "Registrar Elemento"}
      </DefaultButton>
    </form>
  );
};

export default Fields;

import React from "react";
import InputGroup from "../../../../components/InputGroup";
import DefaultButton from "../../../../components/DefaultButton";
import FormGroup from "../../../../components/FormGroup";

const FormClasificacionFields = ({
  form,
  errors,
  departamentos,
  loading,
  onChange,
  onSubmit,
  submitLabel,
}) => (
  <form onSubmit={onSubmit}>
    <FormGroup direction="horizontal" wrap="true"> 
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
        label="Código de Serie"
        htmlFor="cod_serie"
        error={errors.cod_serie}
      >
        <input
          id="cod_serie"
          name="cod_serie"
          value={form.cod_serie}
          onChange={onChange}
          autoComplete="off"
        />
      </InputGroup>
      <InputGroup
        label="Código de Subserie"
        htmlFor="cod_subserie"
        error={errors.cod_subserie}
      >
        <input
          id="cod_subserie"
          name="cod_subserie"
          value={form.cod_subserie}
          onChange={onChange}
          autoComplete="off"
        />
      </InputGroup>
      <InputGroup label="Serie" htmlFor="serie" error={errors.serie}>
        <input
          id="serie"
          name="serie"
          value={form.serie}
          onChange={onChange}
          autoComplete="off"
        />
      </InputGroup>
      <InputGroup label="Subserie" htmlFor="subserie" error={errors.subserie}>
        <input
          id="subserie"
          name="subserie"
          value={form.subserie}
          onChange={onChange}
          autoComplete="off"
        />
      </InputGroup>
    </FormGroup>

    <DefaultButton type="submit" disabled={loading}>
      {loading ? "Registrando..." : submitLabel || "Registrar Clasificación"}
    </DefaultButton>
  </form>
);

export default FormClasificacionFields;

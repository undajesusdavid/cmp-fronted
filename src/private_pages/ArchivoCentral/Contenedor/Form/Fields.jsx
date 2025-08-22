import React from "react";
import InputGroup from "../../../../components/InputGroup";
import FormGroup from "../../../../components/FormGroup";
import SelectField from "../../../../components/SelectField";
import DefaultButton from "../../../../components/DefaultButton";

const safe = (val) => val ?? "";

const Fields = ({
  form,
  loadingSubmit,
  errorsValidation: errors,
  onChange,
  onSubmit,
  submitLabel,
  metadata,
}) => {
  const { departamentos, unidadesDeConservacion } = metadata;
  return (
    <form onSubmit={onSubmit}>
      <FormGroup
        direction="horizontal"
        wrap="true"
        titulo="Contenedor"
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

        <SelectField
          label="Unidad de Conservación"
          name="unidad_conservacion_id"
          value={safe(form.unidad_conservacion_id)}
          onChange={onChange}
          options={unidadesDeConservacion?.data || []}
          loading={unidadesDeConservacion?.loading}
          error={errors?.unidad_conservacion_id}
          getOptionLabel={(opt) => `${opt.nombre}`}
        />

        <InputGroup
          label="Ejercicio"
          htmlFor="ejercicio"
          error={errors.ejercicio}
        >
          <input
            id="ejercicio"
            name="ejercicio"
            value={form.ejercicio}
            onChange={onChange}
            autoComplete="off"
          />
        </InputGroup>
        <InputGroup
          label="Ubicación"
          htmlFor="ubicacion"
          error={errors.ubicacion}
        >
          <input
            id="ubicacion"
            name="ubicacion"
            value={form.ubicacion}
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

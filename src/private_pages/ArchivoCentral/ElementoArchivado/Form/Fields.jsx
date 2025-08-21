import React from "react";
import PropTypes from "prop-types";
import DefaultButton from "../../../../components/DefaultButton";
import FormGroup from "../../../../components/FormGroup";
import SelectField from "../../../../components/SelectField";
import TextField from "../../../../components/TextField";

// Función utilitaria para manejar valores nulos o indefinidos
const safe = (val) => val ?? "";

const Fields = ({
  form,
  errorsValidation,
  loadingSubmit,
  onChange,
  onSubmit,
  submitLabel,
  metadata,
}) => {
  const { clasificaciones, departamentos, expedientes, contenedores } = metadata;
  const textInputs = [
    { label: "Código", name: "codigo" },
    { label: "Título", name: "titulo" },
    { label: "Ejercicio Fiscal", name: "ejercicio_fiscal" },
    { label: "Soporte", name: "soporte" },
    { label: "Observación", name: "observacion", type: "textarea" },
  ];

  return (
    <form onSubmit={onSubmit}>
      <FormGroup
        title="Formulario de Elemento Archivado"
        direction="horizontal"
        wrap={true}
        collapsible={true}
      >
        <SelectField
          label="Departamento"
          name="departamento_id"
          value={safe(form.departamento_id)}
          onChange={onChange}
          options={departamentos?.data || []}
          loading={departamentos?.loading}
          error={errorsValidation?.departamento_id}
          getOptionLabel={(opt) => `${opt.nombre}`}
        />

        <SelectField
          disabled={form.departamento_id === ""? true:false }
          label="Clasificación"
          name="clasificacion_id"
          value={safe(form.clasificacion_id)}
          onChange={onChange}
          options={clasificaciones?.data || []}
          loading={clasificaciones?.loading}
          error={errorsValidation?.clasificacion_id}
          getOptionLabel={(opt) => `${opt.serie} - ${opt.subserie}`}
        />

        <SelectField
          disabled={form.departamento_id === ""? true:false }
          label="Expediente (Opcional)"
          name="expediente_id"
          value={safe(form.expediente_id)}
          onChange={onChange}
          options={expedientes?.data || []}
          loading={expedientes?.loading}
          error={errorsValidation?.expediente_id}
          getOptionLabel={(opt) => `${opt?.descripcion} - ${opt?.ejercicio_fiscal}`}
        />
         <SelectField
         disabled={form.departamento_id === ""? true:false }
          label="Contenedor (Opcional)"
          name="contenedor_id"
          value={safe(form.contenedor_id)}
          onChange={onChange}
          options={contenedores?.data || []}
          loading={contenedores?.loading}
          error={errorsValidation?.contenedor_id}
          getOptionLabel={(opt) => `${opt?.unidad_conservacion?.nombre} - ${opt?.ejercicio}`}
        />

        {textInputs.map(({ label, name, type }) => (
          <TextField
            key={name}
            label={label}
            name={name}
            value={safe(form?.[name])}
            error={errorsValidation?.[name]}
            onChange={onChange}
            type={type || "text"}
          />
        ))}
      </FormGroup>

      <DefaultButton type="submit" disabled={loadingSubmit}>
        {loadingSubmit ? "Registrando..." : submitLabel || "Registrar Elemento"}
      </DefaultButton>
    </form>
  );
};

Fields.propTypes = {
  form: PropTypes.object.isRequired,
  errors: PropTypes.object,
  loading: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  submitLabel: PropTypes.string,
  metadata: PropTypes.shape({
    clasificaciones: PropTypes.shape({
      data: PropTypes.array,
      loading: PropTypes.bool,
    }),
    departamentos: PropTypes.shape({
      data: PropTypes.array,
      loading: PropTypes.bool,
    }),
  }).isRequired,
};

export default Fields;

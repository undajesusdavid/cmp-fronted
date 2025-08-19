import InputGroup from "../../../../components/InputGroup";
import DefaultButton from "../../../../components/DefaultButton";
import FormGroup from "../../../../components/FormGroup";

const Fields = ({
  form,
  errors,
  loading,
  onChange,
  onSubmit,
  submitLabel,
  clasificaciones = [],
  departamentos = [],
}) => {
  return (
    <form onSubmit={onSubmit}>
      <FormGroup
        title="Formulario de Elemento Archivado"
        direction="horizontal"
        wrap="true"
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
            value={form.departamento_id || ""}
            onChange={onChange}
          >
            <option value="">-- Seleccione -- </option>
            {departamentos.map((d) => (
              <option key={d.id} value={d.id}>
                {d.nombre || "no se hallaron las propiedades"}
              </option>
            ))}
          </select>
        </InputGroup>
        <InputGroup
          label="Clasificación"
          htmlFor="clasificacion_id"
          error={errors.clasificacion_id}
        >
          <select
            id="clasificacion_id"
            name="clasificacion_id"
            value={form.clasificacion_id || ""}
            onChange={onChange}
          >
            <option value="">Seleccione una clasificación</option>
            {clasificaciones.map((c) => (
              <option key={c.id} value={c.id}>
                {c.serie + " - " + c.subserie ||
                  "no se hallaron las propiedades"}
              </option>
            ))}
          </select>
        </InputGroup>
        <InputGroup label="Código" htmlFor="codigo" error={errors.codigo}>
          <input
            id="codigo"
            name="codigo"
            value={form.codigo}
            onChange={onChange}
            autoComplete="off"
          />
        </InputGroup>

        <InputGroup label="Título" htmlFor="titulo" error={errors.titulo}>
          <input
            id="titulo"
            name="titulo"
            value={form.titulo}
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
        <InputGroup label="Soporte" htmlFor="soporte" error={errors.soporte}>
          <input
            id="soporte"
            name="soporte"
            value={form.soporte}
            onChange={onChange}
            autoComplete="off"
          />
        </InputGroup>
        <InputGroup
          label="Observación"
          htmlFor="observacion"
          error={errors.observacion}
        >
          <textarea
            id="observacion"
            name="observacion"
            value={form.observacion}
            onChange={onChange}
            autoComplete="off"
          />
        </InputGroup>
      </FormGroup>
      <DefaultButton type="submit" disabled={loading}>
        {loading ? "Registrando..." : submitLabel || "Registrar Elemento"}
      </DefaultButton>
    </form>
  );
};

export default Fields;

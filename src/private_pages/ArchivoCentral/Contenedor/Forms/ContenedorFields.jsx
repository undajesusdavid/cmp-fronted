const ContenedorFields = ({
  form,
  errors,
  loading,
  onChange,
  onSubmit,
  submitLabel,
  undad_conservacion = [],
  departamentos = [],
}) => {
  <form onSubmit={onSubmit}>
    <FormGroup
      direction="horizontal"
      wrap="true"
      titulo="Contenedor"
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
        label="Unidad de Conservación"
        htmlFor="unidad_conservacion_id"
        error={errors.unidad_conservacion_id}
      >
        <select
          id="unidad_conservacion_id"
          name="unidad_conservacion_id"
          value={form.unidad_conservacion_id}
          onChange={onChange}
        >
          <option value="">-- Seleccione --</option>
          {undad_conservacion.map((unidad) => (
            <option key={unidad.id} value={unidad.id}>
              {unidad.nombre}
            </option>
          ))}
        </select>
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
    </FormGroup>
  </form>;
};

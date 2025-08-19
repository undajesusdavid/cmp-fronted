const FormEvents = {
  //Evento del Select de departamentos
  departamento_id: (e, { setForm }, { clasificaciones, expedientes, contenedores }) => {
    const departamento_id = e.target.value;

    setForm((prev) => ({
      ...prev,
      departamento_id,
      clasificacion_id: "",
      expediente_id: "",
      contenedor_id: ""
    }));

    if (clasificaciones && expedientes && contenedores) {
      if (departamento_id !== "") {
        clasificaciones.execute(departamento_id);
        expedientes.execute(departamento_id);
        contenedores.execute(departamento_id);
      } else {
        clasificaciones.reset();
        expedientes.reset();
        contenedores.reset();
      }
    }
  },
};

export default FormEvents;

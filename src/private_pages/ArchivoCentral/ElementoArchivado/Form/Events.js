const handleDepartamentoChange = (event, { setForm }, metadata) => {
  const departamento_id = event.target.value;
  
  setForm((prev) => ({
    ...prev,
    departamento_id,
    clasificacion_id: "",
  }));

  if (metadata.clasificaciones) {
    if (departamento_id !== "") {
      metadata.clasificaciones.execute(departamento_id);
    } else {
      metadata.clasificaciones.reset();
    }
  }
};

const Events = {
  handleDepartamentoChange,
};

export default Events;

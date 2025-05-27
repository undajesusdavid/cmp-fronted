import React, { useState, useEffect } from "react";
import "./FamiliaresFormSection.module.css"; // Asegúrate de crear este archivo CSS

const FamiliaresFormSection = ({
  onFamiliaresChange,
  initialFamiliares = [],
}) => {
  // Estado para la lista de familiares acumulados
  const [familiares, setFamiliares] = useState(initialFamiliares);

  // Estado para el familiar que se está ingresando o editando actualmente
  const [familiarActual, setFamiliarActual] = useState({
    nombre: "",
    apellido: "",
    cedula: "",
    fec_nac: "",
    parentesco_id: "",
  });

  // Estado para saber si estamos en modo edición y qué índice estamos editando
  const [editIndex, setEditIndex] = useState(null);

  // Opciones de parentesco, podrías cargarlas desde una API si es necesario
  const parentescos = [
    { id: 1, nombre: "Padre/Madre" },
    { id: 2, nombre: "Hijo/Hija" },
    { id: 3, nombre: "Cónyuge" },
    { id: 4, nombre: "Hermano/Hermana" },
    { id: 5, nombre: "Otro" },
  ];

  // Sincroniza el estado interno de familiares si la prop initialFamiliares cambia
  useEffect(() => {
    if (initialFamiliares) {
      setFamiliares(initialFamiliares);
    }
  }, [initialFamiliares]);

  // Maneja los cambios en los inputs del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFamiliarActual({
      ...familiarActual,
      [name]: value,
    });
  };

  // Agrega o actualiza un familiar en la tabla
  const handleAddOrUpdateFamiliar = () => {
    // Validación básica de campos
    if (
      !familiarActual.nombre.trim() ||
      !familiarActual.apellido.trim() ||
      !familiarActual.cedula.trim() ||
      !familiarActual.fec_nac.trim() ||
      !familiarActual.parentesco_id
    ) {
      alert(
        "Por favor, completa todos los campos del familiar antes de agregar/actualizar."
      );
      return;
    }

    // Prepara el nuevo objeto familiar con el formato de fecha ISO
    const nuevoFamiliar = {
      ...familiarActual,
      fec_nac: new Date(familiarActual.fec_nac).toISOString(),
      parentesco_id: parseInt(familiarActual.parentesco_id, 10), // Asegura que sea un número entero
    };

    let updatedFamiliares;
    if (editIndex !== null) {
      // Si estamos editando, actualiza el familiar en el índice correspondiente
      updatedFamiliares = familiares.map((fam, idx) =>
        idx === editIndex ? nuevoFamiliar : fam
      );
      setEditIndex(null); // Sale del modo edición
    } else {
      // Si no estamos editando, añade el nuevo familiar a la lista
      updatedFamiliares = [...familiares, nuevoFamiliar];
    }

    setFamiliares(updatedFamiliares); // Actualiza el estado local de familiares
    onFamiliaresChange(updatedFamiliares); // Notifica al componente padre sobre el cambio
    clearFamiliarForm(); // Limpia los inputs del formulario
  };

  // Carga los datos de un familiar en el formulario para su edición
  const handleEditFamiliar = (index) => {
    const familiarToEdit = { ...familiares[index] };
    // Formatea la fecha para que el input type="date" la muestre correctamente
    familiarToEdit.fec_nac = familiarToEdit.fec_nac
      ? familiarToEdit.fec_nac.split("T")[0]
      : "";
    setFamiliarActual(familiarToEdit);
    setEditIndex(index);
  };

  // Elimina un familiar de la tabla
  const handleDeleteFamiliar = (index) => {
    const updatedFamiliares = familiares.filter((_, idx) => idx !== index);
    setFamiliares(updatedFamiliares); // Actualiza el estado local de familiares
    onFamiliaresChange(updatedFamiliares); // Notifica al componente padre

    // Si el elemento borrado era el que se estaba editando, limpia el formulario y sale del modo edición
    if (editIndex === index) {
      clearFamiliarForm();
      setEditIndex(null);
    }
  };

  // Limpia todos los inputs del formulario
  const clearFamiliarForm = () => {
    setFamiliarActual({
      nombre: "",
      apellido: "",
      cedula: "",
      fec_nac: "",
      parentesco_id: "",
    });
  };

  return (
    <div className="familiares-section-container">
      <h3>Familiares</h3>

      {/* Sección de Inputs Horizontales */}
      <div className="familiares-form-inputs">
        <div className="form-field">
          <label htmlFor="nombre">Nombre</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={familiarActual.nombre}
            onChange={handleChange}
            placeholder="Nombre"
            aria-label="Nombre del familiar"
          />
        </div>
        <div className="form-field">
          <label htmlFor="apellido">Apellido</label>
          <input
            type="text"
            id="apellido"
            name="apellido"
            value={familiarActual.apellido}
            onChange={handleChange}
            placeholder="Apellido"
            aria-label="Apellido del familiar"
          />
        </div>
        <div className="form-field">
          <label htmlFor="cedula">Cédula</label>
          <input
            type="text"
            id="cedula"
            name="cedula"
            value={familiarActual.cedula}
            onChange={handleChange}
            placeholder="Cédula"
            aria-label="Cédula del familiar"
          />
        </div>
        <div className="form-field">
          <label htmlFor="fec_nac">Fecha de Nacimiento</label>
          <input
            type="date"
            id="fec_nac"
            name="fec_nac"
            value={familiarActual.fec_nac}
            onChange={handleChange}
            aria-label="Fecha de nacimiento del familiar"
          />
        </div>
        <div className="form-field">
          <label htmlFor="parentesco_id">Parentesco</label>
          <select
            id="parentesco_id"
            name="parentesco_id"
            value={familiarActual.parentesco_id}
            onChange={handleChange}
            aria-label="Parentesco del familiar"
          >
            <option value="">Selecciona Parentesco</option>
            {parentescos.map((parentesco) => (
              <option key={parentesco.id} value={parentesco.id}>
                {parentesco.nombre}
              </option>
            ))}
          </select>
        </div>
        <div className="form-actions">
          <button onClick={handleAddOrUpdateFamiliar}>
            {editIndex !== null ? "Actualizar Familiar" : "Agregar Familiar"}
          </button>
        </div>
      </div>

      {/* Sección de Tabla de Familiares */}
      {familiares.length > 0 && (
        <div className="familiares-table-container">
          <h4>Familiares Agregados:</h4>
          <table className="familiares-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Cédula</th>
                <th>Fecha Nac.</th>
                <th>Parentesco</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {familiares.map((familiar, index) => (
                <tr key={index}>
                  <td>{familiar.nombre}</td>
                  <td>{familiar.apellido}</td>
                  <td>{familiar.cedula}</td>
                  <td>{new Date(familiar.fec_nac).toLocaleDateString()}</td>
                  <td>
                    {parentescos.find((p) => p.id === familiar.parentesco_id)
                      ?.nombre || "Desconocido"}
                  </td>
                  <td>
                    <button
                      className="action-button edit-button"
                      onClick={() => handleEditFamiliar(index)}
                      aria-label={`Editar familiar ${familiar.nombre}`}
                    >
                      Editar
                    </button>
                    <button
                      className="action-button delete-button"
                      onClick={() => handleDeleteFamiliar(index)}
                      aria-label={`Eliminar familiar ${familiar.nombre}`}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default FamiliaresFormSection;

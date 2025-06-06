import "../../stylesPrivatePages.css";
import "../../StyleForms.css";
import DynamicForm from "../../../components/DynamicForm/DynamicForm";
import { useState } from "react";

const RegistrarDocumento = () => {
  const [formData, setFormData] = useState({
    cod_clasificacion: "",
    nombre: "",
    num_acta: "",
    descripcion: "",
    piezas: [],
  });

  const pieceFieldsConfig = [
    {
      name: "numero",
      label: "Número",
      type: "number",
      required: true,
      placeholder: "Ej: 1",
    },
    {
      name: "rang_folios",
      label: "Rango de Folios",
      type: "text",
      required: true,
      placeholder: "Ej: 1-250",
    },
    {
      name: "ubicacion_fisica",
      label: "Ubicación Física",
      type: "text",
      required: true,
      placeholder: "Ej: 1A-02-01",
    },
    {
      name: "ubicacion_digital",
      label: "Ubicación Digital",
      type: "text",
      required: true,
      placeholder: "Ej: asdb9238rr32r9813",
    },
    {
      name: "contenido",
      label: "Contenido",
      type: "textarea",
      required: true,
      placeholder: "Ej: Cédulas de asignación, Oficios de Notificación",
      rows: 4,
    },
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handlePieceFormSubmit = (data) => {
    setFormData((old) => (old.piezas = data));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="tagForm">
        <h3 className="sectionTitle">Datos Generales</h3>
        <div className="formSection">
          <div className="formGroup">
            <label htmlFor="cod_clasificacion">Clasificación:</label>
            <input
              type="text"
              id="cod_clasificacion"
              name="cod_clasificacion"
              value={formData.cod_clasificacion}
              onChange={handleChange}
              placeholder="Codigo de clasificación"
              required
            />
          </div>
          <div className="formGroup">
            <label htmlFor="nombre">Nombre de Tramite:</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Nombre"
              required
            />
          </div>
          <div className="formGroup">
            <label htmlFor="num_acta">Numero de Acta:</label>
            <input
              type="text"
              id="num_acta"
              name="num_acta"
              value={formData.num_acta}
              onChange={handleChange}
              placeholder="Numero de acta"
              required
            />
          </div>
          <div className="formGroupFull">
            <label htmlFor="descripcion">Descripción:</label>
            <textarea
              id="descripcion"
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              placeholder="Descripción"
              rows="3"
            ></textarea>
          </div>
        </div>
        {/* <div className="formGroupFull">
          <DynamicForm className="dynamicForm" fieldsConfig={pieceFieldsConfig} />
        </div> */}

        <button
          type="submit"
          className="submitButton"
          onSubmit={handlePieceFormSubmit}
        >
          Registrar
        </button>
      </form>
    </div>
  );
};

export default RegistrarDocumento;

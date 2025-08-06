import { useEffect, useState } from "react";
import FormClasificacion from "./Forms/FormClasificacion";
import { addClasificacion } from "../../../api/CentralArchive/ClasificacionController";
import { useNavigate } from "react-router-dom";

const RegistrarClasificacion = () => {
  const navigate = useNavigate();
  return (
    <FormClasificacion
      submitLabel="Registrar Clasificación"
      onSubmit={async (formData) => {
        try {
          const response = await addClasificacion(formData);
          console.log("Clasificación registrada:", response);
          navigate("/archivo-central/clasificacion");
          // Aquí puedes manejar la respuesta, como redirigir o mostrar un mensaje
        } catch (error) {
          console.error("Error al registrar clasificación:", error);
          // Manejo de errores
        }
      }}
    />
  );
}


export default RegistrarClasificacion;
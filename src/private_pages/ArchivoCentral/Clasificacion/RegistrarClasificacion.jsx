import { useEffect, useState } from "react";
import Form from "./Form";
import { addClasificacion } from "../../../api/CentralArchive/ClasificacionController";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ButtonBack from "../../../components/ButtonBack/ButtonBack";

const RegistrarClasificacion = () => {
  const navigate = useNavigate();
  return (
    <div>
      <ButtonBack />
      <Form
        submitLabel="Registrar Clasificación"
        onSubmit={async (formData) => {
          try {
            const response = await addClasificacion(formData);
            console.log("Clasificación registrada:", response);
            navigate("/archivo-central/clasificacion");
            toast.success("Clasificación registrada exitosamente");
            // Aquí puedes manejar la respuesta, como redirigir o mostrar un mensaje
          } catch (error) {
            console.error("Error al registrar clasificación:", error);
            // Manejo de errores
          }
        }}
      />
    </div>
  );
};

export default RegistrarClasificacion;

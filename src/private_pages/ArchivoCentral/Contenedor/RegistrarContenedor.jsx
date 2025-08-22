import { useState } from "react";
import Form from "./Form";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import ErrorMessage from "../../../components/ErrorMessage";
import { addContenedor } from "../../../api/CentralArchive/ContenedorController";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAsync from "../../../custom_hooks/useAsync";

const RegistrarContenedor = ({}) => {
  const navigate = useNavigate();
  const { execute, loading, error } = useAsync({
    asyncFunction: addContenedor,
    defaultData: {},
    successFunction: (response) => {
      navigate("/archivo-central/contenedores");
      toast.success("¡Contenedor registrado exitosamente!");
    },
  });

  if (loading) {
    return <LoadingSpinner message="Registrando Contenedor..." />;
  }

  return (
    <div>
      {error && loading === false && (
        <ErrorMessage message={error?.message || "Error de servidor"} />
      )}
      <Form onSubmit={execute} submitLabel="Registrar" />
    </div>
  );
};

export default RegistrarContenedor;

import { useState } from "react";
import Form from "./Form";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import ErrorMessage from "../../../components/ErrorMessage";
import {addContenedor} from "../../../api/CentralArchive/ContenedorController";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const RegistrarContenedor = ({}) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await addContenedor(data);
      navigate("/archivo-central/contenedores");
      toast.success("¡Contenedor registrado exitosamente!");
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {error && loading === false && (
        <ErrorMessage message={error?.message || "Error de servidor"} />
      )}
      {loading && <LoadingSpinner message="Registrando Contenedor..." />}

      <Form onSubmit={onSubmit} submitLabel="Registrar" />
    </div>
  );
};

export default RegistrarContenedor;

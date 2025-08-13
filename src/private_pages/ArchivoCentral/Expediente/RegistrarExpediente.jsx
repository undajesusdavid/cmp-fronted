import Form from "./Form";
import ButtonBack from "../../../components/ButtonBack/ButtonBack";
import ErrorMessage from "../../../components/ErrorMessage";
//import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import { addExpediente } from "../../../api/CentralArchive/ExpedienteController";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const RegistrarExpediente = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (data) => {
    try {
      setLoading(true);
      await addExpediente(data);
      toast.success("¡Expediente registrado exitosamente!");
      navigate("/archivo-central/expedientes");
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <ButtonBack />
      {error && loading === false && (
        <ErrorMessage message="Ha ocurrido un error, no se registro el expediente" />
      )}

      <Form
        onSubmit={handleSubmit}
        submitLabel="Registrar Expediente"
        loading={loading}
      />
    </div>
  );
};

export default RegistrarExpediente;

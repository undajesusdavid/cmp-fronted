import { useState } from "react";
import FormElementos from "./Form";
import { addElementoArchivado } from "../../../api/CentralArchive/InventoryController";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const RegistrarElemento = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleRegister = async (form) => {
    setLoading(true);
    try {
      addElementoArchivado(form);
      toast.success("Elemento Archivado, registrado con éxito");
      navigate("/archivo-central/elementos");
    } catch (error) {
      setError(error);
      toast.error("Ocurrió un error al registrar el elemento archivado");
    } finally {
      setLoading(false);
    }
  }

  return (
    <FormElementos
      submitLabel="Registrar Elemento"
      loading={loading}
      error={error}
      onSubmit={handleRegister}
    />
  );
};

export default RegistrarElemento;

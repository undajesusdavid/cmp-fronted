import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getExpediente,
  updateExpediente,
} from "../../../api/CentralArchive/ExpedienteController";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import ErrorMessage from "../../../components/ErrorMessage";
import Form from "./Form";
import { toast } from "react-toastify";
import ButtonBack from "../../../components/ButtonBack/ButtonBack";

const EditarExpediente = () => {
  const { id } = useParams();
  const [expediente, setExpediente] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [errorUpdate, setErrorUpdate] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setExpediente(await getExpediente(id));
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (data) => {
    try {
      setLoadingUpdate(true);
      await updateExpediente({ id, ...data });
      toast.success("!Expediente actualizado correctamente!");
    } catch (error) {
      setErrorUpdate(error);
    } finally {
      setLoadingUpdate(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <LoadingSpinner message="Cargando Expediente..." />;
  if (error)
    return <ErrorMessage message="ha ocurrido un error, al cargar los datos" />;

  return (
    <di>
      {errorUpdate && (
        <ErrorMessage message="Ha ocurrio un error, no se pudo aplicar el cambio." />
      )}
      <ButtonBack />
      <Form
        onSubmit={handleSubmit}
        submitLabel="Actualizar Expediente"
        loading={loadingUpdate}
        initialData={{
          departamento_id: expediente?.departamento_id,
          codigo: expediente?.codigo,
          ejercicio_fiscal: expediente?.ejercicio_fiscal,
          descripcion: expediente?.descripcion,
        }}
      />
    </di>
  );
};

export default EditarExpediente;

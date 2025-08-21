import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getElementoArchivado,
  updateElementoArchivado,
} from "../../../api/CentralArchive/ElementoController";

import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import ErrorMessage from "../../../components/ErrorMessage";
import Form from "./Form";
import { toast } from "react-toastify";
import ButtonBack from "../../../components/ButtonBack/ButtonBack";

const EditarElementoArchivado = () => {
  const { id } = useParams();
  const [elemento, setElemento] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [errorUpdate, setErrorUpdate] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setElemento(await getElementoArchivado(id));
    } catch (error) {
      setError(error.response.data);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (data) => {
    try {
      setLoadingUpdate(true);
      await updateElementoArchivado({ id, ...data });
      toast.success("!Elemento actualizado correctamente!");
    } catch (error) {
      setErrorUpdate(error.response.data);
    } finally {
      setLoadingUpdate(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <LoadingSpinner message="Cargando Elemento Archvivado..." />;
  if (error)
    return <ErrorMessage message={error?.message } />;

  return (
    <div>
      {errorUpdate && (
        <ErrorMessage message={errorUpdate?.message} />
      )}
      <ButtonBack />
      <Form
        onSubmit={handleSubmit}
        submitLabel="Actualizar Elemento"
        loading={loadingUpdate}
        initialData={{
          departamento_id: elemento?.departamento_id,
          clasificacion_id: elemento?.clasificacion_id,
          expediente_id: elemento?.expediente_id,
          contenedor_id: elemento?.contenedor_id,

          codigo: elemento?.codigo,
          titulo: elemento?.titulo,
          ejercicio_fiscal: elemento?.ejercicio_fiscal,
          soporte: elemento?.soporte,
          observacion: elemento?.observacion,
        }}
      />
    </div>
  );
};

export default EditarElementoArchivado;

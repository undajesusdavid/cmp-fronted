import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getElementoArchivado,
  updateElementoArchivado,
} from "../../../api/CentralArchive/ElementoController";

import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import ErrorMessage from "../../../components/ErrorMessage";
import Form from "./Form";
import { toast } from "react-toastify";
import ButtonBack from "../../../components/ButtonBack/ButtonBack";
import useAsync from "../../../custom_hooks/useAsync";

const EditarElementoArchivado = () => {
  const { id } = useParams();
  //const navigate = useNavigate();
  const {
    execute,
    data: elemento,
    loading,
    error,
  } = useAsync({
    asyncFunction: getElementoArchivado,
    defaultData: {},
    successFunction: (/*data*/) => {
      toast.info("Elemento Archivado cargado");
    },
  });

  const {
    execute: update,
    loading: loadingUpdate,
    error: errorUpdate,
  } = useAsync({
    asyncFunction: updateElementoArchivado,
    defaultData: {},
    successFunction: (/*data*/) => {
      toast.success("!Elemento actualizado correctamente!");
      //navigate("/archivo-central/elementos");
    },
  });

  useEffect(() => {
    execute(id);
  }, [id]);

  if (loading)
    return <LoadingSpinner message="Cargando Elemento Archvivado..." />;
  
  if (error) return <ErrorMessage message={error?.message} />;

  return (
    <div>
      {errorUpdate && <ErrorMessage message={errorUpdate?.message} />}
      <ButtonBack />
      <Form
        onSubmit={update}
        submitLabel="Actualizar Elemento"
        loading={loadingUpdate}
        initialData={{
          id: elemento?.id,
          departamento_id: elemento?.departamento_id,
          clasificacion_id: elemento?.clasificacion_id,
          expediente_id: elemento?.expediente_id,
          contenedor_id:
            Array.isArray(elemento?.contenedores) &&
            elemento.contenedores[0]?.id,

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

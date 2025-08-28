import { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  getClasificacion,
  updateClasificacion,
} from "../../../api/CentralArchive/ClasificacionController";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import ErrorMessage from "../../../components/ErrorMessage";
import Form from "./Form";
import { toast } from "react-toastify";
import ButtonBack from "../../../components/ButtonBack/ButtonBack";
import useAsync from "../../../custom_hooks/useAsync";

const EditarClasificacion = () => {
  const { id } = useParams();
  const {execute: update, loading: loadingUpdate, error: errorUpdate} = useAsync({
    asyncFunction: updateClasificacion,
    defaultData: {},
    successFunction: (data) => {
      toast.success("¡Clasificación registrada exitosamente!");
    }
  })

  const {execute, loading, error, data:clasificacion} = useAsync({
    asyncFunction: getClasificacion,
    defaultData: {},
    successFunction:  () => null,
  });

  useEffect(() => {
    execute(id);
  }, []);

  if (loading) return <LoadingSpinner message="Cargando Clasificación..." />;
  if (error)
    return <ErrorMessage error={error} message="ha ocurrido un error, al cargar los datos" />;

  return (
    <div>
      {errorUpdate && (
        <ErrorMessage message="Ha ocurrio un error, no se pudo aplicar el cambio." />
      )}
      
      <ButtonBack />
      <Form
        onSubmit={update}
        submitLabel="Actualizar Clasificacion"
        loading={loadingUpdate}
        initialData={{
          id: clasificacion?.id,
          departamento_id: clasificacion?.departamento_id,
          cod_serie: clasificacion?.cod_serie,
          cod_subserie: clasificacion?.cod_subserie,
          serie: clasificacion?.serie,
          subserie: clasificacion?.subserie,
        }}
      />
    </div>
  );
};

export default EditarClasificacion;

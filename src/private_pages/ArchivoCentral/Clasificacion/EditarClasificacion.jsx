import { useEffect, useState } from "react";
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
  const {execute} = useAsync({
    asyncFunction: updateClasificacion,
    defaultData: {},
    successFunction: (data) => {
      toast.success("¡Clasificación registrada exitosamente!");
    }
  })


  const [clasificacion, setClasificacion] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [errorUpdate, setErrorUpdate] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setClasificacion(await getClasificacion(id));
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (data) => {
    try {
      setLoadingUpdate(true);
      await updateClasificacion({ id, ...data });
      toast.success("¡Clasificación actualizada correctamente!");
    } catch (error) {
      setErrorUpdate(error);
    } finally {
      setLoadingUpdate(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <LoadingSpinner message="Cargando Clasificación..." />;
  if (error)
    return <ErrorMessage message="ha ocurrido un error, al cargar los datos" />;

  return (
    <div>
      {errorUpdate && (
        <ErrorMessage message="Ha ocurrio un error, no se pudo aplicar el cambio." />
      )}
      <ButtonBack />
      <Form
        onSubmit={handleSubmit}
        submitLabel="Actualizar Clasificacion"
        loading={loadingUpdate}
        initialData={{
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

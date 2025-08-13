import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getContenedor, updateContenedor } from "../../../api/CentralArchive/ContenedorController";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import ErrorMessage from "../../../components/ErrorMessage";
import Form from "./Form";
import { toast } from "react-toastify";
import ButtonBack from "../../../components/ButtonBack/ButtonBack";

const EditarContenedor = () => {
  const { id } = useParams();
  const [contenedor, setContenedor] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [errorUpdate, setErrorUpdate] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setContenedor(await getContenedor(id));
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (data) => {
    try {
      setLoadingUpdate(true)
      await updateContenedor({id, ...data});
      toast.success("¡Contenedor actualizado correctamente!");
    } catch (error) {
      setErrorUpdate(error)
    } finally {
      setLoadingUpdate(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <LoadingSpinner message="Cargando Contenedor..." />;
  if (error)
    return <ErrorMessage message="ha ocurrido un error, al cargar los datos" />;

  return (
    <di>
      {(errorUpdate) && <ErrorMessage message="Ha ocurrio un error, no se pudo aplicar el cambio." /> }
      <ButtonBack />
      <Form
        onSubmit={handleSubmit}
        submitLabel="Actualizar Contenedor"
        loading={loadingUpdate}
        initialData={{
          descripcion: contenedor?.descripcion,
          ubicacion: contenedor?.ubicacion,
          ejercicio: contenedor?.ejercicio,
          unidad_conservacion_id: contenedor?.unidad_conservacion_id,
          departamento_id: contenedor?.departamento_id,
        }}
      />
    </di>
  );
};

export default EditarContenedor;

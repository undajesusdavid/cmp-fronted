import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getContenedor,
  updateContenedor,
} from "../../../api/CentralArchive/ContenedorController";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import ErrorMessage from "../../../components/ErrorMessage";
import Form from "./Form";
import { toast } from "react-toastify";
import ButtonBack from "../../../components/ButtonBack/ButtonBack";
import useAsync from "../../../custom_hooks/useAsync";

const EditarContenedor = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    execute: handleSubmit,
    loading: loadingUpdate,
    error: errorUpdate,
  } = useAsync({
    asyncFunction: updateContenedor,
    defaultData: {},
    successFunction: (response) => {
      navigate("/archivo-central/contenedores");
      toast.success("¡Contenedor actualizado exitosamente!");
    },
  });

  const { execute:fetchData,  data:contenedor, loading, error } = useAsync({
    asyncFunction: getContenedor,
    defaultData: {}
  });

  useEffect(() => {
    fetchData(id);
  }, []);

  if (loading) return <LoadingSpinner message="Cargando Contenedor..." />;
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
        submitLabel="Actualizar Contenedor"
        loading={loadingUpdate}
        initialData={{
          id: contenedor?.id,
          descripcion: contenedor?.descripcion,
          ubicacion: contenedor?.ubicacion,
          ejercicio: contenedor?.ejercicio,
          unidad_conservacion_id: contenedor?.unidad_conservacion_id,
          departamento_id: contenedor?.departamento_id,
        }}
      />
    </div>
  );
};

export default EditarContenedor;

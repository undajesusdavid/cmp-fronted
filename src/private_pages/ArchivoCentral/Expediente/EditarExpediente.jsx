import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getExpediente,
  updateExpediente,
} from "../../../api/CentralArchive/ExpedienteController";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import ErrorMessage from "../../../components/ErrorMessage";
import Form from "./Form";
import { toast } from "react-toastify";
import ButtonBack from "../../../components/ButtonBack/ButtonBack";
import useAsync from "../../../custom_hooks/useAsync";

const EditarExpediente = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    execute: handleSubmit,
    loading: loadingUpdate,
    error: errorUpdate,
  } = useAsync({
    asyncFunction: updateExpediente,
    defaultData: {},
    successFunction: (response) => {
      //navigate("/archivo-central/expedientes");
      toast.success("¡Expediente actualizado correctamente!");
    },
  });

  const {
    execute: fetchData,
    data: expediente,
    loading,
    error,
  } = useAsync({
    asyncFunction: getExpediente,
    defaultData: {},
    successFunction: (exp) => {
      // toast.success(
      //   "Datos del expediente " + exp?.codigo + " cargados exitosamente"
      // );
    },
  });

  useEffect(() => {
    fetchData(id);
  }, []);

  if (loading) return <LoadingSpinner message="Cargando Expediente..." />;
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
        submitLabel="Actualizar Expediente"
        loading={loadingUpdate}
        initialData={{
          id: expediente?.id,
          departamento_id: expediente?.departamento_id,
          codigo: expediente?.codigo,
          ejercicio_fiscal: expediente?.ejercicio_fiscal,
          descripcion: expediente?.descripcion,
        }}
      />
    </div>
  );
};

export default EditarExpediente;

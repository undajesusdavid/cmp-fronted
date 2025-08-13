import React, { useEffect, useState } from "react";
import Fields from "./Fields";
import useForm from "./useForm";
import { getClasificaciones } from "../../../../api/CentralArchive/ClasificacionController";
import { toast } from "react-toastify";
import LoadingSpinner from "../../../../components/LoadingSpinner/LoadingSpinner";
import ErrorMessage from "../../../../components/ErrorMessage";

const Form = ({
  onSubmit,
  loading = false,
  error = null,
  initialData,
  submitLabel = "Registrar Elemento",
}) => {
  const { form, errors, handleChange, validate, resetForm } = useForm({
    initialData,
  });

  const [clasificaciones, setClasificaciones] = useState([]);
  const [loadingMetadata, setLoadingMetadata] = useState(false);
  const [errorMetadata, setErrorMetadata] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate() && onSubmit) {
      onSubmit(form);
      // resetForm(); // Descomenta si quieres limpiar el formulario tras registrar
    }
  };

  const loadMetadata = async () => {
    setLoadingMetadata(true);
    try {
      setClasificaciones(await getClasificaciones());
      setLoadingMetadata(false);
    } catch (error) {
      setErrorMetadata(error);
      toast.error("Ocurrio un error en la carga de los datos que usa el formulario");
    }finally {
      setLoadingMetadata(false);
    }
  };

  useEffect(() => {
    loadMetadata();
  }, []);


  return (
    <>
      {errorMetadata &&  <ErrorMessage message="Error del servidor, no se pudo obtener los datos" />}
      {loadingMetadata && <LoadingSpinner message="Cargando datos del formulario..." />}
      <Fields
        form={form}
        errors={errors}
        loading={loading}
        onChange={handleChange}
        onSubmit={handleSubmit}
        submitLabel={submitLabel}
        clasificaciones={clasificaciones} // Puedes pasar las clasificaciones si es necesario
      />
    </>
  );
};

export default Form;

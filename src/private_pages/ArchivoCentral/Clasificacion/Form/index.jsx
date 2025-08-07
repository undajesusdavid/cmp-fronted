import React, { useState, useEffect } from "react";

//Componentes del Formulario
import Fields from "./Fields";
import useFormClasificacion from "./useForm";
//Api
import { getDepartamentos } from "../../../../api/Departamentos/DepartamentosController";
//Componentes
import SubmitButton from "../../../../components/DefaultButton";
import LoadingSpinner from "../../../../components/LoadingSpinner/LoadingSpinner";
import ErrorMessage from "../../../../components/ErrorMessage";

const Form = ({
  onSubmit,
  loading = false,
  initialData,
  submitLabel = "Enviar Datos",
}) => {
  const [loadingMetadata, setLoadingMetadata] = useState(false);
  const [errorMetadata, setErrorMetadata] = useState(null);
  const [departamentos, setDepartamentos] = useState([]);

  // Funcion para cargar los datos para el formulario
  const onLoadMetadata = async () => {
    setLoadingMetadata(true);
    try {
      setDepartamentos(await getDepartamentos());
    } catch (error) {
      setErrorMetadata(error);
    } finally {
      setLoadingMetadata(false);
    }
  };

  useEffect(() => {
    onLoadMetadata();
  }, []);

  const { form, errors, handleChange, validate, resetForm } =
    useFormClasificacion({ initialData });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate() && onSubmit) {
      onSubmit(form);
      // resetForm(); // Descomenta si quieres limpiar el formulario tras registrar
    }
  };

  return (
    <>
      {errorMetadata && (
        <ErrorMessage message="Error del servidor, no se pudo obtener los datos" />
      )}
      {loadingMetadata && (
        <LoadingSpinner message="Cargando datos del formulario" />
      )}
      <Fields
        form={form}
        errors={errors}
        onChange={handleChange}
        onSubmit={handleSubmit}
        departamentos={departamentos}
      />

      <SubmitButton onClick={(e) => handleSubmit(e)} disabled={loading}>
        {loading ? "Enviando Datos..." : submitLabel || "Enviar"}
      </SubmitButton>
    </>
  );
};

export default Form;

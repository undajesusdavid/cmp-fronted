import React, { useEffect, useState } from "react";
import Fields from "./Fields";
import SubmitButton from "../../../../components/DefaultButton";
//import { toast } from "react-toastify";
import LoadingSpinner from "../../../../components/LoadingSpinner/LoadingSpinner";
import { getDepartamentos } from "../../../../api/Departamentos/DepartamentosController";
import { getUnidadesConservacion } from "../../../../api/CentralArchive/UnidadConservacionController";
import ErrorMessage from "../../../../components/ErrorMessage";
import useForm from "./useForm";

const Form = ({
  onSubmit,
  loading = false,
  initialData,
  submitLabel = "Formulario de Contenedor",
}) => {
  const { form, errors, handleChange, validate, resetForm } = useForm({
    initialData,
  });
  const [departamentos, setDepartamentos] = useState([]);
  const [unidadConservacion, setUnidadConservacion] = useState([]);
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
      setDepartamentos(await getDepartamentos());
      setUnidadConservacion(await getUnidadesConservacion());
    } catch (error) {
      setErrorMetadata(error);
    } finally {
      setLoadingMetadata(false);
    }
  };

  useEffect(() => {
    loadMetadata();
  }, []);

  return (
    <div>
      {errorMetadata && loadingMetadata === false && (
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
        unidad_conservacion={unidadConservacion}
      />

      <SubmitButton onClick={(e) => handleSubmit(e)} disabled={loading}>
        {loading ? "Enviando Datos..." : submitLabel || "Enviar"}
      </SubmitButton>
    </div>
  );
};

export default Form;

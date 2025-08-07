import React, { useEffect, useState } from "react";
import ContenedorFields from "./ContenedorFields";
import { toast } from "react-toastify";
import LoadingSpinner from "../../../../components/LoadingSpinner/LoadingSpinner";
import { getDepartamentos } from "../../../../api/Departamentos/DepartamentosController";
import { getUnidadesConservacion } from "../../../../api/CentralArchive/UnidadConservacion";
import ErrorMessage from "../../../../components/ErrorMessage/ErrorMessage";
import useFormContenedor from "./useFormContenedor";

const FormContenedor = ({
  onSubmit,
  loading = false,
  initialData,
  submitLabel = "Registrar Contenedor",
}) => {
  const { form, errors, handleChange, validate, resetForm } = useFormContenedor(
    { initialData }
  );
  const [departamentos, setDepartamentos] = useState([]);
  const [unidadConservacion, setUnidadConservacion] = useState([]);
  const [loadingMetadata, setLoadingMetadata] = useState(false);
  const [error, setError] = useState(null);

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
      setLoadingMetadata(false);
    } catch (error) {
      setError(error);
      toast.error(
        "Ocurrio un error en la carga de los datos que usa el formulario",
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );
    }
  };

  useEffect(() => {
    loadMetadata();
  }, []);

  if (error)
    return (
      <ErrorMessage message="Ocurrio un error en la carga de los datos que usa el formulario" />
    );
  if (loadingMetadata)
    return <LoadingSpinner message="Cargando datos de formulario" />;

  return (
    <ContenedorFields
      form={form}
      errors={errors}
      loading={loading}
      onChange={handleChange}
      onSubmit={handleSubmit}
      submitLabel={submitLabel}
      departamentos={departamentos}
      unidad_conservacion={unidadConservacion}
    />
  );
};

export default FormContenedor;

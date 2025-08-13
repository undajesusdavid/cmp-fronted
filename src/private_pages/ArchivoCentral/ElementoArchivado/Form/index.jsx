import React, { useEffect, useState } from "react";
import Fields from "./Fields";
import useForm from "./useForm";
import { getClasificaciones } from "../../../../api/CentralArchive/ClasificacionController";
import { getDepartamentos } from "../../../../api/Departamentos/DepartamentosController";
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
  const [clasificaciones, setClasificaciones] = useState([]);
  const [clasificacionesFilter, setClasificacionesFilter] = useState([]);
  const [departamentos, setDepartamentos] = useState([]);
  const [loadingMetadata, setLoadingMetadata] = useState(false);
  const [errorMetadata, setErrorMetadata] = useState(null);

  const FilterClasificaciones = (value) => {
    console.log(value)
    setClasificacionesFilter(
      clasificaciones.filter((i) => i.departamento_id == value)
    );

    console.log(clasificacionesFilter)
  };
  const { form, errors, handleChange, validate, resetForm } = useForm({
    initialData,
    changeDepartment: FilterClasificaciones,
  });

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
      const clasificaciones = await getClasificaciones();
      setClasificaciones(clasificaciones);
      setDepartamentos(await getDepartamentos());

      setLoadingMetadata(false);
    } catch (error) {
      setErrorMetadata(error);
      toast.error(
        "Ocurrio un error en la carga de los datos que usa el formulario"
      );
    } finally {
      setLoadingMetadata(false);
    }
  };

  useEffect(() => {
    loadMetadata();
  }, []);

  return (
    <>
      {errorMetadata && (
        <ErrorMessage message="Error del servidor, no se pudo obtener los datos" />
      )}
      {loadingMetadata && (
        <LoadingSpinner message="Cargando datos del formulario..." />
      )}
      <Fields
        form={form}
        errors={errors}
        loading={loading}
        onChange={handleChange}
        onSubmit={handleSubmit}
        submitLabel={submitLabel}
        clasificaciones={clasificacionesFilter} // Puedes pasar las clasificaciones si es necesario
        departamentos={departamentos}
      />
    </>
  );
};

export default Form;

import React, { useState, useEffect, use } from "react";
import FormClasificacionFields from "./Fields";
import useFormClasificacion from "./useFormClasificacion";
import { getDepartamentos } from "../../../../api/Departamentos/DepartamentosController";

const FormClasificacion = ({
  onSubmit,
  loading = false,
  initialData,
  submitLabel = "Formulario de Clasificación",
}) => {
  const [departamentos, setDepartamentos] = useState([]);

  const onLoadDepartamentos = async () => {
    const data = await getDepartamentos();
    setDepartamentos(data);
  };

  useEffect(() => {
    onLoadDepartamentos();
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
    <FormClasificacionFields
      form={form}
      errors={errors}
      departamentos={departamentos}
      loading={loading}
      onChange={handleChange}
      onSubmit={handleSubmit}
      submitLabel={submitLabel}
    />
  );
};

export default FormClasificacion;

import React, { useEffect, useState } from "react";
import Fields from "./Fields";
//import useForm from "./useForm";
import useForm from "../../../../custom_hooks/useForm";
import { getClasificaciones } from "../../../../api/CentralArchive/ClasificacionController";
import { getDepartamentos } from "../../../../api/Departamentos/DepartamentosController";
import LoadingSpinner from "../../../../components/LoadingSpinner/LoadingSpinner";
import ErrorMessage from "../../../../components/ErrorMessage";
import useAsync from "../../../../custom_hooks/useAsync";
import { initialStateForm, validationRules } from "./config";

const Form = ({
  onSubmit,
  loading = false,
  error = null,
  initialData = initialStateForm,
  submitLabel = "Registrar Elemento",
}) => {
  const clasificaciones = useAsync({
    asyncFunction: getClasificaciones,
    defaultData: [],
    autoRun: false,
  });
  const departamentos = useAsync({
    asyncFunction: getDepartamentos,
    defaultData: [],
    autoRun: true,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm() && onSubmit) {
      onSubmit(form);
      // resetForm(); // Descomenta si quieres limpiar el formulario tras registrar
    }
  };

  const handleEvents = {
    departamento_id: (event, { form, setForm }) => {
      const departamento_id = event.target.value;
      setForm({
        ...form,
        departamento_id,
        clasificacion_id: "",
      });
      if (departamento_id !== "") {
        clasificaciones.execute(departamento_id);
      } else {
        clasificaciones.reset();
      }
    },
  };

  const { form, errors, handleChange, validateForm } = useForm({
    initialForm: initialData,
    validationRules,
    handleEvents,
  });

  if (clasificaciones.error || departamentos.error) {
    return (
      <ErrorMessage error={clasificaciones.error || departamentos.error} />
    );
  }

  if (clasificaciones.loading || departamentos.loading) {
    return <LoadingSpinner message="Cargando datos del formulario..." />;
  }

  return (
    <>
      <Fields
        form={form}
        errors={errors}
        loading={loading}
        onChange={handleChange}
        onSubmit={handleSubmit}
        submitLabel={submitLabel}
        clasificaciones={clasificaciones.data || []} // Puedes pasar las clasificaciones si es necesario
        departamentos={departamentos?.data || []}
      />
    </>
  );
};

export default Form;

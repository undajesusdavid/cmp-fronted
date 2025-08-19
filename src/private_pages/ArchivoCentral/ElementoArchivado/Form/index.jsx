import Fields from "./Fields";

import LoadingSpinner from "../../../../components/LoadingSpinner/LoadingSpinner";
import ErrorMessage from "../../../../components/ErrorMessage";


import useForm from "../../../../custom_hooks/useForm";
import Events from "./Events";
import { initialStateForm, validationRules } from "./config";
import useMetadata from "./useMetadata";

const Form = ({ onSubmit, loading, initialData, submitLabel }) => {
  const metadata = useMetadata();
  const {departamentos, clasificaciones} = metadata;

  const { form, errors, handleChange, validateForm } = useForm({
    initialForm: initialData ?? initialStateForm,
    validationRules,
    handleEvents: {
      departamento_id: (event, context) => {
        Events.handleDepartamentoChange(event, context, metadata);
      },
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm() && onSubmit) {
      onSubmit(form);
      // resetForm(); // Descomenta si quieres limpiar el formulario tras registrar
    }
  };

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
        loading={loading || false}
        errors={errors}
        onChange={handleChange}
        onSubmit={handleSubmit}
        submitLabel={submitLabel || "Procesar"}
        clasificaciones={clasificaciones.data || []} // Puedes pasar las clasificaciones si es necesario
        departamentos={departamentos?.data || []}
      />
    </>
  );
};

export default Form;

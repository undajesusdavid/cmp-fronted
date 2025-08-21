import Fields from "./Fields";
import useForm from "../../../../custom_hooks/useForm";
import FormEvents from "./Events";
import useMetadata from "./useMetadata";
import { INITIAL_FORM, VALIDATION_RULES } from "./config";

const Form = ({ initialData, onSubmit, loading, submitLabel }) => {
  const metadata = useMetadata(initialData);

  const { form, errors, handleChange, validateForm, resetForm } = useForm({
    initialForm: initialData ?? INITIAL_FORM,
    validationRules: VALIDATION_RULES,
    metadata: metadata,
    handleEvents: FormEvents,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm() && onSubmit) {
      onSubmit(form);
      resetForm();
    }
  };

  return (
    <Fields
      form={form}
      loadingSubmit={loading || false}
      errorsValidation={errors}
      onChange={handleChange}
      onSubmit={handleSubmit}
      submitLabel={submitLabel || "Procesar"}
      metadata={metadata}
    />
  );
};

export default Form;

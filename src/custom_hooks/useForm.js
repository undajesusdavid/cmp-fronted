import { useState, useCallback } from "react";

const useForm = ({
  initialForm,
  handleEvents = {},
  validationRules = {},
}) => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      const newForm = {
        ...form,
        [name]: value,
      };
      setForm(newForm);

      // Ejecutar función específica si existe en handleEvents
      if (typeof handleEvents[name] === "function") {
        handleEvents[name](e, { form: newForm, setForm });
      }
    },
    [form, handleEvents]
  );

  const validateForm = useCallback(() => {
    const newErrors = {};
    let isValid = true;
    for (const name in validationRules) {
      const error = validationRules[name](form[name]);
      if (error) {
        newErrors[name] = error;
        isValid = false;
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [form, validationRules]);

  const resetForm = useCallback(() => {
    setForm(initialForm);
    setErrors({});
  }, [initialForm]);

  return {
    form,
    errors,
    handleChange,
    validateForm,
    resetForm,
    setForm,
    setErrors,
  };
};

export default useForm;

import { useState } from "react";

const initialState = {
  codigo: "",
  titulo: "",
  ejercicio_fiscal: "",
  soporte: "",
  observacion: "",
};

function useForm ({ initialData = initialState } = {}) {
  const [form, setForm] = useState(initialData);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    // Validaciones basadas en el modelo
    if (!form.titulo) newErrors.titulo = "El título es requerido";
    if (!form.ejercicio_fiscal) newErrors.ejercicio_fiscal = "El ejercicio fiscal es requerido";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setForm(initialData);
    setErrors({});
  };

  return {
    form,
    setForm,
    errors,
    setErrors,
    handleChange,
    validate,
    resetForm,
  };
}

export default useForm;

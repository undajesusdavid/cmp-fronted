import { useState } from "react";

const initialState = {
  departamento_id: "",
  codigo: "",
  ejercicio_fiscal: "",
  descripcion: "",
};

function useForm({ initialData = initialState } = {}) {
  const [form, setForm] = useState(initialData);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!form.departamento_id)
      newErrors.departamento_id = "El departamento es requerido";

    if (!form.codigo) newErrors.codigo = "El codigo de expediente es requerido";

    if (!form.ejercicio_fiscal)
      newErrors.ejercicio_fiscal = "El ejercicio fiscal es requerido";
    
    if (!form.descripcion)
      newErrors.descripcion = "La descripción es requerida";

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

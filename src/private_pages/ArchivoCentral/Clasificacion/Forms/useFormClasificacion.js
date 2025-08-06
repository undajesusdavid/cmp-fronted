import { useState } from "react";

const initialState = {
  cod_serie: "",
  cod_subserie: "",
  serie: "",
  subserie: "",
  departamento_id: "",
};

function useFormClasificacion({ initialData = initialState,} = {}) {
  const [form, setForm] = useState(initialData);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!form.cod_serie) newErrors.cod_serie = "Código de serie requerido";
    if (!form.cod_subserie)
      newErrors.cod_subserie = "Código de subserie requerido";
    if (!form.serie) newErrors.serie = "Serie requerida";
    if (!form.subserie) newErrors.subserie = "Subserie requerida";
    if (!form.departamento_id)
      newErrors.departamento_id = "Departamento requerido";
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


export default useFormClasificacion;
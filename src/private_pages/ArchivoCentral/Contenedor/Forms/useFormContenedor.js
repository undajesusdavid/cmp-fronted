import { useState } from "react";

const initialState = {
  descripcion: "",
  ubicacion: "",
  ejercicio: "",
  unidad_conservacion_id: "",
  departamento_id: "",
};

function useFormContenedor({ initialData = initialState,} = {}) {
  const [form, setForm] = useState(initialData);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!form.descripcion) newErrors.descripcion = "La descripcion es requerida";
    if (!form.ubicacion)
      newErrors.ubicacion = "La ubicación es requerida";
    if (!form.ejercicio) newErrors.ejercicio = "El ejercicio fiscal es requerido";
    if (!form.unidad_conservacion_id)
      newErrors.unidad_conservacion_id = "Unidad de conservación requerida";
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


export default useFormContenedor;
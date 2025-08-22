import { String } from "../../../../utils/rulesValidation";

export const INITIAL_FORM = {
  descripcion: "",
  ubicacion: "",
  ejercicio: "",
  unidad_conservacion_id: "",
  departamento_id: "",
};

export const VALIDATION_RULES = {
  departamento_id: (value) => null,//String.required(value, "Departamento"),
  unidad_conservacion_id: (value) =>
    null, //String.required(value, "Unidad de Conservación"),
  descripcion: (value) => String.required(value, "Descripción"),
  ubicacion: (value) => String.required(value, "Ubicación"),
  ejercicio: (value) => String.required(value, "Ejercicio Fiscal"),
};

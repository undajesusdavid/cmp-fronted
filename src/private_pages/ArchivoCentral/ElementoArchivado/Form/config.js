import { String } from "../../../../utils/rulesValidation";

export const initialStateForm = {
  codigo: "",
  titulo: "",
  ejercicio_fiscal: "",
  soporte: "",
  observacion: "",
  clasificacion_id: "",
  departamento_id: "",
};

export const validationRules = {
  codigo: (value) => String.required(value, "Codigo"),
  titulo: (value) => String.required(value, "Titulo"),
  ejercicio_fiscal: (value) => String.required(value, "Ejercicio Fiscal"),
  soporte: (value) => String.required(value, "Soporte"),
  observacion: (value) => String.required(value, "Observación"),
  clasificacion_id: (value) => String.required(value, "clasificación"),
  departamento_id: (value) => String.required(value, "departamento"),
};





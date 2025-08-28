import { String, Number } from "../../../../utils/rulesValidation";

export const INITIAL_FORM = {
  codigo: "",
  titulo: "",
  ejercicio_fiscal: "",
  soporte: "",
  observacion: "",
  clasificacion_id: "",
  departamento_id: "",
  expediente_id: "",
  contenedor_id: "",
};

export const VALIDATION_RULES = {
  codigo: (value) => String.required(value, "Codigo"),
  titulo: (value) => String.required(value, "Titulo"),
  ejercicio_fiscal: (value) => String.required(value, "Ejercicio Fiscal"),
  soporte: (value) => String.required(value, "Soporte"),
  observacion: (value) => String.required(value, "Observación"),
  clasificacion_id: (value) => Number.required(value, "clasificación"),
  departamento_id: (value) => Number.required(value, "departamento"),
  expediente_id: (value) => null,
  contenedor_id: (value) => null,
};

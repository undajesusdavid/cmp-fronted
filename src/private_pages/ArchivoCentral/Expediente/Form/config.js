import { String } from "../../../../utils/rulesValidation";

export const INITIAL_FORM = {
  departamento_id: "",
  codigo: "",
  ejercicio_fiscal: "",
  descripcion: "",
};

export const VALIDATION_RULES = {
  departamento_id: (value) => null,
  codigo: (value) => String.required(value, "Codigo"),
  ejercicio_fiscal: (value) => String.required(value, "Ejercicio Fiscal"),
  descripcion: (value) => String.required(value, "Descripción"),
};

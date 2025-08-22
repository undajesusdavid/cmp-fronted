import { String } from "../../../../utils/rulesValidation";

export const INITIAL_FORM = {
  cod_serie: "",
  cod_subserie: "",
  serie: "",
  subserie: "",
  departamento_id: "",
};

export const VALIDATION_RULES = {
  cod_serie: (value) => String.required(value,"Codigo de Serie"),
  cod_subserie: (value) => String.required(value,"Codigo de Subserie"),
  serie: (value) => String.required(value,"Serie"),
  subserie: (value) => String.required(value,"Subserie"),
  departamento_id: (value) => null,
};

export const searchKeys = [
  "cod_serie",
  "cod_subserie",
  "serie",
  "subserie",
  "departamento_nombre",
];

export const dataColumns = [
  {
    key: "departamento_nombre",
    header: "Departamento",
    align: "center",
    render: (row) => row.departamento.nomenclatura || "N/A",
  },
  { key: "cod_serie", header: "Código Serie", align: "center" },
  { key: "cod_subserie", header: "Código Subserie", align: "center" },
  { key: "serie", header: "Serie", align: "center" },
  { key: "subserie", header: "Subserie", align: "center" },
];

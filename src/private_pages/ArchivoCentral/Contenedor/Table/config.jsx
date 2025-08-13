export const searchKeys = [];

export const dataColumns = [
  {
    key: "departamento",
    header: "Departamento",
    align: "center",
    render: (row) => row?.departamento.nombre,
  },
  {
    key: "unidad_conservacion",
    header: "Unidad de Conservación",
    align: "center",
    render: (row) => row?.unidad_conservacion.nombre,
  },
  { key: "ejercicio", header: "Ejercicio Fiscal", align: "center" },
  { key: "ubicacion", header: "Ubicación", align: "center" },
  { key: "descripcion", header: "Descripción", align: "center" },
];

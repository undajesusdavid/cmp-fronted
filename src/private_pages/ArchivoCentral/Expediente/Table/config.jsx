export const searchKeys = [];

export const dataColumns = [
  {
    key: "departamento",
    header: "Departamento",
    align: "center",
    render: (row) => row?.departamento.nombre,
  },
  { key: "codigo", header: "Codigo", align: "center" },
  { key: "descripcion", header: "Descripcion", align: "center" },
  { key: "ejercicio_fiscal", header: "Ejercicio Fiscal", align: "center" },
  {
    key: "piezas",
    header: "Piezas",
    align: "center",
    render: (row) => row?.elementos.length,
  },
];

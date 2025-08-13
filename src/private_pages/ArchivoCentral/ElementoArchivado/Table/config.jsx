export const searchKeys = ["clasificacion", "titulo", "codigo", "ubicacion"];

export const dataColumns = [
  {
    key: "clasificacion",
    header: "Clasificación",
    align: "center",
    render: (row) =>
      (
        <div>
          <p style={{ fontWeight: "bold" }}>{row?.clasificacion?.serie}</p>
          <p>{row?.clasificacion?.subserie}</p>
        </div>
      ) || "No disponible",
  },
  {
    key: "codigo",
    header: "Codigo Arch.",
    align: "center",
    render: (row) => row?.codigo || "Sin condigo",
  },
  {
    key: "titulo",
    header: "Descripción ",
    align: "center",
    render: (row) =>
      (
        <div
          style={{
            textTransform: "uppercase",
            wordBreak: "break-word",
            whiteSpace: "normal",
            width: "100%",
            overflowWrap: "break-word",
          }}
        >
          {row?.titulo}
        </div>
      ) || "No disponible",
  },
  {
    key: "ejercicio_fiscal",
    header: "Ejericio Fiscal",
    align: "center",
  },
];

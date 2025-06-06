
export const formatFecha = (dateString) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  return date.toLocaleString("es-Ve", {
    year: "numeric",
    month: "long", // 'long' para el nombre completo del mes (e.g., "diciembre")
    day: "numeric",
    timeZone: "UTC",
  });
};

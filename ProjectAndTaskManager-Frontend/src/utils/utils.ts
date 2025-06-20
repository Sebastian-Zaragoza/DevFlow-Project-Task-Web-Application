export function formatDate(isoString: string): string {
  const date = new Date(isoString);
  const format = new Intl.DateTimeFormat("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return format.format(date);
}

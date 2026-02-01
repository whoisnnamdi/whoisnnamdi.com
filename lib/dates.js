export function formatDate(dateString, format = "short") {
  if (!dateString) return null;

  const date = new Date(dateString);

  const formats = {
    short: { year: "numeric", month: "short", day: "numeric" },
    long: { year: "numeric", month: "long", day: "numeric" },
    upper: { month: "short", day: "2-digit", year: "numeric" },
  };

  const formatted = new Intl.DateTimeFormat(
    "default",
    formats[format] || formats.short
  ).format(date);

  return format === "upper" ? formatted.toUpperCase() : formatted;
}

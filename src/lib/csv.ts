type CsvValue = string | number | boolean | null | undefined;

export type CsvRow = Record<string, CsvValue>;

const escapeCsvValue = (value: CsvValue) => {
  const text = value == null ? "" : String(value);
  return `"${text.replace(/"/g, '""')}"`;
};

export function downloadCsv(rows: CsvRow[], filename: string) {
  const headers = rows[0] ? Object.keys(rows[0]) : [];
  const lines = [
    headers.map(escapeCsvValue).join(";"),
    ...rows.map((row) => headers.map((header) => escapeCsvValue(row[header])).join(";")),
  ];

  const blob = new Blob([`\uFEFF${lines.join("\r\n")}`], {
    type: "text/csv;charset=utf-8;",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

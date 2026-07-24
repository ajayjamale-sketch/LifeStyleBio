export const exportToCSV = <T extends Record<string, unknown>>(
  data: T[],
  filename: string,
  headers?: { key: keyof T; label: string }[]
): void => {
  if (!data || data.length === 0) {
    console.warn('No data to export');
    return;
  }

  const keys = headers ? headers.map(h => h.key) : (Object.keys(data[0]) as (keyof T)[]);
  const labels = headers ? headers.map(h => h.label) : keys.map(k => String(k));

  const headerRow = labels.join(',');
  const rows = data.map(row =>
    keys.map(key => {
      const val = row[key];
      const str = val === null || val === undefined ? '' : String(val);
      // Escape commas and quotes
      if (str.includes(',') || str.includes('"') || str.includes('\n')) {
        return `"${str.replace(/"/g, '""')}"`;
      }
      return str;
    }).join(',')
  );

  const csvContent = [headerRow, ...rows].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = `${filename}_${new Date().toISOString().split('T')[0]}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

import { APP_NAME } from '@/constants/appConstants';

export const exportToPDF = (
  title: string,
  content: string,
  filename: string
): void => {
  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    console.error('Could not open print window');
    return;
  }

  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${title} - ${APP_NAME}</title>
      <style>
        body {
          font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
          margin: 40px;
          color: #1a1a1a;
          line-height: 1.6;
        }
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 3px solid #10B981;
          padding-bottom: 20px;
          margin-bottom: 30px;
        }
        .logo-text {
          font-size: 24px;
          font-weight: 700;
          color: #10B981;
        }
        .title {
          font-size: 22px;
          font-weight: 600;
          color: #111827;
          margin-bottom: 5px;
        }
        .date {
          color: #6B7280;
          font-size: 13px;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 20px;
          font-size: 14px;
        }
        th {
          background: #f0fdf4;
          color: #065F46;
          padding: 12px 16px;
          text-align: left;
          font-weight: 600;
          border-bottom: 2px solid #10B981;
        }
        td {
          padding: 10px 16px;
          border-bottom: 1px solid #E5E7EB;
        }
        tr:hover td {
          background: #F9FAFB;
        }
        .footer {
          margin-top: 40px;
          text-align: center;
          color: #9CA3AF;
          font-size: 12px;
          border-top: 1px solid #E5E7EB;
          padding-top: 20px;
        }
        @media print {
          body { margin: 20px; }
          .no-print { display: none; }
        }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="logo-text">${APP_NAME}</div>
        <div>
          <div class="title">${title}</div>
          <div class="date">Generated: ${new Date().toLocaleDateString('en-US', { dateStyle: 'full' })}</div>
        </div>
      </div>
      ${content}
      <div class="footer">
        <p>${APP_NAME} – Live Healthy. Live Better. Live Longer. | Confidential Report</p>
      </div>
      <script>
        window.onload = function() {
          window.print();
          setTimeout(() => window.close(), 1000);
        };
      </script>
    </body>
    </html>
  `;

  printWindow.document.write(htmlContent);
  printWindow.document.close();

  // Store filename for reference
  console.log(`Exporting PDF: ${filename}_${new Date().toISOString().split('T')[0]}.pdf`);
};

export const tableToHTML = <T extends Record<string, unknown>>(
  data: T[],
  headers: { key: keyof T; label: string }[]
): string => {
  if (!data.length) return '<p>No data available</p>';

  const headerHTML = headers.map(h => `<th>${h.label}</th>`).join('');
  const rowsHTML = data.map(row => {
    const cells = headers.map(h => {
      const val = row[h.key];
      return `<td>${val === null || val === undefined ? '-' : String(val)}</td>`;
    }).join('');
    return `<tr>${cells}</tr>`;
  }).join('');

  return `<table><thead><tr>${headerHTML}</tr></thead><tbody>${rowsHTML}</tbody></table>`;
};

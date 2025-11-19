export default function DatasetSeriesTable({ dataset }) {
  const input = dataset?.input || [];

  return (
    <>
      <style>{`
        .table-container {
          width: 100%;
          overflow-x: auto;
          margin: 20px 0;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .data-table {
          width: 100%;
          border-collapse: collapse;
          background: white;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

       .data-table {
          width: 100%;
          border-collapse: collapse;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
        }

        .data-table thead {
          background: linear-gradient(135deg, #ff7575 0%, #ff0c0c 100%);
        }

        .data-table th {
          padding: 12px 16px;
          text-align: center;
          vertical-align: middle;
          font-weight: 600;
          font-size: 18px;
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.2);
          white-space: nowrap;
        }

        .data-table td {
          text-align: center;
          vertical-align: middle; 
          padding: 10px 12px;
          border: 1px solid #e5e7eb;
          color: #374151;
          font-size: 15px;
        }

        .data-table th:first-child {
          width: 50px;
          text-align: center;
        }

        .data-table tbody tr {
          transition: background-color 0.2s ease;
        }

        .data-table tbody tr:nth-child(even) {
          background-color: #f8f9fa;
        }

        .data-table tbody tr:hover {
          background-color: #e9ecef;
        }

        .data-table td {
          padding: 12px 16px;
          border: 1px solid #dee2e6;
          font-size: 17px;
          color: #495057;
        }

        .data-table td:first-child {
          text-align: center;
          font-weight: 500;
        }

        .empty-state {
          text-align: center;
          color: #6c757d;
          font-style: italic;
          padding: 24px;
        }

        .year-header {
          text-align: center;
          background: rgba(255, 255, 255, 0.1);
        }

        .number-cell {
          text-align: right;
          font-variant-numeric: tabular-nums;
        }

        @media (max-width: 768px) {
          .data-table th,
          .data-table td {
            padding: 8px 12px;
            font-size: 13px;
          }
        }
      `}</style>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th rowSpan="2">No</th>
              <th rowSpan="2">Kode</th>
              <th rowSpan="2">Wilayah</th>
              <th rowSpan="2">Komponen</th>
              <th colSpan={input.length || 1} className="year-header">
                Tahun
              </th>
            </tr>
            <tr>
              {input.length > 0 ? (
                input.map((item, i) => (
                  <th key={i} className="year-header">
                    {item.tahun}
                  </th>
                ))
              ) : (
                <th className="year-header">-</th>
              )}
            </tr>
          </thead>
          <tbody>
            {input.length > 0 ? (
              <tr>
                <td>1</td>
                <td>{dataset.kode_dssd || '-'}</td>
                <td>Lampung Timur</td>
                <td>{dataset.kategori_string || '-'}</td>
                {input.map((item, i) => (
                  <td key={i} className="number-cell">
                    {item.jumlah?.toLocaleString('id-ID') || '-'}
                  </td>
                ))}
              </tr>
            ) : (
              <tr>
                <td colSpan="4" className="empty-state">
                  Tidak ada data tersedia
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
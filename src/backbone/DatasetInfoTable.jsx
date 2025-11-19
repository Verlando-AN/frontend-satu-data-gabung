export default function DatasetInfoTable({ dataset }) {
  return (
    <>
      <style>{`
        .info-table-wrapper {
          width: 100%;
          overflow-x: auto;
          margin: 20px 0;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          background: white;
        }

        .info-table {
          width: 100%;
          border-collapse: collapse;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .info-table tbody tr {
          border-bottom: 1px solid #e9ecef;
          transition: all 0.2s ease;
        }

        .info-table tbody tr:last-child {
          border-bottom: none;
        }

        .info-table tbody tr:hover {
          background: linear-gradient(90deg, #f8f9ff 0%, #ffffff 100%);
          transform: translateX(2px);
        }

        .info-label {
          width: 200px;
          padding: 16px 20px;
          font-weight: 600;
          font-size: 14px;
          color: #495057;
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
          border-right: 3px solid #ea6666ff;
          vertical-align: top;
        }

        .info-value {
          padding: 16px 20px;
          font-size: 14px;
          color: #212529;
          line-height: 1.6;
        }

        .info-value:empty::before {
          content: '-';
          color: #adb5bd;
          font-style: italic;
        }

        .highlight-row {
          position: relative;
        }

        .highlight-row::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 4px;
          background: linear-gradient(180deg, #ea6666ff 0%, #a24b4bff 100%);
          opacity: 0;
          transition: opacity 0.2s ease;
        }

        .info-table tbody tr:hover::before {
          opacity: 1;
        }

        @media (max-width: 768px) {
          .info-table tbody tr {
            display: flex;
            flex-direction: column;
          }

          .info-label {
            width: 100%;
            border-right: none;
            border-bottom: 2px solid #667eea;
            border-radius: 0;
          }

          .info-value {
            width: 100%;
          }

          .info-table tbody tr:hover {
            transform: none;
          }
        }

        @media (min-width: 769px) {
          .info-label {
            min-width: 200px;
            max-width: 250px;
          }
        }
      `}</style>

      <div className="info-table-wrapper">
        <table className="info-table">
          <tbody>
            <tr className="highlight-row">
              <td className="info-label">Nama OPD</td>
              <td className="info-value">{dataset.nama_opd || '-'}</td>
            </tr>
            <tr className="highlight-row">
              <td className="info-label">Judul Dataset</td>
              <td className="info-value">{dataset.title || '-'}</td>
            </tr>
            <tr className="highlight-row">
              <td className="info-label">Deskripsi</td>
              <td className="info-value">{dataset.description || '-'}</td>
            </tr>
            <tr className="highlight-row">
              <td className="info-label">Jenis Data</td>
              <td className="info-value">{dataset.jenis_string || '-'}</td>
            </tr>
            <tr className="highlight-row">
              <td className="info-label">Kategori Data</td>
              <td className="info-value">{dataset.kategori_string || '-'}</td>
            </tr>
            <tr className="highlight-row">
              <td className="info-label">Kode DSSD</td>
              <td className="info-value">{dataset.kode_dssd || '-'}</td>
            </tr>
            <tr className="highlight-row">
              <td className="info-label">Uraian DSSD</td>
              <td className="info-value">{dataset.uraian_dssd || '-'}</td>
            </tr>
            <tr className="highlight-row">
              <td className="info-label">Satuan</td>
              <td className="info-value">{dataset.satuan || '-'}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

import { type ChangeEvent, type JSX } from "react";
import { useUrusan } from "@/hooks/useUrusan";
import "@/css/urusan.css";
import Head from "@/backbone/Header";
import Foot from "@/backbone/Footer";

export default function Urusan(): JSX.Element {
  const {
    urusanList,
    selectedOPD,
    dariTahun,
    sampaiTahun,
    dataSektoral,
    tahunList,
    loading,
    pagination,
    setSelectedOPD,
    setDariTahun,
    setSampaiTahun,
    fetchData,
    handlePrev,
    handleNext,
  } = useUrusan() 

  return (
    <>
      <Head />
      <div className="urusan-container">
        <h2 className="urusan-title">
          Data Sektoral Berdasarkan Urusan
        </h2>

        <div className="urusan-card filter-card">
          <div className="form-row">
            <div className="form-col form-col-6">
              <label className="form-label">
                Urusan Bidang
              </label>
              <select
                className="form-select"
                value={selectedOPD}
                onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                  setSelectedOPD(e.target.value)
                }
              >
                <option value="">Pilih Urusan</option>
                {urusanList.map((item) => (
                  <option key={item.kode_urusan} value={item.kode_urusan}>
                    {item.nama_urusan}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-col form-col-3">
              <label className="form-label">Dari Tahun</label>
              <input
                type="text"
                className="form-control"
                value={dariTahun}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setDariTahun(e.target.value)}
                placeholder="Dari Tahun"
              />
            </div>

            <div className="form-col form-col-3">
              <label className="form-label">Sampai Tahun</label>
              <input
                type="text"
                className="form-control"
                value={sampaiTahun}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setSampaiTahun(e.target.value)}
                placeholder="Sampai Tahun"
              />
            </div>
          </div>

          <button
            className="btn btn-primary"
            onClick={() => fetchData(1)}
            disabled={loading}
          >
            {loading ? "Memuat..." : "Tampilkan Sekarang"}
          </button>
        </div>

        <div className="urusan-card table-card">
          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Kode DSSD</th>
                  <th>Uraian DSSD</th>
                  <th>Satuan</th>
                  {tahunList.map((th) => (
                    <th key={th}>{th}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={4 + tahunList.length} className="text-center loading-cell">
                      Sedang memuat data...
                    </td>
                  </tr>
                ) : dataSektoral.length > 0 ? (
                  dataSektoral.map((item, index) => (
                    <tr key={item.id || index}>
                      <td>{(pagination.current - 1) * pagination.perPage + index + 1}</td>
                      <td>{item.kode_dssd}</td>
                      <td>{item.uraian_dssd}</td>
                      <td>{item.satuan}</td>
                      {tahunList.map((th) => {
                        const found = item.input?.find((i) => i.tahun === th)?.jumlah ?? 0;
                        return <td key={th}>{found}</td>;
                      })}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4 + tahunList.length} className="text-center empty-cell">
                      Tidak ada data yang ditemukan.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {pagination.total > 1 && (
            <div className="pagination-wrapper">
              <button
                className="btn btn-pagination"
                onClick={handlePrev}
                disabled={pagination.current === 1}
              >
                Previous
              </button>

              <span className="pagination-info">
                Page {pagination.current} of {pagination.total}
              </span>

              <button
                className="btn btn-pagination"
                onClick={handleNext}
                disabled={pagination.current === pagination.total}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
      <Foot />
    </>
  );
}

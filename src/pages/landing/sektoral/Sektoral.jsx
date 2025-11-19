import React from "react";
import useSektoral from "@/hooks/useSektoral.js";
import "@/css/sektoral.css";
import Head from "@/backbone/Header.jsx";
import Foot from "@/backbone/Footer.jsx";

export default function Sektoral() {
  const {
    opdList,
    selectedOPD,
    setSelectedOPD,
    dariTahun,
    setDariTahun,
    sampaiTahun,
    setSampaiTahun,
    dataSektoral,
    tahunList,
    loading,
    currentPage,
    totalPages,
    handleTampilkan,
    handlePrev,
    handleNext,
    perPage,
  } = useSektoral();

  return (
    <>
    <Head />
    <div className="sektoral-container">
      <h2 className="sektoral-title">
        Data Sektoral Berdasarkan OPD
      </h2>

      <div className="sektoral-card filter-card">
        <div className="form-row">
          <div className="form-col form-col-6">
            <label className="form-label">Perangkat Daerah</label>
            <select
              className="form-select"
              value={selectedOPD}
              onChange={(e) => setSelectedOPD(e.target.value)}
            >
              <option value="">Pilih OPD</option>
              {opdList.map((opd) => (
                <option key={opd.id_opd} value={opd.id_opd}>
                  {opd.nama_opd}
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
              onChange={(e) => setDariTahun(e.target.value)}
            />
          </div>

          <div className="form-col form-col-3">
            <label className="form-label">Sampai Tahun</label>
            <input
              type="text"
              className="form-control"
              value={sampaiTahun}
              onChange={(e) => setSampaiTahun(e.target.value)}
            />
          </div>
        </div>

        <button
          className="btn btn-primary"
          onClick={handleTampilkan}
          disabled={loading}
        >
          {loading ? "Memuat..." : "Tampilkan Sekarang"}
        </button>
      </div>

      <div className="sektoral-card table-card">
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
                  <tr key={item.id}>
                    <td>{(currentPage - 1) * perPage + index + 1}</td>
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

        {totalPages > 1 && (
          <div className="pagination-wrapper">
            <button
              className="btn btn-pagination"
              onClick={handlePrev}
              disabled={currentPage === 1}
            >
              Previous
            </button>

            <span className="pagination-info">
              Page {currentPage} of {totalPages}
            </span>

            <button
              className="btn btn-pagination"
              onClick={handleNext}
              disabled={currentPage === totalPages}
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
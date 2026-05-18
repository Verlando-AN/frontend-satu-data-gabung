import Foot from "@/backbone/Footer";
import Head from "@/backbone/Header";
import "@/css/sektoral.css";
import useSektoral from "@/hooks/useSektoral";
import type { ChangeEvent, JSX } from "react";

export default function Sektoral(): JSX.Element {
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
    handleReset,
    handlePrev,
    handleNext,
    perPage,
  } = useSektoral();

  const tahunOptions = Array.from(
    { length: 21 },
    (_, index) => 2015 + index
  );

  return (
    <>
      <Head />

      <div className="sektoral-container">
        <h2 className="sektoral-title">
          E-walidata Berdasarkan OPD
        </h2>

        <div className="sektoral-card filter-card">
          <div className="form-row">
            <div className="form-col form-col-6">
              <label className="form-label">
                Perangkat Daerah
              </label>

              <select
                className="form-select"
                value={selectedOPD}
                onChange={(
                  e: ChangeEvent<HTMLSelectElement>
                ) => setSelectedOPD(e.target.value)}
              >
                {opdList.map(
                  (opd: any, index: number) => (
                    <option
                      key={`${opd.id_user_opd}-${index}`}
                      value={opd.id_user_opd}
                    >
                      {opd.nama_opd}
                    </option>
                  )
                )}
              </select>
            </div>

            <div className="form-col form-col-3">
              <label className="form-label">
                Dari Tahun
              </label>

              <select
                className="form-select"
                value={dariTahun}
                onChange={(
                  e: ChangeEvent<HTMLSelectElement>
                ) =>
                  setDariTahun(e.target.value)
                }
              >
                <option value="">
                  Pilih Tahun
                </option>

                {tahunOptions.map((tahun) => (
                  <option
                    key={tahun}
                    value={tahun}
                  >
                    {tahun}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-col form-col-3">
              <label className="form-label">
                Sampai Tahun
              </label>

              <select
                className="form-select"
                value={sampaiTahun}
                onChange={(
                  e: ChangeEvent<HTMLSelectElement>
                ) =>
                  setSampaiTahun(e.target.value)
                }
              >
                <option value="">
                  Pilih Tahun
                </option>

                {tahunOptions.map((tahun) => (
                  <option
                    key={tahun}
                    value={tahun}
                  >
                    {tahun}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="button-group">
            <button
              className="btn btn-primary"
              onClick={handleTampilkan}
              disabled={loading}
            >
              {loading
                ? "Memuat..."
                : "Tampilkan Sekarang"}
            </button>

            <button
              className="btn btn-secondary"
              onClick={handleReset}
              disabled={loading}
            >
              Reset
            </button>
          </div>
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
                    <td
                      colSpan={
                        4 + tahunList.length
                      }
                      className="text-center loading-cell"
                    >
                      Sedang memuat data...
                    </td>
                  </tr>
                ) : dataSektoral.length > 0 ? (
                  dataSektoral.map(
                    (item, index) => (
                      <tr key={item.id}>
                        <td>
                          {(currentPage - 1) *
                            perPage +
                            index +
                            1}
                        </td>

                        <td>
                          {item.kode_dssd}
                        </td>

                        <td>
                          {item.uraian_dssd}
                        </td>

                        <td>{item.satuan}</td>

                        {tahunList.map((th) => {
                          const found =
                            item.input?.find(
                              (i: any) =>
                                i.tahun === th
                            )?.jumlah ?? 0;

                          return (
                            <td key={th}>
                              {Number(
                                found
                              ).toLocaleString(
                                "id-ID"
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    )
                  )
                ) : (
                  <tr>
                    <td
                      colSpan={
                        4 + tahunList.length
                      }
                      className="text-center empty-cell"
                    >
                      Tidak ada data yang
                      ditemukan.
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
                Page {currentPage} of{" "}
                {totalPages}
              </span>

              <button
                className="btn btn-pagination"
                onClick={handleNext}
                disabled={
                  currentPage === totalPages
                }
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
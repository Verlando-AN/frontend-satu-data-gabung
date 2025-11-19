import { Link } from "react-router-dom";
import icon from "../../../assets/dataseticon.png";
import useDataset from "../../../hooks/useDataset.js";
import "@/css/dataset.css";
import Head from "@/backbone/Header.jsx";
import Foot from "@/backbone/Footer.jsx";

export default function DatasetLanding() {
  const {
    produsenSearch,
    setProdusenSearch,
    datasetSearch,
    setDatasetSearch,
    filteredProdusen,
    filteredDatasets,
    selectedProdusen,
    setSelectedProdusen,
    fetchDatasets,
    handlePrev,
    handleNext,
    currentPage,
    totalPages,
    totalDatasets,
  } = useDataset();

  const categories = [
    { name: "Sarana & Infrastruktur", count: 0 },
    { name: "Ekonomi & Pembangunan", count: 0 },
    { name: "Sosial & Kesejahteraan Masyarakat", count: 0 },
    { name: "Kebijakan & Legislasi", count: 0 },
  ];

  return (
    <>
    <Head />
    <div className="dataset-wrapper">
      <div className="dataset-container">
        <div className="dataset-header">
          <h5 className="dataset-title">Dataset</h5>
          <p className="dataset-description">
            Temukan kumpulan data-data mentah berupa tabel yang bisa diolah lebih lanjut di sini. Open Data menyediakan akses ke beragam koleksi dataset dari seluruh Organisasi Perangkat Daerah di Lampung Timur.
          </p>
        </div>

        <div className="dataset-row">
          <div className="dataset-sidebar">
            <div className="sidebar-card">
              <h6 className="sidebar-title">Produsen Dataset</h6>

              <input
                type="text"
                className="search-input-produsen"
                placeholder="Cari Produsen"
                value={produsenSearch}
                onChange={(e) => setProdusenSearch(e.target.value)}
              />

              <div className="produsen-list">
                {filteredProdusen.length > 0 ? (
                  filteredProdusen.map((opd) => (
                    <button
                      key={opd.id_opd}
                      className={`produsen-btn ${
                        selectedProdusen === opd.id_opd ? "produsen-btn-active" : ""
                      }`}
                      onClick={() => {
                        setSelectedProdusen(opd.id_opd);
                        fetchDatasets(1, opd.id_opd);
                      }}
                    >
                      {opd.nama_opd}
                    </button>
                  ))
                ) : (
                  <p className="not-found-text">Tidak ditemukan</p>
                )}
              </div>
            </div>

            <div className="sidebar-card">
              <h6 className="sidebar-title">Kategori Data Sektoral</h6>
              <div className="category-list">
                {categories.map((category, index) => (
                  <a
                    key={index}
                    href="#"
                    className="category-item"
                  >
                    <span>{category.name}</span>
                    <span className="category-badge">{category.count}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="dataset-main">
            <div className="search-card-dataset">
              <div className="search-row-dataset">
                <div className="search-col-dataset">
                  <label className="search-label-dataset">List Dataset</label>
                  <input
                    type="text"
                    className="search-input-produsen"
                    placeholder="Cari Dataset"
                    value={datasetSearch}
                    onChange={(e) => setDatasetSearch(e.target.value)}
                  />
                </div>
                <div className="dataset-count">
                  <span>
                    <strong>{totalDatasets}</strong> Dataset
                  </span>
                </div>
              </div>
            </div>

            <div className="dataset-list">
              {filteredDatasets.length > 0 ? (
                filteredDatasets.map((dataset) => (
                  <div key={dataset.id} className="dataset-item">
                    <div className="dataset-content">
                      <img
                        src={icon}
                        alt="Data Portal Illustration"
                        className="dataset-icon"
                      />
                      <div className="dataset-info">
                        <h6 className="dataset-item-title">
                          <Link
                            to={`/dataset-detail-landing/${dataset.id}`}
                            className="dataset-link"
                          >
                            {dataset.title}
                          </Link>
                        </h6>
                        {dataset.description && (
                          <p className="dataset-item-description">
                            {dataset.description}
                          </p>
                        )}
                        <div className="dataset-meta">
                          <span>🏢 {dataset.producer}</span>
                          <span>📅 {dataset.date}</span>
                          <span>🕐 {dataset.daysAgo} hari lalu</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="empty-state">Tidak ada dataset ditemukan.</p>
              )}
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
      </div>
    </div>
      <Foot />
    </>
  );
}
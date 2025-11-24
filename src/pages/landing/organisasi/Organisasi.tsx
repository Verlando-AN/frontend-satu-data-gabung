import type { JSX } from "react";
import useOrganisasi from "@/hooks/useOrganisasi.js";
import "@/css/organisasi.css";
import Head from "@/backbone/Header.jsx";
import Foot from "@/backbone/Footer.jsx";

// Interface opsional untuk data organisasi
interface OrganisasiItem {
  id_opd: string;
  nama_opd: string;
  total_ref_sektoral: number;
}

export default function Organisasi(): JSX.Element {
  const {
    tabs,
    activeTab,
    setActiveTab,
    filteredData,
    loading,
    truncateNamaOpd,
  } = useOrganisasi() as {
    tabs: string[];
    activeTab: string;
    setActiveTab: (tab: string) => void;
    filteredData: OrganisasiItem[];
    loading: boolean;
    truncateNamaOpd: (name: string) => string;
  };

  return (
    <>
      <Head />
      <div className="organisasi-container">
        <div className="organisasi-header">
          <h1 className="organisasi-title">Organisasi Perangkat Daerah</h1>
          <p className="organisasi-subtitle">
            Kelola dan pantau data sektoral dari berbagai organisasi
          </p>
        </div>

        <div className="tab-navigation">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`tab-button ${activeTab === tab ? "active" : ""}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Memuat data...</p>
          </div>
        ) : (
          <>
            <div className="data-summary">
              <div className="data-item">
                <span className="data-number">{filteredData.length}</span>
                <span className="data-label">Total Organisasi</span>
              </div>
              <div className="data-item">
                <span className="data-number">
                  {filteredData.reduce(
                    (sum, org) => sum + org.total_ref_sektoral,
                    0
                  )}
                </span>
                <span className="data-label">Total Data Sektoral</span>
              </div>
            </div>

            <div className="organisasi-grid">
              {filteredData.map((org) => (
                <div key={org.id_opd} className="org-card">
                  <div className="org-card-header">
                    <div className="org-icon">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                  </div>

                  <div className="org-card-body">
                    <h7 className="org-name">{truncateNamaOpd(org.nama_opd)}</h7>

                    <div className="data-count">
                      <span className="count-number">{org.total_ref_sektoral}</span>
                      <span className="count-label">Data Sektoral</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredData.length === 0 && (
              <div className="empty-state">
                <svg
                  className="empty-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 8v4m0 4h.01" />
                </svg>
                <p className="empty-text">
                  Tidak ada data untuk kategori <strong>{activeTab}</strong>
                </p>
                <p className="empty-subtext">
                  Coba pilih kategori lain atau tambahkan data baru
                </p>
              </div>
            )}
          </>
        )}
      </div>
      <Foot />
    </>
  );
}

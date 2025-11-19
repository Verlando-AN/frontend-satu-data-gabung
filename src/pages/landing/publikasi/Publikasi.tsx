import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import usePublikasi from "@/hooks/usePublikasi"; 
import { Filter, X, Calendar, Building2, BookOpen } from "lucide-react";
import "@/css/publikasi.css";
import "@/css/publikasi-search.css";
import "@/css/card.css";
import gambar from "@/assets/logolamptimm.png";
import Head from "@/backbone/Header.jsx";
import Foot from "@/backbone/Footer.jsx";

interface PublikasiItem {
  buku: string;
  buku_slug: string;
  nama_opd: string;
  created_at: number;
}

export default function Publikasi() {
  const { publikasiData = [], loading } = usePublikasi() as {
    publikasiData: PublikasiItem[];
    loading: boolean;
  };

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [selectedOpd, setSelectedOpd] = useState<string>("");
  const [showFilters, setShowFilters] = useState<boolean>(false);

  const { years, opds } = useMemo(() => {
    const yearsSet = new Set<number>();
    const opdsSet = new Set<string>();

    publikasiData.forEach((item) => {
      const year = new Date(item.created_at * 1000).getFullYear();
      yearsSet.add(year);
      opdsSet.add(item.nama_opd);
    });

    return {
      years: Array.from(yearsSet).sort((a, b) => b - a),
      opds: Array.from(opdsSet).sort(),
    };
  }, [publikasiData]);

  // ===========================
  // FILTER DATA
  // ===========================
  const filteredData = useMemo(() => {
    return publikasiData.filter((item) => {
      const matchesSearch =
        item.buku.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.nama_opd.toLowerCase().includes(searchQuery.toLowerCase());

      const itemYear = new Date(item.created_at * 1000)
        .getFullYear()
        .toString();

      const matchesYear = !selectedYear || itemYear === selectedYear;
      const matchesOpd = !selectedOpd || item.nama_opd === selectedOpd;

      return matchesSearch && matchesYear && matchesOpd;
    });
  }, [publikasiData, searchQuery, selectedYear, selectedOpd]);

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedYear("");
    setSelectedOpd("");
  };

  const activeFiltersCount = [selectedYear, selectedOpd].filter(Boolean).length;

  return (
    <>
      <Head />

      <div className="publikasi-container">
        {/* HEADER */}
        <div className="publikasi-header">
          <div className="header-content">
            <BookOpen className="header-icon-satu" size={48} />
            <h2 className="publikasi-title">Data Publikasi</h2>
            <p className="publikasi-subtitle">
              Jelajahi koleksi publikasi dari berbagai perangkat daerah
            </p>
          </div>
        </div>

        {/* FILTER & SEARCH */}
        <div className="cari-filter-wrapper">
          <div className="filter-controls">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`filter-toggle-btn ${showFilters ? "active" : ""}`}
            >
              <Filter size={18} />
              <span>Filter</span>
              {activeFiltersCount > 0 && (
                <span className="filter-badge">{activeFiltersCount}</span>
              )}
            </button>

            {activeFiltersCount > 0 && (
              <button onClick={resetFilters} className="reset-filter-btn">
                <X size={16} />
                <span>Reset Filter</span>
              </button>
            )}

            <div className="results-count">
              <span className="count-highlight">{filteredData.length}</span>
              <span className="count-text">
                {" "}
                dari {publikasiData.length} publikasi
              </span>
            </div>

            <div className="cari-container">
              <div className="cari-input-wrapper">
                <input
                  type="text"
                  placeholder="Cari publikasi"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="cari-input"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="cari-clear-btn"
                  >
                    <X size={18} />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* FILTER PANEL */}
          {showFilters && (
            <div className="filter-panel">
              <div className="filter-grid">
                <div className="filter-group">
                  <label className="filter-label">
                    <Calendar size={16} />
                    <span>Tahun</span>
                  </label>
                  <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className="filter-select"
                  >
                    <option value="">Semua Tahun</option>
                    {years.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="filter-group">
                  <label className="filter-label">
                    <Building2 size={16} />
                    <span>Perangkat Daerah</span>
                  </label>
                  <select
                    value={selectedOpd}
                    onChange={(e) => setSelectedOpd(e.target.value)}
                    className="filter-select"
                  >
                    <option value="">Semua OPD</option>
                    {opds.map((opd) => (
                      <option key={opd} value={opd}>
                        {opd}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* LIST PUBLIKASI */}
        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p className="loading-text">Sedang memuat data...</p>
          </div>
        ) : filteredData.length === 0 ? (
          <div className="empty-state">
            <BookOpen size={64} className="empty-icon" />
            <h3 className="empty-title">Tidak ada publikasi yang ditemukan</h3>
            <p className="empty-description">
              Coba ubah kata kunci pencarian atau filter Anda
            </p>
            {activeFiltersCount > 0 && (
              <button onClick={resetFilters} className="empty-reset-btn">
                Reset Filter
              </button>
            )}
          </div>
        ) : (
          <div className="books-grid">
            {filteredData.map((item, index) => {
              const tanggal = new Date(item.created_at * 1000).toLocaleDateString(
                "id-ID",
                {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                }
              );

              return (
                <div key={index} className="book-card">
                  <Link
                    to={`/publikasi-buku-landing/${item.buku_slug}`}
                    className="book-link"
                  >
                    <div className="book-spine"></div>
                    <div className="book-cover">
                      <div className="book-cover-gradient"></div>
                      <img src={gambar} alt="Logo" className="book-logo" />

                      <div className="book-content">
                        <h3 className="book-title">{item.buku}</h3>

                        <div className="book-details">
                          <div className="detail-item">
                            <Building2 size={14} className="detail-icon" />
                            <div className="detail-text">
                              <span className="detail-label">
                                Perangkat Daerah
                              </span>
                              <span className="detail-value">
                                {item.nama_opd}
                              </span>
                            </div>
                          </div>
                          <div className="detail-divider"></div>
                          <div className="detail-item">
                            <Calendar size={14} className="detail-icon" />
                            <div className="detail-text">
                              <span className="detail-label">
                                Tanggal Publikasi
                              </span>
                              <span className="detail-value">{tanggal}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <Foot />
    </>
  );
}

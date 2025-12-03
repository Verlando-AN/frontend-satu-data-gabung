import React, { type JSX } from "react";
import "@/css/beranda.css";

import Bupati from "@/assets/bupati.png";
import Beranda2 from "@/assets/logolamptim.jpeg";
import Card1 from "@/assets/card1.png";
import Berkas from "@/assets/berkas.png";

import Head from "@/backbone/Header.jsx";
import Foot from "@/backbone/Footer.jsx";
import useBerandaData from "@/hooks/useBerandaData";

interface OpdItem {
  nama_opd: string;
  total_ref_sektoral?: number;
}

interface DataTotal {
  dataset: number;
  data_sektoral: number;
  urusan: number;
}

export default function Index(): JSX.Element {
  const {
    opdList,
    loading,
    dataTotal,
    isVisible,
    counterRef,
    featureRef,
    categoryRef
  }: {
    opdList: OpdItem[];
    loading: boolean;
    dataTotal: DataTotal;
    isVisible: any;
    counterRef: React.RefObject<HTMLDivElement>;
    featureRef: React.RefObject<HTMLDivElement>;
    categoryRef: React.RefObject<HTMLDivElement>;
  } = useBerandaData();

  return (
    <>
      <Head />

      <div className="beranda-container">
        <section id="home" className="hero-section">
          <div className="hero-background">
            <div className="floating-shape shape-1"></div>
            <div className="floating-shape shape-2"></div>
            <div className="floating-shape shape-3"></div>
          </div>

          <div className="hero-content">
            <div className="hero-grid">
              <div className="hero-text">
                <p className="hero-subtitle">PORTAL SATU DATA LAMPUNG TIMUR</p>

                <h1 className="hero-title">
                  <span className="title-line">Akses Data</span>
                  <span className="title-line">Dalam Satu</span>
                  <span className="title-line highlight">Portal</span>
                </h1>

                <p className="hero-description">
                  Dalam satu sentuhan, dunia data terbuka lebar.
                  Mari temukan apa yang akan anda cari.
                </p>

                <div className="search-container">
                  <input
                    type="search"
                    placeholder="Cari data atau informasi..."
                    className="search-input"
                  />
                  <button className="search-button">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <circle cx="11" cy="11" r="8"></circle>
                      <path d="m21 21-4.35-4.35"></path>
                    </svg>
                  </button>
                </div>

                <div className="hero-stats">
                  <div className="stat-item">
                    <div className="stat-number">{dataTotal.dataset}</div>
                    <div className="stat-label">Dataset</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-number">{dataTotal.data_sektoral}</div>
                    <div className="stat-label">Sektoral</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-number">{dataTotal.urusan}</div>
                    <div className="stat-label">Urusan</div>
                  </div>
                </div>
              </div>

              <div className="hero-illustration">
                <div className="illustration-wrapper">
                  <img src={Bupati} alt="Ilustrasi Data" className="illustration-img" />
                  <div className="illustration-blob"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="categories-section" id="categories" ref={categoryRef}>
          <div className="section-header">
            <h2 className="section-title">Data Sektoral Berdasarkan OPD</h2>
            <p className="section-subtitle">
              Akses data dari berbagai Organisasi Perangkat Daerah
            </p>
          </div>

          <div className="category-grid">
            {loading ? (
              <div className="loading-state">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="skeleton-card"></div>
                ))}
              </div>
            ) : opdList.length > 0 ? (
              opdList.slice(0, 8).map((item, index) => (
                <div
                  key={index}
                  className={`category-card ${isVisible.categories ? "visible" : ""}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="category-icon-satu">
                    <img src={Berkas} alt="Icon" className="icon-satu" />
                  </div>
                  <h6 className="category-name">{item.nama_opd}</h6>
                  <p className="category-projects">
                    {item.total_ref_sektoral ?? "0"} Data Tersedia
                  </p>
                </div>
              ))
            ) : (
              <p className="no-data">Tidak ada data ditemukan.</p>
            )}
          </div>
        </section>

        <section className="counter-section" id="counterSection" ref={counterRef}>
          <div className="counter-container">
            <div className="counter-grid">
              {[
                {
                  title: "Dataset",
                  description:
                    "Kumpulan data yang diatur dalam format terstruktur dan tersedia di Portal Satu Data.",
                  count: dataTotal.dataset,
                  link: "/dataset-landing",
                },
                {
                  title: "Statistik Sektoral",
                  description:
                    "Data statistik yang digunakan untuk kebutuhan instansi pemerintah tertentu.",
                  count: dataTotal.data_sektoral,
                  link: "/sektoral-landing",
                },
                {
                  title: "Urusan",
                  description:
                    "Kebijakan tata kelola data pemerintah untuk menghasilkan data berkualitas.",
                  count: dataTotal.urusan,
                  link: "/urusan-landing",
                }
              ].map((item, index) => (
                <div
                  key={index}
                  className={`counter-card ${isVisible.counterSection ? "visible" : ""}`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="counter-icon-wrapper">
                    <img src={Card1} alt="Icon" style={{borderRadius: "10px" }} />
                  </div>

                  <div className="counter-content">
                    <h5 className="counter-title">{item.title}</h5>
                    <p className="counter-description">{item.description}</p>

                    <div className="counter-footer">
                      <h3 className="counter-number">
                        {item.count.toLocaleString("id-ID")}
                      </h3>
                      <a href={item.link} className="counter-button">
                        Lihat Data
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="feature-section" ref={featureRef}>
          <div className="feature-container">
            <div className="feature-grid">
              {[
                { title: "Menemukan Data Dengan Mudah" },
                { title: "Mendapatkan Data Dengan Cepat" },
                { title: "Data Akurat dan Mutakhir" },
                { title: "Terhubung Dengan OPD" }
              ].map((feature, index) => (
                <div
                  key={index}
                  className={`feature-card ${isVisible.featureSection ? "visible" : ""}`}
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  <div className="feature-icon-wrapper">★</div>
                  <h5 className="feature-title">{feature.title}</h5>
                  <p className="feature-text">Fitur penjelasan singkat.</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="why-section">
          <div className="why-container">
            <div className="why-grid">
              <div className="why-content">
                <h1 className="why-title">
                  Mengapa Menggunakan
                  <span className="why-highlight"> Satu Data Lamtim?</span>
                </h1>

                <p className="why-description">
                  Satu Data adalah inisiatif pemerintah untuk mendorong pengambilan
                  kebijakan berbasis data.
                </p>

                <div className="why-features">
                  {[
                    "Data Akurat & Terpercaya",
                    "Akses Mudah & Cepat",
                    "Terintegrasi dengan Sistem Nasional",
                  ].map((item, i) => (
                    <div className="why-feature-item" key={i}>
                      <svg width="24" height="24" fill="none" stroke="#4facfe" strokeWidth="2">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="why-illustration">
                <img src={Beranda2} alt="Ilustrasi Satu Data" className="why-img" />
              </div>
            </div>
          </div>
        </section>
      </div>
      <Foot />
    </>
  );
}

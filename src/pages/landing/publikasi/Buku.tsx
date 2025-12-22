import type { JSX } from "react";
import { useParams, Link } from "react-router-dom";
import usePublikasi from "../../../hooks/usePublikasi.js";
import img_logo from "../../../assets/logolamptim.jpeg";
import Head from "@/backbone/Header.jsx";
import Foot from "@/backbone/Footer.jsx";

import "@/css/buku.css";

export default function Buku(): JSX.Element {
  const { slug } = useParams<{ slug: string }>(); 
  const { detail, loading } = usePublikasi(slug);

  if (loading) {
    return (
      <div className="loading-container">
        <p className="loading-text">Sedang memuat detail publikasi...</p>
      </div>
    );
  }

  if (!detail || !detail.buku) {
    return <p className="not-found">Data tidak ditemukan.</p>;
  }


  const tanggal = new Date(detail.created_at * 1000).toLocaleDateString("id-ID");
  const gambar = detail.foto_cover
    ? `https://api-satudata.lampungtimurkab.go.id/${detail.foto_cover}`
    : img_logo;

  const nomor_katalog = detail.nomor_katalog || "1102001.1804072";
  const nomor_publikasi = detail.nomor_publikasi || "18040.25034";
  const issn_isbn = detail.issn_isbn || "-";
  const frekuensi_terbit = detail.frekuensi_terbit || "Tahunan";
  const bahasa = detail.bahasa || "Indonesia dan Inggris";

  const abstrak =
    detail.deskripsi ||
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus pretium, sem in porta faucibus, enim massa mattis justo, non eleifend velit mi et urna.";

  const kategori = ["Pendidikan", "Assessment", "Evaluasi", "Bahasa Indonesia", "Ilmu Pendidikan"];

  return (
    <>
      <Head />

      <div className="buku-container">
        <Link to="/publikasi" className="back-button">
          Kembali ke Daftar Publikasi
        </Link>

        <div className="article-container">
          <div className="left-section">
            <img src={gambar} alt="Sampul Publikasi" className="cover-image" />

            <div className="info-box">
              <div className="info-item">
                <span className="info-label">Diterbitkan:</span>
                <span className="info-value">{tanggal}</span>
              </div>

              <div className="info-item">
                <span className="info-label">Ukuran File:</span>
                <span className="info-value">{detail.ukuran_file || "-"}</span>
              </div>

              <div className="info-item">
                <span className="info-label">Nomor Katalog:</span>
                <span className="info-value">{nomor_katalog}</span>
              </div>

              <div className="info-item">
                <span className="info-label">Nomor Publikasi:</span>
                <span className="info-value">{nomor_publikasi}</span>
              </div>

              <div className="info-item">
                <span className="info-label">ISSN/ISBN:</span>
                <span className="info-value">{issn_isbn}</span>
              </div>

              <div className="info-item">
                <span className="info-label">Frekuensi Terbit:</span>
                <span className="info-value">{frekuensi_terbit}</span>
              </div>

              <div className="info-item">
                <span className="info-label">Bahasa:</span>
                <span className="info-value">{bahasa}</span>
              </div>
            </div>

            <a
              href={`https://api-satudata.lampungtimurkab.go.id/${detail.url_file}`}
              target="_blank"
              rel="noopener noreferrer"
              className="download-btn"
            >
              📄 Buka / Unduh File
            </a>
          </div>

          <div className="right-section">
            <h1 className="title">{detail.buku}</h1>

            <div className="meta-info">
              <p className="opd">
                <strong>OPD:</strong> {detail.nama_opd}
              </p>
              <p className="year">
                <strong>Tahun:</strong> {detail.tahun}
              </p>
            </div>

            <div className="tag-container">
              {kategori.map((tag, index) => (
                <span key={index} className="tag">
                  {tag}
                </span>
              ))}
            </div>

            <div className="abstract-section">
              <h2 className="abstract-title">Review</h2>
              <p className="abstract-text">{abstrak}</p>
              <p className="abstract-text">{abstrak}{abstrak}{abstrak}</p>
              <p className="abstract-text">{abstrak}{abstrak}</p>
              <p className="abstract-text">{abstrak}{abstrak}{abstrak}</p>
            </div>
          </div>
        </div>
      </div>

      <Foot />
    </>
  );
}

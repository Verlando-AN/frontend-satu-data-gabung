import { JSX } from "react";
import { useParams, Link } from "react-router-dom";
import usePublikasi from "../../../hooks/usePublikasi.js";
import img_logo from "../../../assets/logolamptim.jpeg";
import Head from "@/backbone/Header.jsx";
import Foot from "@/backbone/Footer.jsx";

// Interface publikasi
interface PublikasiData {
  buku: string;
  created_at: number;
  foto_cover?: string;
  url_file: string;
  ukuran_file?: string;
  nomor_katalog?: string;
  nomor_publikasi?: string;
  issn_isbn?: string;
  frekuensi_terbit?: string;
  bahasa?: string;
  nama_opd?: string;
  tahun?: string | number;
  deskripsi?: string;
}

export default function Buku(): JSX.Element {
  const { slug } = useParams<{ slug: string }>();
  const { publikasiData, loading } = usePublikasi(slug) as {
    publikasiData: PublikasiData | null;
    loading: boolean;
  };

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <p style={styles.loadingText}>Sedang memuat detail publikasi...</p>
      </div>
    );
  }

  if (!publikasiData || !publikasiData.buku) {
    return <p style={styles.notFound}>Data tidak ditemukan.</p>;
  }

  const tanggal = new Date(publikasiData.created_at * 1000).toLocaleDateString("id-ID");
  const gambar = publikasiData.foto_cover
    ? `https://api-satudata.lampungtimurkab.go.id/${publikasiData.foto_cover}`
    : img_logo;

  const nomor_katalog = publikasiData.nomor_katalog || "1102001.1804072";
  const nomor_publikasi = publikasiData.nomor_publikasi || "18040.25034";
  const issn_isbn = publikasiData.issn_isbn || "-";
  const frekuensi_terbit = publikasiData.frekuensi_terbit || "Tahunan";
  const bahasa = publikasiData.bahasa || "Indonesia dan Inggris";

  const abstrak =
    publikasiData.deskripsi ||
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus pretium, sem in porta faucibus, enim massa mattis justo, non eleifend velit mi et urna. Cras tincidunt, lectus at convallis sagittis, nulla ipsum viverra odio, nec rhoncus magna orci at nisi.";

  const kategori = [
    "Pendidikan",
    "Assessment",
    "Evaluasi",
    "Bahasa Indonesia",
    "Ilmu Pendidikan",
  ];

  return (
    <>
      <Head />
      <div style={styles.container}>
        <Link to="/publikasi" style={styles.backButton}>
          Kembali ke Daftar Publikasi
        </Link>

        <div style={styles.articleContainer}>
          <div style={styles.leftSection}>
            <img src={gambar} alt="Sampul Publikasi" style={styles.coverImage} />

            <div style={styles.infoBox}>
              <div style={styles.infoItem}>
                <span style={styles.infoLabel}>Diterbitkan:</span>
                <span style={styles.infoValue}>{tanggal}</span>
              </div>

              <div style={styles.infoItem}>
                <span style={styles.infoLabel}>Ukuran File:</span>
                <span style={styles.infoValue}>{publikasiData.ukuran_file || "-"}</span>
              </div>

              <div style={styles.infoItem}>
                <span style={styles.infoLabel}>Nomor Katalog:</span>
                <span style={styles.infoValue}>{nomor_katalog}</span>
              </div>

              <div style={styles.infoItem}>
                <span style={styles.infoLabel}>Nomor Publikasi:</span>
                <span style={styles.infoValue}>{nomor_publikasi}</span>
              </div>

              <div style={styles.infoItem}>
                <span style={styles.infoLabel}>ISSN/ISBN:</span>
                <span style={styles.infoValue}>{issn_isbn}</span>
              </div>

              <div style={styles.infoItem}>
                <span style={styles.infoLabel}>Frekuensi Terbit:</span>
                <span style={styles.infoValue}>{frekuensi_terbit}</span>
              </div>

              <div style={styles.infoItem}>
                <span style={styles.infoLabel}>Bahasa:</span>
                <span style={styles.infoValue}>{bahasa}</span>
              </div>
            </div>

            <a
              href={`https://api-satudata.lampungtimurkab.go.id/${publikasiData.url_file}`}
              target="_blank"
              rel="noopener noreferrer"
              style={styles.downloadBtn}
            >
              📄 Buka / Unduh File
            </a>
          </div>

          <div style={styles.rightSection}>
            <h1 style={styles.title}>{publikasiData.buku}</h1>

            <div style={styles.metaInfo}>
              <p style={styles.opd}>
                <strong>OPD:</strong> {publikasiData.nama_opd}
              </p>
              <p style={styles.year}>
                <strong>Tahun:</strong> {publikasiData.tahun}
              </p>
            </div>

            <div style={styles.tagContainer}>
              {kategori.map((tag, index) => (
                <span key={index} style={styles.tag}>
                  {tag}
                </span>
              ))}
            </div>

            <div style={styles.abstractSection}>
              <h2 style={styles.abstractTitle}>Review</h2>
              <p style={styles.abstractText}>{abstrak}</p>
              <p style={styles.abstractText}>{abstrak}{abstrak}{abstrak}</p>
              <p style={styles.abstractText}>{abstrak}{abstrak}</p>
              <p style={styles.abstractText}>{abstrak}{abstrak}{abstrak}</p>
            </div>
          </div>
        </div>
      </div>
      <Foot />
    </>
  );
}


const styles = {
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "20px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  backButton: {
    display: "inline-flex",
    alignItems: "center",
    marginBottom: "25px",
    textDecoration: "none",
    color: "#2563eb",
    fontWeight: 500,
    fontSize: "15px",
    transition: "color 0.2s",
  },
  articleContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "30px",
    background: "white",
    borderRadius: "12px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
    padding: "30px",
  },
  leftSection: {
    flex: "1 1 300px",
    minWidth: "280px",
    maxWidth: "400px",
  },
  coverImage: {
    width: "100%",
    height: "auto",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
    marginBottom: "20px",
  },
  infoBox: {
    background: "#f8f9fa",
    borderRadius: "8px",
    padding: "15px",
    marginBottom: "20px",
  },
  infoItem: {
    display: "flex",
    justifyContent: "space-between",
    padding: "8px 0",
    borderBottom: "1px solid #e9ecef",
  },
  infoLabel: {
    fontSize: "14px",
    color: "#495057",
    fontWeight: 500,
  },
  infoValue: {
    fontSize: "14px",
    color: "#212529",
    textAlign: "right",
    maxWidth: "60%",
    wordBreak: "break-word",
  },
  downloadBtn: {
    display: "block",
    width: "100%",
    padding: "12px 20px",
    background: "#ff1616",
    color: "#ffffff",
    borderRadius: "8px",
    fontWeight: 600,
    textDecoration: "none",
    textAlign: "center",
    transition: "background 0.3s ease",
    fontSize: "15px",
  },
  rightSection: {
    flex: "1 1 500px",
  },
  title: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#212529",
    marginBottom: "15px",
    lineHeight: 1.3,
  },
  metaInfo: {
    marginBottom: "20px",
    paddingBottom: "15px",
    borderBottom: "2px solid #e9ecef",
  },
  opd: {
    fontSize: "16px",
    color: "#495057",
    marginBottom: "8px",
  },
  year: {
    fontSize: "16px",
    color: "#495057",
    marginBottom: "0",
  },
  tagContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
    marginBottom: "25px",
  },
  tag: {
    background: "#ff1616",
    color: "#ffffff",
    padding: "6px 14px",
    borderRadius: "20px",
    fontSize: "13px",
    fontWeight: 500,
  },
  abstractSection: {
    marginTop: "25px",
  },
  abstractTitle: {
    fontSize: "20px",
    fontWeight: "600",
    marginBottom: "12px",
    color: "#212529",
  },
  abstractText: {
    fontSize: "15px",
    color: "#495057",
    lineHeight: 1.7,
    textAlign: "justify",
  },
  loadingContainer: {
    textAlign: "center",
    padding: "60px 20px",
  },
  loadingText: {
    fontSize: "16px",
    color: "#495057",
  },
  notFound: {
    textAlign: "center",
    color: "#495057",
    fontSize: "16px",
    marginTop: "50px",
  },
};
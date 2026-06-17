import { useParams } from "react-router-dom";
import { useState } from "react";
import "@/css/detail.css";

import useDatasetDetail from "@/hooks/useDatasetDetail";
import useDatasetExport from "@/hooks/useDatasetExport";

import DatasetInfoTable from "@/backbone/DatasetInfoTable.jsx";
import DatasetChart from "@/backbone/DatasetChart.jsx";
import DatasetSeriesTable from "@/backbone/DatasetSeriesTable.jsx";
import Head from "@/backbone/Header";
import Foot from "@/backbone/Footer";

interface DatasetInput {
  tahun: number | string;
  jumlah: number;
}

interface DatasetType {
  id: string | number;
  title?: string;
  description?: string;
  input: DatasetInput[];
  kode_dssd?: string;
  kategori_string?: string;
  [key: string]: any;
}

export default function Detail() {
  const { id } = useParams<{ id: string }>();
  const datasetId = id ?? null;

  const { dataset, loading, error } = useDatasetDetail(datasetId);

  const { exportExcel, exportPDF } = useDatasetExport();

  const [activeTab, setActiveTab] = useState<
    "visualisasi" | "dataSeries"
  >("visualisasi");

  if (loading)
    return <div className="text-center mt-5">Memuat...</div>;

  if (error || !dataset)
    return <div className="text-center mt-5">Data tidak ditemukan.</div>;

  return (
    <>
      <Head />

      <section className="detail">
        <div className="container">
          <h1 className="fs-0 fw-bold text-warning">Detail Dataset</h1>

          <p className="lh-sm mt-3 mb-3">
            Temukan kumpulan data mentah yang bisa diolah lebih lanjut.
          </p>

          <DatasetInfoTable dataset={dataset as DatasetType} />

          {/* CARD */}
          <div className="card mt-4">
            <div className="card-header d-flex align-items-center justify-content-between">
              {/* TAB MENU */}
              <div>
                <button
                  className={`btn ${
                    activeTab === "visualisasi"
                      ? "btn-warning"
                      : "btn-light"
                  } me-2`}
                  onClick={() => setActiveTab("visualisasi")}
                >
                  Visualisasi
                </button>

                <button
                  className={`btn ${
                    activeTab === "dataSeries"
                      ? "btn-warning"
                      : "btn-light"
                  }`}
                  onClick={() => setActiveTab("dataSeries")}
                >
                  Data Series
                </button>
              </div>

              {/* EXPORT BUTTON (hanya di Data Series) */}
              
            </div>

            {/* BODY */}
            <div className="card-body">
              {activeTab === "dataSeries" && (
                <div className="d-flex gap-2 align-items-center export-actions">
                  <button
                    className="btn btn-success export-btn"
                    onClick={() => exportExcel(dataset as DatasetType)}
                  >
                    Export Excel
                  </button>

                  <button
                    className="btn btn-danger export-btn"
                    onClick={() => exportPDF(dataset as DatasetType)}
                  >
                    Export PDF
                  </button>

                  <style>{`
                    .export-actions {
                    margin: 10px 10px;  
                      padding: 4gipx 6px;
                    }

                    .export-btn {
                      padding: 4px 10px;   /* kecilkan padding */
                      font-size: 12px;     /* kecilkan teks */
                      border-radius: 6px;
                      line-height: 1.2;
                    }
                  `}</style>
                </div>
              )}
              {activeTab === "visualisasi" ? (
                <DatasetChart data={dataset.input} />
              ) : (
                <DatasetSeriesTable dataset={dataset as DatasetType} />
              )}
            </div>
          </div>
        </div>
      </section>

      <Foot />
    </>
  );
}
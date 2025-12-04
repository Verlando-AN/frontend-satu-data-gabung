import { useParams } from "react-router-dom";
import { useState } from "react";
import "@/css/detail.css";
import useDatasetDetail from "@/hooks/useDatasetDetail";
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
  [key: string]: any; 
}

export default function Detail() {
  const { id } = useParams<{ id: string }>();
  const datasetId = id ? id : null;
  
  const { dataset, loading, error } = useDatasetDetail(datasetId);
  const [activeTab, setActiveTab] = useState<"visualisasi" | "dataSeries">("visualisasi");

  if (loading) return <div className="text-center mt-5">Memuat...</div>;
  if (error || !dataset) return <div className="text-center mt-5">Data tidak ditemukan.</div>;

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

          <div className="card mt-4">
            <div className="card-header">
              <button
                className={`btn ${activeTab === "visualisasi" ? "btn-warning" : "btn-light"} me-2`}
                onClick={() => setActiveTab("visualisasi")}
              >
                Visualisasi
              </button>

              <button
                className={`btn ${activeTab === "dataSeries" ? "btn-warning" : "btn-light"}`}
                onClick={() => setActiveTab("dataSeries")}
              >
                Data Series
              </button>
            </div>

            <div className="card-body">
              {activeTab === "visualisasi" ? (
                <DatasetChart data={dataset.input} />
              ) : (
                <DatasetSeriesTable dataset={dataset} />
              )}
            </div>
          </div>
        </div>
      </section>

      <Foot />
    </>
  );
}
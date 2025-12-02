import { useEffect, useState } from "react";
import datasetApi from "../api/datasetApi.js";

// ===========================
// Type Definitions
// ===========================

export type DatasetDetail = {
  id: number;
  nama_dataset?: string;
  deskripsi?: string;
  [key: string]: any;
};

export default function useDatasetDetail(id: number | string | null) {
  const [dataset, setDataset] = useState<DatasetDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const data: DatasetDetail = await datasetApi.getDatasetDetail(id);
        setDataset(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return { dataset, loading, error };
}

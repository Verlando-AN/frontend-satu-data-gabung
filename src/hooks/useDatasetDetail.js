import { useEffect, useState } from "react";
import datasetApi from "../api/datasetApi.js";

export default function useDatasetDetail(id) {
  const [dataset, setDataset] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      try {
        const data = await datasetApi.getDatasetDetail(id);
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

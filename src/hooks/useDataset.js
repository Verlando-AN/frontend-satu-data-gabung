import { useState, useEffect } from "react";
import datasetApi from "../api/datasetApi";

export default function useDataset() {
  const [produsenSearch, setProdusenSearch] = useState("");
  const [datasetSearch, setDatasetSearch] = useState("");
  const [produsenList, setProdusenList] = useState([]);
  const [datasets, setDatasets] = useState([]);
  const [selectedProdusen, setSelectedProdusen] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalDatasets, setTotalDatasets] = useState(0);
  const perPage = 7;

  const stripHtml = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  const calculateDaysAgo = (dateString) => {
    const now = new Date();
    const modified = new Date(dateString);
    return Math.floor((now - modified) / (1000 * 60 * 60 * 24));
  };

  useEffect(() => {
    const fetchProdusen = async () => {
      try {
        const data = await datasetApi.getProdusenList();
        setProdusenList(data);
      } catch (err) {
        console.error("Gagal memuat data produsen:", err);
      }
    };
    fetchProdusen();
  }, []);

  const fetchDatasets = async (page = 1, id_opd = null) => {
    try {
      const { data, current, total, totalCount } = await datasetApi.getDatasets(page, id_opd, perPage);

      const formatted = data.map((item) => {
        const cleanText = stripHtml(item.description || "");
        const shortDesc = cleanText.length > 120 ? cleanText.slice(0, 120) + "..." : cleanText;

        return {
          id: item.id,
          title: item.uraian_dssd,
          description: shortDesc,
          producer: item.nama_opd,
          date: new Date(item.modified).toLocaleDateString("id-ID"),
          daysAgo: calculateDaysAgo(item.modified),
        };
      });

      setDatasets(formatted);
      setCurrentPage(current);
      setTotalPages(total);
      setTotalDatasets(totalCount);
    } catch (err) {
      console.error("Gagal memuat dataset:", err);
    }
  };

  useEffect(() => {
    fetchDatasets(1);
  }, []);

  const handlePrev = () => {
    if (currentPage > 1) {
      fetchDatasets(currentPage - 1, selectedProdusen);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      fetchDatasets(currentPage + 1, selectedProdusen);
    }
  };

  const filteredProdusen = produsenList.filter((opd) =>
    opd.nama_opd.toLowerCase().includes(produsenSearch.toLowerCase())
  );

  const filteredDatasets = datasets.filter((dataset) =>
    dataset.title.toLowerCase().includes(datasetSearch.toLowerCase())
  );

  return {
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
  };
}

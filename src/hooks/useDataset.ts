import { useState, useEffect } from "react";
import datasetApi from "@/api/datasetApi";

// ===========================
// Type Definitions
// ===========================

export type ProdusenItem = {
  id: number;
  nama_opd: string;
  [key: string]: any;
};

export type RawDatasetItem = {
  id: number;
  uraian_dssd: string;
  description?: string;
  nama_opd: string;
  modified: string;
  [key: string]: any;
};

export type DatasetFormatted = {
  id: number;
  title: string;
  description: string;
  producer: string;
  date: string;
  daysAgo: number;
};

export default function useDataset() {
  const [produsenSearch, setProdusenSearch] = useState<string>("");
  const [datasetSearch, setDatasetSearch] = useState<string>("");

  const [produsenList, setProdusenList] = useState<ProdusenItem[]>([]);
  const [datasets, setDatasets] = useState<DatasetFormatted[]>([]);

  const [selectedProdusen, setSelectedProdusen] = useState<number | null>(null);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalDatasets, setTotalDatasets] = useState<number>(0);

  const perPage = 7;

  const stripHtml = (html: string): string => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  const calculateDaysAgo = (dateString: string): number => {
    const now = new Date();
    const modified = new Date(dateString);
    return Math.floor((now.getTime() - modified.getTime()) / (1000 * 60 * 60 * 24));
  };

  useEffect(() => {
    const fetchProdusen = async () => {
      try {
        const data: ProdusenItem[] = await datasetApi.getProdusenList();
        setProdusenList(data);
      } catch (err) {
        console.error("Gagal memuat data produsen:", err);
      }
    };

    fetchProdusen();
  }, []);

  const fetchDatasets = async (page = 1, id_opd: number | null = null) => {
    try {
      const {
        data,
        current,
        total,
        totalCount,
      }: { data: RawDatasetItem[]; current: number; total: number; totalCount: number } =
        await datasetApi.getDatasets(page, id_opd, perPage);

      const formatted: DatasetFormatted[] = data.map((item: RawDatasetItem) => {
        const cleanText = stripHtml(item.description || "");
        const shortDesc =
          cleanText.length > 120 ? cleanText.slice(0, 120) + "..." : cleanText;

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

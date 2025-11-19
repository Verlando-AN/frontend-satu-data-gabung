import { useState, useEffect } from "react";
import organisasiApi from "../api/organisasiApi.js";

export default function useOrganisasi() {
  const [activeTab, setActiveTab] = useState("Semua");
  const [organisasiData, setOrganisasiData] = useState([]);
  const [loading, setLoading] = useState(true);

  const tabs = [
    "Semua",
    "Puskesmas",
    "Badan",
    "Bagian",
    "Dinas",
    "Sekretariat",
    "Inspektorat",
    "Satuan",
    "Rumah",
  ];

  useEffect(() => {
    async function fetchOrganisasi() {
      try {
        const data = await organisasiApi.getOrganisasiList();
        setOrganisasiData(data);
      } catch (error) {
        console.error("Gagal mengambil data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchOrganisasi();
  }, []);

  const filteredData =
    activeTab === "Semua"
      ? organisasiData
      : organisasiData.filter((org) =>
          org.nama_opd.toLowerCase().includes(activeTab.toLowerCase())
        );

  const truncateNamaOpd = (nama) => {
    if (!nama) return "";
    return nama.length > 100 ? nama.slice(0, 100) + "..." : nama;
  };

  return {
    tabs,
    activeTab,
    setActiveTab,
    filteredData,
    loading,
    truncateNamaOpd,
  };
}

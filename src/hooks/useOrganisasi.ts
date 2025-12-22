import { useState, useEffect } from "react";
import organisasiApi from "../api/organisasiApi.js";

export type OrganisasiItem = {
  id: number;
  nama_opd: string;
  [key: string]: any;
};

export default function useOrganisasi() {
  const [activeTab, setActiveTab] = useState<string>("Semua");
  const [organisasiData, setOrganisasiData] = useState<OrganisasiItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const tabs: string[] = [
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
        const data: OrganisasiItem[] = await organisasiApi.getOrganisasiList();
        setOrganisasiData(data);
      } catch (error) {
        console.error("Gagal mengambil data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchOrganisasi();
  }, []);

  const filteredData: OrganisasiItem[] =
    activeTab === "Semua"
      ? organisasiData
      : organisasiData.filter((org) =>
          org.nama_opd?.toLowerCase().includes(activeTab.toLowerCase())
        );

  const truncateNamaOpd = (nama: string): string => {
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

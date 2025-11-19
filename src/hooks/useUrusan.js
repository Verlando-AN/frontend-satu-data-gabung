import { useState, useEffect } from "react";
import { getUrusanList, getDataSektoralByUrusan } from "../api/urusanApi.js";

export const useUrusan = () => {
  const [urusanList, setUrusanList] = useState([]);
  const [selectedOPD, setSelectedOPD] = useState("");
  const [dariTahun, setDariTahun] = useState("");
  const [sampaiTahun, setSampaiTahun] = useState("");
  const [dataSektoral, setDataSektoral] = useState([]);
  const [tahunList, setTahunList] = useState([]);
  const [loading, setLoading] = useState(false);

  const [pagination, setPagination] = useState({
    current: 1,
    total: 1,
    perPage: 20,
    totalCount: 0,
  });

  useEffect(() => {
    getUrusanList()
      .then(setUrusanList)
      .catch((err) => console.error("Gagal memuat data urusan:", err));
  }, []);

  const fetchData = async (page = 1) => {
    if (!selectedOPD || !dariTahun || !sampaiTahun) {
      alert("Isi semua field (urusan, dari tahun, sampai tahun)!");
      return;
    }

    setLoading(true);
    try {
      const { data, pagination } = await getDataSektoralByUrusan(
        selectedOPD,
        dariTahun,
        sampaiTahun,
        page
      );

      setPagination(pagination);

      const tahunSet = new Set();
      data.forEach((item) => {
        item.input?.forEach((i) => i.tahun && tahunSet.add(i.tahun));
      });
      setTahunList([...tahunSet].sort((a, b) => a - b));
      setDataSektoral(data);
    } catch (err) {
      console.error("Gagal mengambil data sektoral:", err);
      setDataSektoral([]);
      setTahunList([]);
    } finally {
      setLoading(false);
    }
  };

  const handlePrev = () => {
    if (pagination.current > 1) fetchData(pagination.current - 1);
  };

  const handleNext = () => {
    if (pagination.current < pagination.total) fetchData(pagination.current + 1);
  };

  return {
    urusanList,
    selectedOPD,
    dariTahun,
    sampaiTahun,
    dataSektoral,
    tahunList,
    loading,
    pagination,
    setSelectedOPD,
    setDariTahun,
    setSampaiTahun,
    fetchData,
    handlePrev,
    handleNext,
  };
};

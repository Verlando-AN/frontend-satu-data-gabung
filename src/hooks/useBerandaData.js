import { useEffect, useState, useRef } from "react";
import berandaApi from "../api/berandaApi.js";

export default function useBerandaData() {
  const [opdList, setOpdList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dataTotal, setDataTotal] = useState({ dataset: 0, data_sektoral: 0, urusan: 0 });
  const [actualData, setActualData] = useState({ dataset: 0, data_sektoral: 0, urusan: 0 });
  const [isVisible, setIsVisible] = useState({});

  const counterRef = useRef(null);
  const featureRef = useRef(null);
  const categoryRef = useRef(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [opd, total] = await Promise.all([
          berandaApi.getOpdList(),
          berandaApi.getTotalData(),
        ]);
        setOpdList(opd);
        setActualData(total);
      } catch (err) {
        console.error("Gagal memuat data:", err);
        setActualData({ dataset: 1234, data_sektoral: 567, urusan: 89 });
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    if (isVisible.counterSection && actualData.dataset > 0) {
      const duration = 2000;
      const steps = 60;
      const increment = {
        dataset: actualData.dataset / steps,
        data_sektoral: actualData.data_sektoral / steps,
        urusan: actualData.urusan / steps,
      };

      let currentStep = 0;
      const timer = setInterval(() => {
        currentStep++;
        setDataTotal({
          dataset: Math.min(Math.floor(increment.dataset * currentStep), actualData.dataset),
          data_sektoral: Math.min(Math.floor(increment.data_sektoral * currentStep), actualData.data_sektoral),
          urusan: Math.min(Math.floor(increment.urusan * currentStep), actualData.urusan),
        });

        if (currentStep >= steps) clearInterval(timer);
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [isVisible.counterSection, actualData]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    if (counterRef.current) observer.observe(counterRef.current);
    if (featureRef.current) observer.observe(featureRef.current);
    if (categoryRef.current) observer.observe(categoryRef.current);

    return () => observer.disconnect();
  }, []);

  return {
    opdList,
    loading,
    dataTotal,
    isVisible,
    counterRef,
    featureRef,
    categoryRef,
  };
}

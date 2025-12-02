// import { useState, useMemo } from "react";
// import usePublikasi from "./usePublikasi";

// export default function usePublikasiLogic() {
//   const { publikasiData, loading } = usePublikasi();
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedYear, setSelectedYear] = useState("");
//   const [selectedOpd, setSelectedOpd] = useState("");
//   const [showFilters, setShowFilters] = useState(false);

//   const { years, opds } = useMemo(() => {
//     const yearsSet = new Set();
//     const opdsSet = new Set();

//     publikasiData.forEach((item) => {
//       const year = new Date(item.created_at * 1000).getFullYear();
//       yearsSet.add(year);
//       opdsSet.add(item.nama_opd);
//     });

//     return {
//       years: Array.from(yearsSet).sort((a, b) => b - a),
//       opds: Array.from(opdsSet).sort(),
//     };
//   }, [publikasiData]);

//   const filteredData = useMemo(() => {
//     return publikasiData.filter((item) => {
//       const matchesSearch =
//         item.buku.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         item.nama_opd.toLowerCase().includes(searchQuery.toLowerCase());

//       const itemYear = new Date(item.created_at * 1000)
//         .getFullYear()
//         .toString();

//       const matchesYear = !selectedYear || itemYear === selectedYear;
//       const matchesOpd = !selectedOpd || item.nama_opd === selectedOpd;

//       return matchesSearch && matchesYear && matchesOpd;
//     });
//   }, [publikasiData, searchQuery, selectedYear, selectedOpd]);

//   const resetFilters = () => {
//     setSearchQuery("");
//     setSelectedYear("");
//     setSelectedOpd("");
//   };

//   const activeFiltersCount = [selectedYear, selectedOpd].filter(Boolean).length;

//   return {
//     loading,
//     publikasiData,
//     filteredData,
//     searchQuery,
//     selectedYear,
//     selectedOpd,
//     showFilters,
//     years,
//     opds,
//     activeFiltersCount,
//     setSearchQuery,
//     setSelectedYear,
//     setSelectedOpd,
//     setShowFilters,
//     resetFilters,
//   };
// }

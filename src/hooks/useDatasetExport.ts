import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

/**
 * ===== TYPES =====
 */

export type DatasetInputItem = {
  tahun: string | number;
  jumlah: number | null | undefined;
};

export type Dataset = {
  kode_dssd?: string;
  kategori_string?: string;
  input?: DatasetInputItem[];
};

type TransformedRow = {
  kode: string;
  wilayah: string;
  komponen: string;
  [key: string]: string | number;
};

type TransformResult = {
  years: (string | number)[];
  row: TransformedRow;
};

/**
 * ===== HOOK =====
 */
export default function useDatasetExport() {
  const transformData = (dataset: Dataset): TransformResult => {
    const input = dataset?.input ?? [];

    const years = input.map((i) => i.tahun);

    const row: TransformedRow = {
      kode: dataset?.kode_dssd ?? "-",
      wilayah: "Lampung Timur",
      komponen: dataset?.kategori_string ?? "-",
    };

    input.forEach((item) => {
      row[item.tahun] = item.jumlah ?? 0;
    });

    return { years, row };
  };

  const exportExcel = (dataset: Dataset): void => {
    const { years, row } = transformData(dataset);

    const headers = ["Kode", "Wilayah", "Komponen", ...years];

    const data = [
      [
        row.kode,
        row.wilayah,
        row.komponen,
        ...years.map((y) => row[y] ?? 0),
      ],
    ];

    const ws = XLSX.utils.aoa_to_sheet([headers, ...data]);
    const wb = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(wb, ws, "Dataset");

    const buffer = XLSX.write(wb, {
      bookType: "xlsx",
      type: "array",
    });

    const file = new Blob([buffer], {
      type: "application/octet-stream",
    });

    saveAs(file, `dataset-${Date.now()}.xlsx`);
  };

  const exportPDF = (dataset: Dataset): void => {
    const { years, row } = transformData(dataset);

    const doc = new jsPDF("landscape");

    const head: string[][] = [
      ["Kode", "Wilayah", "Komponen", ...years.map(String)],
    ];

    const body: (string | number)[][] = [
      [
        row.kode,
        row.wilayah,
        row.komponen,
        ...years.map((y) => row[y] ?? 0),
      ],
    ];

    doc.text("Dataset Series", 14, 15);

    autoTable(doc, {
      head,
      body,
      startY: 20,
    });

    doc.save(`dataset-${Date.now()}.pdf`);
  };

  return {
    exportExcel,
    exportPDF,
    transformData,
  };
}
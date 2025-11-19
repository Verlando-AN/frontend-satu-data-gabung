import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function DatasetChart({ data }) {
  if (!data || data.length === 0) {
    return (
      <p
        style={{
          color: "#6c757d",
          textAlign: "center",
          margin: "2rem 0",
          fontSize: "14px",
          lineHeight: "1.5",
        }}
      >
        Tidak ada data grafik.
      </p>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="tahun" />
        <YAxis />
        <Tooltip formatter={(value) => [`Jumlah Data: ${value}`, "Jumlah"]} />
        <Legend />
        <Bar dataKey="jumlah" fill="#ff4d4d" />
      </BarChart>
    </ResponsiveContainer>
  );
}

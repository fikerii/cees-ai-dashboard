import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import Table from "../DataTable/client-side-load-table/Table";

// ✅ Tipe data untuk tabel
type ProjekData = {
  id_projek: number;
  nama: string;
  klien: string;
  status: string;
};

// ✅ Data Dummy untuk mengisi tabel
const dummyData: ProjekData[] = [
  { id_projek: 1, nama: "Proyek A", klien: "PT. ABC", status: "Selesai" },
  { id_projek: 2, nama: "Proyek B", klien: "PT. XYZ", status: "Berjalan" },
  { id_projek: 3, nama: "Proyek C", klien: "CV. Maju", status: "Tertunda" },
  { id_projek: 4, nama: "Proyek D", klien: "PT. ABC", status: "Berjalan" },
  { id_projek: 5, nama: "Proyek E", klien: "CV. Maju", status: "Selesai" },
  { id_projek: 6, nama: "Proyek F", klien: "PT. XYZ", status: "Tertunda" },
  { id_projek: 7, nama: "Proyek G", klien: "PT. ABC", status: "Selesai" },
  { id_projek: 8, nama: "Proyek H", klien: "CV. Maju", status: "Berjalan" },
  { id_projek: 9, nama: "Proyek I", klien: "PT. XYZ", status: "Selesai" },
  { id_projek: 10, nama: "Proyek J", klien: "PT. ABC", status: "Berjalan" },
];

// ✅ Definisi kolom tabel
const columns: ColumnDef<ProjekData>[] = [
  {
    header: "ID",
    accessorKey: "id_projek",
    cell: (info) => <span className="text-gray-600">{info.getValue<number>()}</span>,
  },
  {
    header: "Nama Proyek",
    accessorKey: "nama",
    cell: (info) => <span className="font-semibold">{info.getValue<string>()}</span>,
  },
  {
    header: "Klien",
    accessorKey: "klien",
    cell: (info) => <span>{info.getValue<string>()}</span>,
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: (info) => {
      const status = info.getValue<string>();
      return <span className={`px-2 py-1 text-xs rounded-md ${status === "Selesai" ? "bg-green-200 text-green-700" : status === "Berjalan" ? "bg-blue-200 text-blue-700" : "bg-yellow-200 text-yellow-700"}`}>{status}</span>;
    },
  },
];

const TableExample = () => {
  const [search, setSearch] = useState<string>("");
  return (
    <div className="p-4">
      <Table
        data={dummyData} // Menggunakan data dummy
        columns={columns}
        search={search}
        setSearch={setSearch}
        pagination
        searchBar
      />
    </div>
  );
};

export default TableExample;

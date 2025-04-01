import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import Table from "../../components/DataTable/client-side-load-table/Table";
import { useQuery } from "@tanstack/react-query";
import { getProduct, ProductsProps } from "../../api/product";
import Loading from "../../pages/Loading";
import { InfoIcon, PencilIcon, PlusIcon, TrashBinIcon } from "../../icons";
import Button from "../../components/ui/button/Button";
import { AddModal } from "./TableAPI/AddModal";
import { openCRUD } from "../../api/type";
import { EditModal } from "./TableAPI/EditModal";
import { DeleteModal } from "./TableAPI/DeleteModal";

const TableAPI = () => {
  const [id, setId] = useState<number>(0);
  const columns: ColumnDef<ProductsProps>[] = [
    {
      header: "ID",
      accessorKey: "id",
      cell: (info) => <span className="text-gray-600">{info.getValue<number>()}</span>,
    },
    {
      header: "Title",
      accessorKey: "title",
      cell: (info) => <span className="font-semibold">{info.getValue<string>()}</span>,
    },
    // {
    //   header: "Description",
    //   accessorKey: "description",
    //
    // },
    {
      header: "Category",
      accessorKey: "category",
    },
    {
      header: "Price",
      accessorKey: "price",
    },
    {
      header: "Rating",
      accessorKey: "rating",
    },
    {
      header: "Stock",
      accessorKey: "stock",
    },
    {
      header: "Brand",
      accessorKey: "brand",
    },
    // {
    //   header: "SKU",
    //   accessorKey: "sku",
    //
    // },
    {
      header: "Tags",
      accessorKey: "tags",
      cell: (info) => <span>{info.getValue<string[]>().join(", ")}</span>,
    },
    // {
    //   header: "Weight",
    //   accessorKey: "weight",
    //
    // },
    // {
    //   header: "Dimension",
    //   accessorKey: "dimension",
    //
    // },
    // {
    //   header: "Warranty Information",
    //   accessorKey: "warrantyInformation",
    //
    // },
    // {
    //   header: "Availability Status",
    //   accessorKey: "availabilityStatus",
    //
    // },
    // {
    //   header: "Reviews",
    //   accessorKey: "reviews",
    //
    // },
    // {
    //   header: "Images",
    //   accessorKey: "images",
    //   cell: (info) => <span>{info.getValue<string[]>().join(", ")}</span>, },
    {
      header: "Actions",
      accessorKey: "id",
      enableSorting: false,
      cell: (info) => (
        <div className="flex gap-2">
          <Button
            onClick={() => alert("detail of " + info.row.original.id)}
            variant="none"
            className="w-fit px-0 py-0"
          >
            <InfoIcon />
          </Button>
          <Button
            onClick={() => {
              setId(info.row.original.id);
              setIsOpen({ ...isOpen, edit: true });
            }}
            className="w-fit px-0 py-0"
            variant="none"
          >
            <PencilIcon />
          </Button>
          <Button
            onClick={() => {
              setId(info.row.original.id);
              setIsOpen({ ...isOpen, delete: true });
            }}
            className="w-fit px-0 py-0"
            variant="none"
          >
            <TrashBinIcon />
          </Button>
        </div>
      ),
    },
  ];
  const [search, setSearch] = useState<string>("");
  const [isOpen, setIsOpen] = useState<openCRUD>({
    add: false,
    edit: false,
    delete: false,
  });
  const closeAll = () => setIsOpen({ add: false, edit: false, delete: false });

  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getProduct,
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="">
      <AddModal
        isOpen={isOpen.add || false}
        onClose={() => closeAll()}
      />
      <EditModal
        isOpen={isOpen.edit || false}
        onClose={() => {
          closeAll();
          setId(0);
        }}
        id={id}
      />
      <DeleteModal
        isOpen={isOpen.delete || false}
        onClose={() => {
          closeAll();
          setId(0);
        }}
        id={id}
      />
      <Table
        data={data.products} // Menggunakan data dari API
        columns={columns}
        search={search}
        setSearch={setSearch}
        isLoading={isLoading || !data}
        pagination
        addButton={[
          {
            size: "sm",
            variant: "primary",
            onClick: () => setIsOpen({ ...isOpen, add: true }),
            children: "Primary",
            startIcon: <PlusIcon />,
          },
          {
            size: "sm",
            variant: "outline",
            onClick: () => alert("Add new item"),
            children: "Outline",
            startIcon: <PencilIcon />,
          },
        ]}
      />
    </div>
  );
};

export default TableAPI;

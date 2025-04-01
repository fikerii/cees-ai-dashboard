import { ModalProps } from "../../../components/ui/modal";
import InputFormModal from "../../../components/form/modal/InputFormModal";
import { createProduct, createProductsProps, getProductCategory, ProductCategoryProps } from "../../../api/product";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-toastify";
import { handleError } from "../../../utils/helpers";
import Loading from "../../../pages/Loading";

export const AddModal = ({ isOpen, onClose }: ModalProps) => {
  const queryClient = useQueryClient();
  const [product, setProduct] = useState<createProductsProps>({
    title: "",
    category: "",
    price: 0,
    stock: 0,
  });

  const { data, isLoading } = useQuery({
    queryKey: ["productsCategory"],
    queryFn: getProductCategory,
  });

  const { mutateAsync } = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      console.log("Data berhasil diperbaharui");
      onClose();
      handleReset();
      return toast.success("Data berhasil diperbaharui");
    },
    onError: (err: Error) => {
      const errorTypes = ["title", "category", "price", "stock"];
      handleError(err, errorTypes);
      return;
    },
  });

  const handleSubmit = async () => {
    await mutateAsync({
      title: product.title,
      category: product.category,
      price: product.price,
      stock: product.stock,
    });
  };

  const handleReset = () => {
    setProduct({
      title: "",
      category: "",
      price: 0,
      stock: 0,
    });
  };

  if (isLoading) return <Loading />;

  return (
    <>
      <InputFormModal
        title="Add New Data"
        handleSubmit={handleSubmit}
        isOpen={isOpen}
        onClose={() => {
          onClose();
          handleReset();
        }}
        isLoading={isLoading}
        listInput={[
          {
            content: [
              {
                label: "Title",
                input: {
                  type: "text",
                  value: product.title,
                  onChange: (e) => setProduct({ ...product, title: e.target.value }),
                  required: true,
                },
              },
              {
                label: "Category",
                select: {
                  options: data?.map((category: ProductCategoryProps) => ({
                    value: category?.slug,
                    label: category?.name,
                  })),
                  placeholder: "Select Category",
                  onChange: (value) => setProduct({ ...product, category: value }),
                  defaultValue: product.category,
                  isLoading: isLoading,
                },
              },
              {
                label: "Price",
                input: {
                  type: "number",
                  value: product.price,
                  onChange: (e) => setProduct({ ...product, price: parseInt(e.target.value) }),
                },
              },
              {
                label: "Stock",
                input: {
                  type: "number",
                  value: product.stock,
                  onChange: (e) => setProduct({ ...product, stock: parseInt(e.target.value) }),
                },
              },
            ],
          },
        ]}
      />
    </>
  );
};

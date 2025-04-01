import { ModalProps } from "../../../components/ui/modal";
import InputFormModal from "../../../components/form/modal/InputFormModal";
import { createProductsProps, getProductById, getProductCategory, ProductCategoryProps, updateProduct } from "../../../api/product";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { handleError } from "../../../utils/helpers";
import Loading from "../../../pages/Loading";
interface EditModalProps extends ModalProps {
  id: number;
}
export const EditModal = ({ isOpen, onClose, id }: EditModalProps) => {
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

  const { data: productData, isLoading: isProductLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(Number(id)),
    enabled: id !== 0,
  });

  useEffect(() => {
    if (productData && !isProductLoading) {
      setProduct({
        title: productData.title,
        category: productData.category,
        price: productData.price,
        stock: productData.stock,
      });
    }
  }, [productData, isProductLoading]);

  const { mutateAsync } = useMutation({
    mutationFn: updateProduct,
    onSuccess: (value) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      console.log(value);
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
    if (product.title === "") {
      return toast.error("Title is required");
    }
    if (product.category === "") {
      return toast.error("Category is required");
    }
    await mutateAsync({
      id: id,
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

  if (isLoading || isProductLoading) return <Loading />;

  return (
    <>
      <InputFormModal
        title="Edit Data"
        handleSubmit={handleSubmit}
        isOpen={isOpen}
        onClose={() => {
          onClose();
          handleReset();
        }}
        isLoading={isLoading || isProductLoading}
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
                  defaultValue: product.category,
                  placeholder: "Select Category",
                  onChange: (value) => setProduct({ ...product, category: value }),
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

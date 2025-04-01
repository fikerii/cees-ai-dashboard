import React from "react";
import ConfirmationModal from "../../../components/form/modal/ConfirmationModal";
import { ModalProps } from "../../../components/ui/modal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProduct } from "../../../api/product";
import { toast } from "react-toastify";

interface DeleteModalProps extends ModalProps {
  id: number;
}

export const DeleteModal = ({ isOpen, onClose, id }: DeleteModalProps) => {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: deleteProduct,
  });
  const handleDelete = async () => {
    await mutateAsync(id, {
      onSuccess: (value) => {
        queryClient.invalidateQueries({ queryKey: ["products"] });
        toast.success("Data berhasil dihapus");
        console.log(value);
        onClose();
      },
      onError: (err) => {
        const error = err as Error;
        toast.error(error.message);
        onClose();
      },
    });
  };
  return (
    <>
      <ConfirmationModal
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={handleDelete}
        title="Are you want to delete the data?"
        message="The data will be deleted forever!"
        isLoading={isPending}
      />
    </>
  );
};

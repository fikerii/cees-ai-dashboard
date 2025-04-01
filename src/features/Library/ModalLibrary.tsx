import { useState } from "react";
import { useModal } from "../../hooks/useModal";
import Button from "../../components/ui/button/Button";
import ConfirmationModal from "../../components/form/modal/ConfirmationModal";
import AlertModal from "../../components/form/modal/AlertModal";
import InputFormModal from "../../components/form/modal/InputFormModal";
import ComponentCard from "../../components/common/ComponentCard";

export default function ModalLibrary() {
  const { isOpen: isOpenAlert, openModal: openModalAlert, closeModal: closeModalAlert } = useModal();
  const { isOpen: isOpenConfirm, openModal: openModalConfirm, closeModal: closeModalConfirm } = useModal();
  const { isOpen, openModal, closeModal } = useModal();
  const [date, setDate] = useState("");
  const handleSubmit = () => {
    // Handle save logic here
    console.log("Saving changes...");
    closeModal();
  };
  return (
    <>
      <ComponentCard
        title="Modal Library"
        desc="A collection of modal components"
        className="w-fit"
      >
        <div className="space-x-2">
          <Button
            variant="primary"
            onClick={openModalAlert}
          >
            Alert Modal
          </Button>
          <Button
            variant="primary"
            onClick={openModal}
          >
            Input Modal
          </Button>
          <Button
            variant="primary"
            onClick={openModalConfirm}
          >
            Confirmation Modal
          </Button>
        </div>
        <ConfirmationModal
          isOpen={isOpenConfirm}
          title="Confirm"
          message="lorem ipsum dolor amet"
          onClose={closeModalConfirm}
          onConfirm={() => closeModalConfirm()}
        />
        <AlertModal
          isOpen={isOpenAlert}
          title="Alert"
          message="lorem ipsum dolor amet"
          onClose={closeModalAlert}
          variant="error"
        />
        <InputFormModal
          title="Input Modal"
          description="lorem ipsum dolor sit amet"
          onClose={closeModal}
          isOpen={isOpen}
          handleSubmit={handleSubmit}
          listInput={[
            {
              //   subtitle: "Chat",
              content: [
                {
                  label: "Chat",
                  input: {
                    type: "text",
                    value: date,
                    onChange: (e) => setDate(e.target.value),
                  },
                  gridfull: true,
                },
              ],
            },
          ]}
        />
      </ComponentCard>
    </>
  );
}

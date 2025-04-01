import { Modal, ModalProps } from "../../ui/modal";
import Button from "../../ui/button/Button";

export interface ConfirmationModalProps extends ModalProps {
  title?: string;
  description?: string;
  message?: string;
  onConfirm: () => void;
}

export default function ConfirmationModal({ title, description, message, isOpen, onClose, onConfirm, size, isLoading }: ConfirmationModalProps) {
  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size={size}
        isLoading={isLoading}
      >
        <div className="relative w-full p-4 overflow-y-auto bg-white no-scrollbar rounded-3xl dark:bg-gray-900 lg:p-11 text-start">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">{title}</h4>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">{description}</p>
          </div>
          <div className=" px-2 mt-6 text-xl text-gray-800 dark:text-gray-400">{message}</div>
          <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
            <Button
              size="sm"
              variant="outline"
              onClick={onClose}
            >
              Close
            </Button>
            <Button
              size="sm"
              onClick={onConfirm}
            >
              Confirm
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}

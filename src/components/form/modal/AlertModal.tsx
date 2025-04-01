import { Link } from "react-router";
import { alertIcons, AlertProps, alertVariantClasses } from "../../ui/alert/Alert";
import Button from "../../ui/button/Button";
import { Modal, ModalProps } from "../../ui/modal";

export default function AlertModal({ variant, isOpen, onClose, size = "sm", title, message, showLink = false, linkHref = "#", linkText = "Learn more" }: ModalProps & AlertProps) {
  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size={size}
        showCloseButton={false}
      >
        <div className={`relative w-full p-4 overflow-y-auto no-scrollbar rounded-3xl lg:p-11 text-start ${alertVariantClasses[variant].container}`}>
          <div className="px-2 pr-14 flex items-center gap-3">
            <div className={` ${alertVariantClasses[variant].icon}`}>{alertIcons[variant]}</div>
            <h4 className="text-2xl font-semibold text-gray-800 dark:text-white/90">{title}</h4>
            {/* <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">{description}</p> */}
          </div>
          <div className=" px-2 mt-6 text-xl text-gray-800 dark:text-gray-400">{message}</div>
          {showLink && (
            <Link
              to={linkHref}
              className="inline-block mt-3 text-sm font-medium text-gray-500 underline dark:text-gray-400"
            >
              {linkText}
            </Link>
          )}
          <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
            <Button
              size="sm"
              variant="outline"
              onClick={onClose}
            >
              Close
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}

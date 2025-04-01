import { Modal, ModalProps } from "../../ui/modal";
import Label from "../Label";
import Input, { InputProps } from "../input/InputField";
import Button from "../../ui/button/Button";
import Select, { SelectProps } from "../Select";

export interface InputFormModalProps extends ModalProps {
  title?: string;
  description?: string;
  handleSubmit: () => void;
  listInput: {
    subtitle?: string;
    content: {
      label: string;
      input?: InputProps;
      select?: SelectProps;
      gridfull?: boolean;
    }[];
  }[];
}

export default function InputFormModal({ title, description, isOpen, onClose, handleSubmit, listInput, size, isLoading }: InputFormModalProps) {
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
            {description && <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">{description}</p>}
          </div>
          <form className="flex flex-col">
            <div className="px-2 overflow-y-auto custom-scrollbar">
              {listInput.map((listInput, i) => (
                <div key={i}>
                  {listInput.subtitle && <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">{listInput.subtitle}</h5>}
                  <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                    {listInput.content.map((axx, i) => (
                      <div
                        key={i}
                        className={`${axx.gridfull ? "lg:col-span-2" : "lg:grid-cols-1"}`}
                      >
                        <Label>{axx.label}</Label>
                        {axx.input && <Input {...axx.input} />}
                        {axx.select && <Select {...axx.select} />}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
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
                onClick={handleSubmit}
              >
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}

import { Button } from "@/components";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/react";
import { createContext, useCallback, useContext, useState } from "react";

type DialogOptions = {
  title: string;
  content: React.ReactNode;
  options?: {
    size?:
      | "xs"
      | "sm"
      | "md"
      | "lg"
      | "xl"
      | "2xl"
      | "3xl"
      | "4xl"
      | "5xl"
      | "full";
    onOk?: () => void;
    onCancel?: () => void;
    okText?: string;
    cancelText?: string;
    hideCancel?: boolean;
    hideActions?: boolean;
  };
};

type DialogContextType = {
  showDialog: (options: DialogOptions) => void;
  hideDialog: () => void;
  hideAllDialogs: () => void;
};

const DialogContext = createContext<DialogContextType>({
  showDialog: () => {},
  hideDialog: () => {},
  hideAllDialogs: () => {},
});

export function DialogProvider({ children }: { children: React.ReactNode }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [dialogStack, setDialogStack] = useState<DialogOptions[]>([]);

  const showDialog = useCallback(
    (options: DialogOptions) => {
      setDialogStack((prev) => [...prev, options]);
      onOpen();
    },
    [onOpen],
  );

  const hideDialog = useCallback(() => {
    if (dialogStack.length > 0) {
      setDialogStack((prev) => prev.slice(0, -1));
    }
    if (dialogStack.length <= 1) {
      onClose();
    }
  }, [dialogStack, onClose]);

  const hideAllDialogs = useCallback(() => {
    setDialogStack([]);
    onClose();
  }, [onClose]);

  const {
    title,
    content,
    options: {
      size,
      okText,
      cancelText,
      hideCancel,
      hideActions,
      onOk,
      onCancel,
    } = {},
  } = dialogStack[dialogStack.length - 1] || {};

  return (
    <DialogContext.Provider
      value={{
        showDialog,
        hideDialog,
        hideAllDialogs,
      }}
    >
      {children}
      <Modal
        size={size}
        isOpen={isOpen}
        onClose={hideDialog}
        scrollBehavior="inside"
      >
        <ModalContent>
          <ModalHeader>{title || "Dialog"}</ModalHeader>
          <ModalBody>{content}</ModalBody>
          {!hideActions && (
            <ModalFooter>
              {!hideCancel && (
                <Button
                  variant="ioLight"
                  onPress={() => {
                    onCancel && onCancel();
                    hideDialog();
                  }}
                >
                  {cancelText || "Cancel"}
                </Button>
              )}
              <Button
                variant="ioSolid"
                onPress={() => {
                  onOk && onOk();
                  hideDialog();
                }}
              >
                {okText || "Ok"}
              </Button>
            </ModalFooter>
          )}
        </ModalContent>
      </Modal>
    </DialogContext.Provider>
  );
}

export const useDialog = () => useContext(DialogContext);

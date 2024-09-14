import { Dispatch, SetStateAction } from "react";

export interface ModalProps {
  children: React.ReactNode;
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  onClickPrimaryButton?: () => void;
  onClickSecondaryButton?: () => void;
  modalContent: React.ReactNode;
  primaryButton?: React.ReactNode;
  secondaryButton?: React.ReactNode;
}

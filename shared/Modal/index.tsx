import { useState } from "react";
import { ModalProps } from "./typings";
import clsx from "clsx";

export const Modal: React.FC<ModalProps> = ({
  children,
  openModal,
  setOpenModal,
  onClickPrimaryButton,
  onClickSecondaryButton,
  modalContent,
}) => {
  return (
    <div>
      <div className="w-full relative">
        {children}

        <div
          id="pd-slide-down-modal"
          className={`pd-overlay ${
            openModal ? "block" : "hidden"
          } w-full h-full fixed top-0 left-0 z-[100] overflow-x-hidden overflow-y-auto bg-overlay	`}
          onClick={() => {
            setOpenModal(false);
          }}
        >
          <div
            className={clsx(
              "transition-all duration-500 ease-out transform  m-5 sm:mx-auto ",
              openModal ? "opacity-100 scale-100" : "opacity-0 scale-95"
            )}
          >
            <div
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="flex flex-col bg-white rounded-2xl py-4 px-5  m-32   "
            >
              <div className="flex justify-between items-center pb-4 border-b border-gray-200 ">
                <h4 className="text-sm text-gray-900 font-medium">
                  Create Contract
                </h4>
                <button
                  className="block cursor-pointer close-modal-button"
                  data-pd-overlay="#pd-slide-down-modal"
                  data-modal-target="pd-slide-down-modal"
                  onClick={() => {
                    setOpenModal(false);
                  }}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.75732 7.75739L16.2426 16.2427M16.2426 7.75739L7.75732 16.2427"
                      stroke="black"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    ></path>
                  </svg>
                </button>
              </div>
              <div className="overflow-y-auto py-4 min-h-[100px] h-70vh">
                {modalContent}
              </div>
              <div className="flex items-center justify-end pt-4 border-t border-gray-200 space-x-4">
                {onClickSecondaryButton && (
                  <button
                    type="button"
                    className="py-2.5 px-5 text-xs bg-indigo-50 text-indigo-500 rounded-full cursor-pointer font-semibold text-center shadow-xs transition-all duration-500 hover:bg-indigo-100 close-modal-button"
                    onClick={onClickSecondaryButton}
                  >
                    Go, Back
                  </button>
                )}
                {onClickPrimaryButton && (
                  <button
                    type="button"
                    className="py-2.5 px-5 text-xs bg-indigo-500 text-white rounded-full cursor-pointer font-semibold text-center shadow-xs transition-all duration-500 hover:bg-indigo-700 close-modal-button"
                    onClick={onClickPrimaryButton}
                  >
                    Create
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import gameColor from "../utils/gameColor";

const Modal = (props) => {
  const { color } = props;

  const closeModal = () => {
    props.setIsOpen(false);
  };

  return (
    <>
      <Transition appear show={props.isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => null}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-[#171717] bg-opacity-30" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    {props.modalTitle}
                  </Dialog.Title>
                  <div className="mb-10 mt-4">{props.modalContent}</div>

                  <div className="mt-4 flex justify-end">
                    <button
                      type="button"
                      className={`inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium transition-all hover:opacity-75 focus:outline-none ${gameColor[color].correctText} ${gameColor[color].correctTile}`}
                      onClick={
                        props.closeModalEvent
                          ? props.closeModalEvent
                          : closeModal
                      }
                    >
                      {props.modalButton}
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Modal;

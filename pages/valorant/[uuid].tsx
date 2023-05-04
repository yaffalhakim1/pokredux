/* eslint-disable @next/next/no-img-element */
import React, { useState, Fragment, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { selectValorantByUuid } from "@/redux/store/valorants/valorantSlice";
import { useSelector } from "react-redux";
import { GetServerSideProps } from "next";
import axios from "axios";
import { ValorantData } from "@/types/valorantTypes";

interface DetailProps {
  data: ValorantData;
}

export const getServerSideProps: GetServerSideProps<{
  data: ValorantData;
}> = async (context) => {
  const agentUuid = context.query.uuid! as any;
  const response =
    await axios.get(`https://valorant-api.com/v1/agents/${agentUuid}
  `);
  return {
    props: {
      data: response.data.data,
    },
  };
};

export default function DetailValorant({ data }: DetailProps) {
  const valorantId = data.uuid;
  const valorant = useSelector((state: any) =>
    selectValorantByUuid(state, valorantId)
  ) as any;

  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
      >
        Detail
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
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
                    className="text-xl font-semibold leading-6 text-gray-900"
                  >
                    <div>
                      <img
                        src={valorant.displayIconSmall}
                        className="h-12 w-12"
                        alt=""
                      />
                    </div>

                    <div className="flex-col">
                      {valorant.displayName}
                      {valorant.role ? (
                        <span className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300 ml-2">
                          {valorant.role.displayName}
                        </span>
                      ) : (
                        <span className="text-sm text-gray-500">
                          No role found.
                        </span>
                      )}
                    </div>
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-md text-gray-700 font-medium">
                      Description
                    </p>
                    {valorant.description ? (
                      valorant.description
                    ) : (
                      <p>No abilities found.</p>
                    )}
                  </div>
                  <div className="mt-2">
                    <p className="text-md text-gray-700 font-medium mb-4">
                      Skills
                    </p>
                    <div className="grid grid-cols-4 gap-3">
                      {valorant.abilities ? (
                        valorant.abilities.map((ability: any) => (
                          <div key={ability.uuid}>
                            <div className="bg-blue-500 rounded-full h-20 w-20  flex items-center justify-center mb-2">
                              <img
                                src={ability.displayIcon}
                                alt=""
                                className="h-12 w-12"
                              />
                            </div>
                            <p className="">{ability.displayName}</p>
                          </div>
                        ))
                      ) : (
                        <p>No abilities found.</p>
                      )}
                    </div>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Got it, thanks!
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
}

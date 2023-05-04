/* eslint-disable @next/next/no-img-element */
import React, { useState, Fragment, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { selectPokemonById } from "@/redux/store/pokemons/pokemonSlice";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import axios from "axios";

interface Pokemon {
  name?: string | any;
  abilities?: { ability: { name: string } }[] | any;
  types?: { type: { name: string } }[];
  stats?: { base_stat: number; stat: { name: string } }[];
  moves?: { move: { name: string } }[];
  sprites?: { front_default: string; front_shiny: string };
  id?: any;
}

interface DetailProps {
  data: Pokemon;
}

export const getServerSideProps: GetServerSideProps<{ data: Pokemon }> = async (
  context
) => {
  const id = context.query.id as any;
  const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
  return {
    props: {
      data: response.data,
    },
  };
};

export default function DetailPokemon({ data }: DetailProps) {
  const pokemonId = data.id;
  const pokemon = useSelector((state: any) =>
    selectPokemonById(state, pokemonId)
  ) as any;

  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const [isLoading, setIsLoading] = useState(true);

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
                    <div className="flex">
                      <img src={pokemon.sprites?.front_shiny} alt="" />
                      <img src={pokemon.sprites?.front_default} alt="" />
                    </div>
                    {pokemon!.name!.charAt(0).toUpperCase() +
                      pokemon!.name!.slice(1)}
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-md text-gray-700 font-medium">
                      Abilities
                    </p>
                    {pokemon.abilities ? (
                      pokemon.abilities.map((ability: any) => (
                        <div key={ability.ability.name}>
                          <li className="text-sm text-gray-800">
                            {ability.ability.name}
                          </li>
                        </div>
                      ))
                    ) : (
                      <p>No abilities found.</p>
                    )}
                  </div>
                  <div className="mt-2">
                    <p className="text-md text-gray-700 font-medium">Moves</p>
                    {pokemon.moves ? (
                      pokemon.moves.slice(0, 5).map((move: any) => (
                        <div key={move.move.name}>
                          <li className="text-sm text-gray-800">
                            {move.move.name}
                          </li>
                        </div>
                      ))
                    ) : (
                      <p>No moves found.</p>
                    )}
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

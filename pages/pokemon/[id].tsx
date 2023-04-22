/* eslint-disable @next/next/no-img-element */
import React, { useState, Fragment, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import { selectPokemonById } from "@/redux/store/pokemons/pokemonSlice";
import { RootState } from "@/redux/store";

interface Pokemon {
  name?: string;
  abilities?: { ability: { name: string } }[] | any;
  types?: { type: { name: string } }[];
  stats?: { base_stat: number; stat: { name: string } }[];
  moves?: { move: { name: string } }[];
  sprites?: { front_default: string; front_shiny: string };
  id?: any;
}

type DetailPokemonProps = {
  pokemon: Pokemon;
  // id: any;
};

// export const getStaticPaths: GetStaticPaths = async () => {
//   const response = await axios.get(
//     "https://pokeapi.co/api/v2/pokemon/?limit=100"
//   );
//   const pokemonList = response.data;
//   const paths = pokemonList.map((pokemon: any) => ({
//     params: { id: pokemon.id.toString() },
//   }));
//   // const { results } = response.data;

//   // const paths = results.map((result: any) => ({
//   //   params: { id: result.id },
//   // }));

//   return {
//     paths,
//     fallback: false, // generate a 404 page for unknown Pokemon IDs
//   };
// };

// export async function getStaticProps({ params }: { params: { id: string } }) {
//   const { id } = params as { id: string };

//   const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);

//   return {
//     props: {
//       data: response,
//     },
//   };
// }

export const getServerSideProps = async (
  context: any
): Promise<{ props: DetailPokemonProps }> => {
  const id = context.params.id;
  const { data } = await axios.get<Pokemon>(
    `https://pokeapi.co/api/v2/pokemon/${id}`
  );
  const pokemon = selectPokemonById(
    { pokemons: { entities: { [id]: data } } } as RootState,
    id
  ) as Pokemon;

  return {
    props: { pokemon },
  };
};

// export const getServerSideProps: GetServerSideProps<{ data: Pokemon }> = async (
//   context
// ) => {
//   const id = context.query.id;
//   const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);

//   return {
//     props: {
//       data: response.data,
//     },
//   };
// };

export default function DetailPokemon({ pokemon }: DetailPokemonProps) {
  const pokemonData = pokemon;
  console.log(pokemonData, "ini pokemon data");
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const [isLoading, setIsLoading] = useState(true);
  const [pok, setPokemon] = useState<Pokemon>();
  const id = pokemonData.id;

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${id}`
      );
      const data = response.data as Pokemon;
      setPokemon(data);
      console.log(data, "ini data");
      setIsLoading(false);
    };
    fetchData();
  }, [id]);

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
                    className="text-lg font-semibold leading-6 text-gray-900"
                  >
                    <div className="flex">
                      <img src={pok!.sprites?.front_shiny} alt="" />
                      <img src={pok!.sprites?.front_default} alt="" />
                    </div>
                    {pok!.name!.charAt(0).toUpperCase() + pok!.name!.slice(1)}
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-md text-gray-700 font-medium">
                      Abilities
                    </p>
                    {pok!.abilities ? (
                      pok!.abilities.map((ability: any) => (
                        <div key={ability.ability.name}>
                          <li className="text-sm text-gray-500">
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
                    {pok!.moves ? (
                      pok!.moves.map((move: any) => (
                        <div key={move.move.name}>
                          <li className="text-sm text-gray-500">
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

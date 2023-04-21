import { LoadingIcon } from "@/components/icons";
import Pokebox from "@/components/pokebox";
import { AppDispatch } from "@/redux/store";
import {
  fetchPokemons,
  selectAllPokemons,
} from "@/redux/store/pokemons/pokemonSlice";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import DetailPokemon from "./detail/[id]";

export default function Pokemon({ pokemon }: { pokemon: any }) {
  const [filter, setFilter] = useState("");

  const dispatch = useDispatch<AppDispatch>();
  const pokemons = useSelector(selectAllPokemons);
  const pokemonStatus = useSelector((state: any) => state.pokemons.status);
  const error = useSelector((state: any) => state.pokemons.error);

  useEffect(() => {
    if (pokemonStatus === "idle") {
      dispatch(fetchPokemons(20));
    }
  }, [pokemonStatus, dispatch]);

  let pokedex;
  if (pokemonStatus === "loading") {
    pokedex = (
      <div className="text-center flex items-center justify-center h-screen">
        <LoadingIcon />
      </div>
    );
  } else if (pokemonStatus === "succeeded") {
    pokedex = pokemons.map((pokemon: any) => (
      <div key={pokemon.id}>
        <Link href={`/pokemon/detail/${pokemon.id}`}>
          <Pokebox
            name={pokemon.name}
            id={pokemon.id}
            image={pokemon.sprites.front_default}
          />
        </Link>
      </div>
    ));
  } else if (pokemonStatus === "failed") {
    pokedex = <div>{error}</div>;
  }

  return (
    <>
      <h1 className="text-center text-2xl mt-5 mb-5">Pokemon</h1>

      <div className="mx-[80px] grid grid-cols-2 md:grid-cols-3 gap-4">
        {pokedex}
      </div>
    </>
  );
}

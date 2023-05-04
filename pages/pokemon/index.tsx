import { LoadingIcon } from "@/components/icons";
import { Pokebox } from "@/components/box";
import { AppDispatch } from "@/redux/store";
import {
  fetchPokemons,
  selectAllPokemons,
} from "@/redux/store/pokemons/pokemonSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

interface pokebox {
  name?: any;
  id?: any;
  image?: string;
}

export default function Pokemon(props: pokebox) {
  const dispatch = useDispatch<AppDispatch>();
  const pokemons = useSelector(selectAllPokemons) as any;
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
        <Pokebox
          name={pokemon.name}
          id={pokemon.id}
          image={pokemon.sprites.front_default}
        />
      </div>
    ));
  } else if (pokemonStatus === "failed") {
    pokedex = <div>{error}</div>;
  }
  return (
    <>
      <h1 className="text-center text-2xl mt-5 mb-5">Pokemon</h1>
      <div className="md:mx-[80px] mx-5 grid grid-cols-2 md:grid-cols-3 gap-4">
        {pokedex}
      </div>
    </>
  );
}

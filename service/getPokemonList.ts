import { AppDispatch } from "@/redux/store";
import {
  AppThunk,
  getPokemonDetailsFailure,
  getPokemonDetailsStart,
  getPokemonDetailsSuccess,
  getPokemonListFailure,
  getPokemonListStart,
  getPokemonListSuccess,
} from "@/redux/store/pokemons/pokemonSlice";
import axios from "axios";

export const fetchPokemonList =
  (): AppThunk => async (dispatch: AppDispatch) => {
    dispatch(getPokemonListStart());
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?limit=50`
      );
      dispatch(getPokemonListSuccess(response.data.results));
    } catch (error: any) {
      dispatch(getPokemonListFailure(error.message));
    }
  };

export const fetchPokemonDetails =
  (url: string): AppThunk =>
  async (dispatch: AppDispatch) => {
    dispatch(getPokemonDetailsStart());
    try {
      const response = await axios.get(url);
      dispatch(getPokemonDetailsSuccess(response.data));
    } catch (error: any) {
      dispatch(getPokemonDetailsFailure(error.message));
    }
  };

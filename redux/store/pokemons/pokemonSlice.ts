import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";

// const pokemonApi = `https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20`

const pokemonsAdapter = createEntityAdapter();

const initialState = pokemonsAdapter.getInitialState({
  status: "idle",
  error: "",
});

export const fetchPokemons = createAsyncThunk(
  "pokemons/fetchPokemons",
  async (limit: number) => {
    const res = await axios
      .get("https://pokeapi.co/api/v2/pokemon", { params: { limit: limit } })
      .then((res) => res.data.results)
      .then((results) => {
        return Promise.all(results.map((res: any) => axios.get(res.url)));
      })
      .then((results) => {
        return results.map((res) => res.data);
      });
    return res;
  }
);

const pokemonsSlice = createSlice({
  name: "pokemons",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPokemons.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchPokemons.fulfilled, (state, action) => {
        state.status = "succeeded";
        // state.pokemons.push(action.payload)
        pokemonsAdapter.setAll(state, action.payload);
      })
      .addCase(fetchPokemons.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message!;
      });
  },
});

export default pokemonsSlice.reducer;

export const {
  selectAll: selectAllPokemons,
  selectById: selectPokemonById,
  selectIds: selectPokemonIds,
} = pokemonsAdapter.getSelectors((state: any) => state.pokemons) as any;

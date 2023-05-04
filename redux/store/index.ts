import { configureStore } from "@reduxjs/toolkit";
import pokemonsReducer from "./pokemons/pokemonSlice";
import valorantReducer from "./valorants/valorantSlice";
import ptReducer from "./pt/ptSlice";

export const store = configureStore({
  reducer: {
    pokemons: pokemonsReducer,
    valorants: valorantReducer,
    pt: ptReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

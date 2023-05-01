import { configureStore } from "@reduxjs/toolkit";
import pokemonsReducer from "./pokemons/pokemonSlice";
import valorantReducer from "./valorant/valorantSlice";

export const store = configureStore({
  reducer: {
    pokemons: pokemonsReducer,
    valorants: valorantReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

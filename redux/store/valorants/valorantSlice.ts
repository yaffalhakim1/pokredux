import { ValorantData } from "@/types/valorantTypes";
import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";

const valorantAdapter = createEntityAdapter({
  selectId: (valorant: ValorantData) => valorant.uuid as string,
});

const initialState = valorantAdapter.getInitialState({
  status: "idle",
  error: "" as any,
});

export const fetchValorants = createAsyncThunk(
  "valorants/fetchValorants",
  async () => {
    const response = await axios
      .get("https://valorant-api.com/v1/agents")
      .then((response) => response.data.data)
      .then((agents) => {
        return Promise.all(
          agents.map((agent: any) =>
            axios.get(`https://valorant-api.com/v1/agents/${agent.uuid}`)
          )
        );
      })
      .then((agentDetails) => {
        return agentDetails.map((response) => response.data.data);
      });

    return response;
  }
);

const valorantsSlice = createSlice({
  name: "valorants",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchValorants.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchValorants.fulfilled, (state, action) => {
        state.status = "succeeded";
        action.payload.forEach((agent) => {
          valorantAdapter.addOne(state, agent);
        });
      })
      .addCase(fetchValorants.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default valorantsSlice.reducer;

export const {
  selectAll: selectAllValorants,
  selectById: selectValorantByUuid,
  selectIds: selectValorantUuids,
} = valorantAdapter.getSelectors((state: any) => state.valorants) as any;

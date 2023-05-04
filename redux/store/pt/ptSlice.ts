import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";
import { PTData } from "@/types/ptTypes";
import { z } from "zod";

const ptAdapter = createEntityAdapter({
  selectId: (pt: PTData) => pt.id_sp!,
});

const initialState = ptAdapter.getInitialState({
  status: "idle",
  error: "" as any,
});

export const fetchPt = createAsyncThunk("pt/fetchPt", async () => {
  const ptSchema = z.array(
    z.object({
      id_sp: z.string().uuid(),
      kode_pt: z.string().trim(),
      nama_pt: z.string().optional(),
    })
  );
  const response = await axios.get(
    "https://api-frontend.kemdikbud.go.id/loadpt"
  );
  const data = ptSchema.parse(response.data.data);
  console.table(data);
  return data;
});

const ptSlice = createSlice({
  name: "pt",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPt.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchPt.fulfilled, (state, action) => {
        state.status = "succeeded";
        action.payload.forEach((pt: any) => {
          ptAdapter.addOne(state, pt);
        });
      })
      .addCase(fetchPt.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default ptSlice.reducer;

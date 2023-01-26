import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Alchemy, Network } from "alchemy-sdk";

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};
const alchemy = new Alchemy(settings);

export const fetchLatestBlockWithTransactions = createAsyncThunk(
  "blocks/fetchLatestBlocks",
  async (blockNumber) => {
    console.log("blockNumber", blockNumber);
    // const blockNumber = await alchemy.core.getBlockNumber();
    const block = await alchemy.core.getBlockWithTransactions(blockNumber);
    return block;
  }
);

export const blockSlice = createSlice({
  name: "blocks",
  initialState: {
    blocks: [],
    loading: true,
    error: null,
    latestBlockNumber: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchLatestBlockWithTransactions.pending,
      (state, action) => {
        state.loading = true;
      }
    );
    builder.addCase(
      fetchLatestBlockWithTransactions.fulfilled,
      (state, action) => {
        state.loading = false;
        state.blocks.unshift(action.payload);
        state.latestBlockNumber = action.payload.number;
      }
    );
    builder.addCase(
      fetchLatestBlockWithTransactions.rejected,
      (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      }
    );
  },
});

// export const { getBlockStart, getBlockSuccess, getBlockFailure } =
//   blockSlice.actions;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fpoList: [],
  currentFpo: null,
  loading: false,
  error: null,
};

const fpoRegistrationSlice = createSlice({
  name: "fpoRegistration",
  initialState,
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setFpoList(state, action) {
      state.fpoList = action.payload;
    },
    setCurrentFpo(state, action) {
      state.currentFpo = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    clearCurrentFpo(state) {
      state.currentFpo = null;
    },
  },
});

export const {
  setLoading,
  setFpoList,
  setCurrentFpo,
  setError,
  clearCurrentFpo,
} = fpoRegistrationSlice.actions;

export default fpoRegistrationSlice.reducer;

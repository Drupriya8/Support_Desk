import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchRepositories } from "./api";

const GITHUB_API_URL = "https://api.github.com";

const initialState = {
    repositories: [],
    selectedRepository: null,
    contributors: null,
}

const apiSlice = createSlice({
    name: "repositories",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchRepositoriesAsync.fulfilled, (state, action) => {
                state.repositories = action.payload;
            })
            .addCase(setSelectedRepository, (state, action) => {
                state.selectedRepository = action.payload;
                state.contributors = null;
            })
            .addCase(fetchContributorsAsync.fulfilled, (state, action) => {
                state.contributors = action.payload;
            });
    }
})


export const fetchRepositoriesAsync = createAsyncThunk(
    "repositories/fetchRepositories",
    async () => {
      const repositories = await fetchRepositories();
      return repositories;
    }
  );
  
  export const setSelectedRepository = (repository) => ({
    type: "repositories/setSelectedRepository",
    payload: repository,
  });
  
  export const fetchContributorsAsync = createAsyncThunk(
    "repositories/fetchContributors",
    async ({ owner, repo }) => {
      const url = `${GITHUB_API_URL}/repos/${owner}/${repo}/stats/contributors`;
      const response = await fetch(url);
      const data = await response.json();
      return data;
    })


export default apiSlice.reducer

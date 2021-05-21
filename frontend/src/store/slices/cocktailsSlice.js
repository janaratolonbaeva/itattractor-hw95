import {createSlice} from "@reduxjs/toolkit";

export const initialState = {
  cocktails: null,
  cocktailsLoading: false,
  cocktailsError: null,
  userCocktails: null,
  userCocktailsLoading: false,
  userCocktailsError: null,
  cocktailItem: null,
  cocktailItemLoading: false,
  cocktailItemError: null,
  cocktailLoading: false,
  cocktailError: null,
};

const name = 'cocktails';

const cocktailsSlice = createSlice({
  name,
  initialState,
  reducers: {
    fetchCocktailsRequest: state => {
      state.cocktailsLoading = true;
    },
    fetchCocktailsSuccess: (state, {payload: cocktails}) => {
      state.cocktailsLoading = false;
      state.cocktails = cocktails;
    },
    fetchCocktailsFailure: (state, {payload: error}) => {
      state.cocktailsLoading = false;
      state.cocktailsError = error;
    },
    postCocktailRequest: state => {
      state.cocktailLoading = true;
    },
    postCocktailSuccess: state => {
      state.cocktailLoading = false;
    },
    postCocktailFailure: (state, {payload: error}) => {
      state.cocktailLoading = false;
      state.cocktailError = error;
    },
    getCocktailItemRequest: state => {
      state.cocktailItemLoading = true;
    },
    getCocktailItemSuccess: (state, {payload: cocktail}) => {
      state.cocktailItemLoading = false;
      state.cocktailItem = cocktail;
    },
    getCocktailItemFailure: (state, {payload: error}) => {
      state.cocktailItemLoading = false;
      state.cocktailItemError = error;
    },
    removeCocktailItemRequest: (state) => {
      state.cocktailItemLoading = true;
    },
    removeCocktailItemSuccess: (state, {payload: cocktailId}) => {
      state.cocktailItemLoading = false;
      state.cocktails = state.cocktails.filter(c => c._id !== cocktailId);
    },
    removeCocktailItemFailure: (state, {payload: error}) => {
      state.cocktailItemLoading = false;
      state.cocktailItemError = error;
    },
    publishedCocktailItemRequest: (state) => {
      state.cocktailItemLoading = true;
    },
    publishedCocktailItemSuccess: (state) => {
      state.cocktailItemLoading = false;
    },
    publishedCocktailItemFailure: (state, {payload: error}) => {
      state.cocktailItemLoading = false;
      state.cocktailItemError = error;
    },
    fetchUserCocktailsRequest: (state) => {
      state.cocktailsLoading = true;
    },
    postRatingRequest: (state) => {
      state.cocktailItemLoading = true;
    }
  }
});

export default cocktailsSlice;
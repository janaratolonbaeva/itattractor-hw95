import cocktailsSlice from "../slices/cocktailsSlice";

export const {
  fetchCocktailsRequest,
  fetchCocktailsSuccess,
  fetchCocktailsFailure,
  postCocktailRequest,
  postCocktailSuccess,
  postCocktailFailure,
  getCocktailItemRequest,
  getCocktailItemSuccess,
  getCocktailItemFailure,
  removeCocktailItemRequest,
  removeCocktailItemSuccess,
  removeCocktailItemFailure,
  publishedCocktailItemRequest,
  publishedCocktailItemSuccess,
  publishedCocktailItemFailure,
  fetchUserCocktailsRequest,
  postRatingRequest
} = cocktailsSlice.actions;
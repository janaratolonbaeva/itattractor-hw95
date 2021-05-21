import {put, takeEvery} from "redux-saga/effects";
import axiosApi from "../../axiosApi";
import {
  fetchCocktailsFailure,
  fetchCocktailsRequest,
  fetchCocktailsSuccess,
  fetchUserCocktailsRequest,
  getCocktailItemFailure,
  getCocktailItemRequest,
  getCocktailItemSuccess,
  postCocktailFailure,
  postCocktailRequest,
  postCocktailSuccess, postRatingSuccess,
  publishedCocktailItemFailure,
  publishedCocktailItemRequest,
  publishedCocktailItemSuccess,
  removeCocktailItemFailure,
  removeCocktailItemRequest,
  removeCocktailItemSuccess
} from "../actions/cocktailsActions";
import {historyPush} from "../actions/historyActions";
import {addNotification} from "../actions/notifierActions";

export function* postCocktail ({payload: cocktail}) {
  try {
    yield axiosApi.post('/cocktails', cocktail);
    yield put(postCocktailSuccess());
    yield put(historyPush('/'));
    yield put(addNotification({message: 'Cocktail created successfully', options: {variant: 'success'}}));
  } catch (e) {
    yield put(postCocktailFailure(e.response.data));
    yield put(addNotification({message: 'Create cocktail failed', options: {variant: 'error'}}));
  }
}

export function* fetchCocktails () {
  try {
    const response = yield axiosApi.get('/cocktails/all');
    yield put(fetchCocktailsSuccess(response.data));
  } catch (e) {
    yield put(fetchCocktailsFailure(e));
    yield put(addNotification({message: 'Fetch cocktails failed', options: {variant: 'error'}}));
  }
}

export function* removeCocktail ({payload: cocktailId}) {
  try {
    yield axiosApi.delete('/cocktails/' + cocktailId);
    yield put(removeCocktailItemSuccess(cocktailId));
    yield put(addNotification({message: 'Cocktail deleted successfully', options: {variant: 'success'}}));
  } catch (e) {
    yield put(removeCocktailItemFailure(e.response.data));
    yield put(addNotification({message: 'Delete cocktail failed', options: {variant: 'error'}}));
  }
}

export function* publishedCocktail ({payload: cocktailId}) {
  try {
    const response = yield axiosApi.put('/cocktails/' + cocktailId);
    yield put(publishedCocktailItemSuccess(cocktailId));
    yield put(addNotification({message: 'Cocktail published successfully', options: {variant: 'success'}}));
    yield put(fetchCocktailsRequest(response.data));
  } catch (e) {
    yield put(publishedCocktailItemFailure(e));
    yield put(addNotification({message: 'Publish cocktail failed', options: {variant: 'error'}}));
  }
}

export function* fetchUserCocktails () {
  try {
    const response = yield axiosApi.get('/cocktails/user-cocktails');
    yield put(fetchCocktailsSuccess(response.data));
  } catch (e) {
    yield put(fetchCocktailsFailure(e));
    yield put(addNotification({message: 'Fetch cocktails failed', options: {variant: 'error'}}));
  }
}

export function* getCocktailItem ({payload: id}) {
  try {
    const response = yield axiosApi.get('cocktails/' + id);
    yield put(getCocktailItemSuccess(response.data));
  } catch (e) {
    yield put(getCocktailItemFailure(e));
    yield put(addNotification({message: 'Fetch cocktail failed', options: {variant: 'error'}}));
  }
}

export function* postRating ({payload: rating}) {
  try {
    const response = yield axiosApi.post('cocktails/rating', rating);
    yield put(getCocktailItemSuccess(response.data));
    yield put(addNotification({message: 'Posted rating successfully', options: {variant: 'success'}}));
  } catch (e) {
    yield put(getCocktailItemFailure(e));
    yield put(addNotification({message: 'Post rating failed', options: {variant: 'error'}}));
  }
}

const cocktailsSagas = [
  takeEvery(postCocktailRequest, postCocktail),
  takeEvery(fetchCocktailsRequest, fetchCocktails),
  takeEvery(removeCocktailItemRequest, removeCocktail),
  takeEvery(publishedCocktailItemRequest, publishedCocktail),
  takeEvery(fetchUserCocktailsRequest, fetchUserCocktails),
  takeEvery(getCocktailItemRequest, getCocktailItem)
];

export default cocktailsSagas;
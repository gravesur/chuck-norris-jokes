import axios from 'axios';
import { Dispatch } from 'redux';

export type FavoriteJokesActions =
  | AddJokeToFavoritesAction
  | DeleteJokeFromFavoritesAction
  | RestoreJokesFromStorageAction
  | ClearFavoritesJokesListAction;

export interface FetchJokeAction {
  type: 'FETCH_JOKE';
  payload: string;
}

export interface FetchJokeErrorAction {
  type: 'FETCH_JOKE_ERROR';
}

export const fetchJoke = () => {
  return async (dispatch: Dispatch) => {
    try {
      const res = await axios.get('https://api.chucknorris.io/jokes/random');

      dispatch<FetchJokeAction>({
        type: 'FETCH_JOKE',
        payload: res.data.value,
      });
    } catch {
      dispatch<FetchJokeErrorAction>({
        type: 'FETCH_JOKE_ERROR',
      });
    }
  };
};

interface AddJokeToFavoritesAction {
  type: 'ADD_JOKE_TO_FAVORITES';
  payload: string;
}

export const addJokeToFavorites = (joke: string) => {
  return {
    type: 'ADD_JOKE_TO_FAVORITES',
    payload: joke,
  };
};

interface DeleteJokeFromFavoritesAction {
  type: 'DELETE_JOKE_FROM_FAVORITES';
  payload: string;
}

export const deleteJokeFromFavorites = (joke: string) => {
  return {
    type: 'DELETE_JOKE_FROM_FAVORITES',
    payload: joke,
  };
};

interface RestoreJokesFromStorageAction {
  type: 'RESTORE_JOKES_FROM_STORAGE';
  payload: string[];
}

export const restoreJokesFromStorage = (jokes: string[]) => {
  return {
    type: 'RESTORE_JOKES_FROM_STORAGE',
    payload: jokes,
  };
};

interface ClearFavoritesJokesListAction {
  type: 'CLEAR_FAVORITES_JOKES_LIST';
}

export const clearFavoritesJokesList = () => {
  return {
    type: 'CLEAR_FAVORITES_JOKES_LIST',
  };
};

let fetchJokesEveryThreeSecInterval: any;

export const fetchJokesEveryThreeSec = () => {
  return (dispatch: Function) => {
    fetchJokesEveryThreeSecInterval = setInterval(() => {
      dispatch(fetchJoke());
    }, 3000);
  };
};

export const clearFetchJokesEveryThreeSecInterval = () => {
  clearInterval(fetchJokesEveryThreeSecInterval);
};

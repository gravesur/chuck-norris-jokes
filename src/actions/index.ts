import axios from 'axios';
import { Dispatch } from 'redux';

import { Joke } from '../types';

export type FavoriteJokesActions =
  | AddJokeToFavoritesAction
  | DeleteJokeFromFavoritesAction
  | RestoreJokesFromStorageAction
  | ClearFavoritesJokesListAction;

export interface FetchJokeAction {
  type: 'FETCH_JOKE';
  payload: Joke;
}

export interface FetchJokeErrorAction {
  type: 'FETCH_JOKE_ERROR';
  payload: Joke;
}

export const fetchJoke = () => {
  return async (dispatch: Dispatch) => {
    try {
      const res = await axios.get('https://api.chucknorris.io/jokes/random');

      const joke = transformJoke(res);

      dispatch<FetchJokeAction>({
        type: 'FETCH_JOKE',
        payload: joke,
      });
    } catch {
      dispatch<FetchJokeErrorAction>({
        type: 'FETCH_JOKE_ERROR',
        payload: { id: 'e', value: 'Error Retrieving Joke :(' },
      });
    }
  };
};

const transformJoke = (res: any) => {
  return {
    id: res.data.id,
    value: res.data.value,
  };
};

interface AddJokeToFavoritesAction {
  type: 'ADD_JOKE_TO_FAVORITES';
  payload: Joke;
}

export const addJokeToFavorites = (joke: Joke) => {
  return {
    type: 'ADD_JOKE_TO_FAVORITES',
    payload: joke,
  };
};

interface DeleteJokeFromFavoritesAction {
  type: 'DELETE_JOKE_FROM_FAVORITES';
  payload: string;
}

export const deleteJokeFromFavorites = (id: string) => {
  return {
    type: 'DELETE_JOKE_FROM_FAVORITES',
    payload: id,
  };
};

interface RestoreJokesFromStorageAction {
  type: 'RESTORE_JOKES_FROM_STORAGE';
  payload: Joke[];
}

export const restoreJokesFromStorage = (jokes: Joke[]) => {
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

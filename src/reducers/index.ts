import { combineReducers } from 'redux';

import { FetchJokeAction, FetchJokeErrorAction } from '../actions';

export interface StoreState {
  joke: string;
  favoriteJokes: string[];
}

const jokeReducer = (
  state: string = '',
  action: FetchJokeAction | FetchJokeErrorAction
) => {
  switch (action.type) {
    case 'FETCH_JOKE':
      return action.payload;
    case 'FETCH_JOKE_ERROR':
      return 'Error retrieving joke';
    default:
      return state;
  }
};

const favotiteJokesReducer = (state: string[] = [], action: any) => {
  switch (action.type) {
    case 'ADD_JOKE_TO_FAVORITES':
      if (state.length >= 10) {
        return [...state.slice(1), action.payload];
      }

      return [...state, action.payload];

    case 'DELETE_JOKE_FROM_FAVORITES':
      const jokeIndex = state.findIndex((el) => el === action.payload);

      return [...state.slice(0, jokeIndex), ...state.slice(jokeIndex + 1)];

    case 'RESTORE_JOKES_FROM_STORAGE':
      return [...action.payload];

    case 'CLEAR_FAVORITES_JOKES_LIST':
      return [];

    default:
      return state;
  }
};

export default combineReducers<StoreState>({
  joke: jokeReducer,
  favoriteJokes: favotiteJokesReducer,
});

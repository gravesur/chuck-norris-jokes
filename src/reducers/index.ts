import { combineReducers } from 'redux';

import { FetchJokeAction, AddJokeToFavoritesAction } from '../actions';

// import { FetchJokeAction } from '../actions';

export interface StoreState {
  joke: string;
  //showJokes: boolean;
  favoriteJokes: string[];
}

const jokeReducer = (state: string = '', action: FetchJokeAction) => {
  switch (action.type) {
    case 'FETCH_JOKE':
      return action.payload;
    default:
      return state;
  }
};

const favotiteJokesReducer = (state: string[] = [], action: any) => {
  switch (action.type) {
    case 'ADD_JOKE_TO_FAVORITES':
      if (state.length >= 10) {
        const newArr = state.slice(1);

        return [...newArr, action.payload];
      }

      return [...state, action.payload];
    case 'DELETE_JOKE_FROM_FAVORITES':
      const jokeIndex = state.findIndex((el) => el === action.payload);
      const firstPart = state.slice(0, jokeIndex);
      const lastPart = state.slice(jokeIndex + 1);

      return [...firstPart, ...lastPart];
    case 'RESTORE_JOKES_FROM_STORAGE':
      return [...action.payload];
    case 'CLEAR_FAVORITES_JOKES_LIST':
      return [];
    default:
      return state;
  }
};

// const showJokesReducer = (state: boolean = false, action: any) => {
//   switch (action.type) {
//     case 'SHOW_JOKES':
//       return !state;
//     default:
//       return state;
//   }
// };

export default combineReducers<StoreState>({
  joke: jokeReducer,
  //showJokes: showJokesReducer,
  favoriteJokes: favotiteJokesReducer,
});

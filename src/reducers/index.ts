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
      return [...state, action.payload];
    case 'RESTORE_JOKES_FROM_STORAGE':
      return [...action.payload];
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

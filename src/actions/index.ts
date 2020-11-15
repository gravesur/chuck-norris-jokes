import axios from 'axios';
import { Dispatch } from 'redux';

export interface FetchJokeAction {
  type: 'FETCH_JOKE';
  payload: string;
}

export const fetchJoke = () => {
  return async (dispatch: Dispatch) => {
    try {
      const res = await axios.get('https://api.chucknorris.io/jokes/random');

      dispatch<FetchJokeAction>({
        type: 'FETCH_JOKE',
        payload: res.data.value,
      });
    } catch (err) {
      console.log(err.name);
    }
  };
};

export interface AddJokeToFavoritesAction {
  type: 'ADD_JOKE_TO_FAVORITES';
  payload: string;
}

export const addJokeToFavorites = (joke: string) => {
  return {
    type: 'ADD_JOKE_TO_FAVORITES',
    payload: joke,
  };
};

export const restoreJokesFromStorage = (jokes: []) => {
  console.log('RESTORE JOKES FIRED!');

  return {
    type: 'RESTORE_JOKES_FROM_STORAGE',
    payload: jokes,
  };
};

// export const showJokesAction = () => {
//   return { type: 'SHOW_JOKES' };
// };

let fetchJokesEveryThreeSecInterval: any;

export const fetchJokesEveryThreeSec = () => {
  console.log('fetchJokesEveryThreeSec FIRED!!!');
  return (dispatch: Function) => {
    fetchJokesEveryThreeSecInterval = setInterval(() => {
      dispatch(fetchJoke());
    }, 3000);
  };
};

export const clearFetchJokesEveryThreeSecInterval = () => {
  clearInterval(fetchJokesEveryThreeSecInterval);
};

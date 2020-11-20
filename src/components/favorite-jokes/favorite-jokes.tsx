import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { StoreState } from '../../reducers';
import { Joke } from '../../types';
import {
  deleteJokeFromFavorites,
  restoreJokesFromStorage,
  clearFavoritesJokesList,
} from '../../actions';

import './favorite-jokes.scss';

interface FavoriteJokesProps {
  joke: Joke;
  favoriteJokes: Joke[];
  clearFavoritesJokesList: typeof clearFavoritesJokesList;
  restoreJokesFromStorage: typeof restoreJokesFromStorage;
  deleteJokeFromFavorites: typeof deleteJokeFromFavorites;
}

const FavoriteJokes = (props: FavoriteJokesProps) => {
  useEffect(() => {
    if (props.favoriteJokes.length === 0) {
      const jokesFromStorage = localStorage.getItem('jokes')
        ? JSON.parse(localStorage.getItem('jokes')!)
        : [];

      props.restoreJokesFromStorage(jokesFromStorage);
    } else {
      localStorage.setItem('jokes', JSON.stringify(props.favoriteJokes));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('jokes', JSON.stringify(props.favoriteJokes));
  }, [props.favoriteJokes]);

  const clearFavoritesList = () => {
    props.clearFavoritesJokesList();

    localStorage.clear();
  };

  const items = props.favoriteJokes.map((item: Joke) => {
    return (
      <li
        key={item.id}
        className="list-item"
        onClick={() => props.deleteJokeFromFavorites(item.id)}
      >
        {item.value}
      </li>
    );
  });

  return (
    <div className="favorite-jokes">
      <h1>Favorite Jokes</h1>

      <ul className="list">{items}</ul>

      <div className="buttons">
        <Link to="/" className="link">
          To Random Jokes
        </Link>

        <button className="button" onClick={clearFavoritesList}>
          Clear Favorites List
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = (state: StoreState) => {
  return {
    favoriteJokes: state.favoriteJokes,
  };
};

export default connect(mapStateToProps, {
  deleteJokeFromFavorites,
  restoreJokesFromStorage,
  clearFavoritesJokesList,
})(FavoriteJokes);

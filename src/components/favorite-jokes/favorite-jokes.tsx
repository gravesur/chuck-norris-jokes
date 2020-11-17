import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { StoreState } from '../../reducers';
import {
  deleteJokeFromFavorites,
  restoreJokesFromStorage,
  clearFavoritesJokesList,
} from '../../actions';

import './favorite-jokes.scss';

interface FavoriteJokesProps {
  joke: string;
  favoriteJokes: string[];
  clearFavoritesJokesList: Function;
  restoreJokesFromStorage: Function;
  deleteJokeFromFavorites: Function;
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

  const items = props.favoriteJokes.map((item: string) => {
    return (
      <li
        className="list-item"
        onClick={() => props.deleteJokeFromFavorites(item)}
      >
        {item}
      </li>
    );
  });

  return (
    <div className="favorite-jokes">
      <h1>Favorite Jokes</h1>

      <ul className="list">{items}</ul>

      <button className="button" onClick={clearFavoritesList}>
        Clear Favorites List
      </button>

      <Link to="/" className="link">
        To Random Jokes
      </Link>
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

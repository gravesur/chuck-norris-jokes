import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { StoreState } from '../../reducers';
import {
  addJokeToFavorites,
  deleteJokeFromFavorites,
  restoreJokesFromStorage,
  clearFavoritesJokesList,
} from '../../actions';

import './favorite-jokes.scss';

const FavoriteJokes = (props: any) => {
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

  const addDeleteJokeFromFavorites = (joke: string) => {
    if (props.favoriteJokes.includes(joke)) {
      props.deleteJokeFromFavorites(joke);
    } else {
      props.addJokeToFavorites(props.joke);
    }
  };

  const items = props.favoriteJokes.map((item: string) => {
    return (
      <li
        className="list-item"
        onClick={() => addDeleteJokeFromFavorites(item)}
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

      <button className="button">
        <Link to="/">To Random Jokes</Link>
      </button>
    </div>
  );
};

const mapStateToProps = (state: StoreState) => {
  return {
    favoriteJokes: state.favoriteJokes,
  };
};

export default connect(mapStateToProps, {
  addJokeToFavorites,
  deleteJokeFromFavorites,
  restoreJokesFromStorage,
  clearFavoritesJokesList,
})(FavoriteJokes);

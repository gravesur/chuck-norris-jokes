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
  console.log(props.favoriteJokes);

  useEffect(() => {
    if (props.favoriteJokes.length === 0) {
      const jokesFromStorage = localStorage.getItem('jokes')
        ? JSON.parse(localStorage.getItem('jokes')!)
        : [];

      props.restoreJokesFromStorage(jokesFromStorage);
    } else {
      localStorage.setItem('jokes', JSON.stringify(props.favoriteJokes));
    }
    //console.log(props.favoriteJokes);
  }, []);

  //console.log(localStorage);

  // const jokesArray =
  //   localStorage.getItem('jokes') &&
  //   JSON.parse(localStorage.getItem('jokes')!).length !== 0
  //     ? JSON.parse(localStorage.getItem('jokes')!)
  //     : props.favoriteJokes;

  //console.log(jokesArray);

  console.log(localStorage);

  // if (props.favoriteJokes.length !== 0) {
  // }

  //localStorage.setItem('jokes', JSON.stringify(props.favoriteJokes));

  console.log(localStorage);

  //const favoriteJokes: [] = JSON.parse(localStorage.getItem('jokes')!);

  //console.log(favoriteJokes);

  const clearFavoritesList = () => {
    props.clearFavoritesJokesList();

    localStorage.clear();
  };

  const addDeleteJokeFromFavorites = (joke: string) => {
    if (props.favoriteJokes.includes(joke)) {
      console.log('JOKE IN FAVORITES!');

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

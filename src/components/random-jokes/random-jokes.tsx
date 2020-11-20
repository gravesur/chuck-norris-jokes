import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Joke } from '../../types';
import {
  fetchJoke,
  fetchJokesEveryThreeSec,
  clearFetchJokesEveryThreeSecInterval,
  addJokeToFavorites,
  restoreJokesFromStorage,
  deleteJokeFromFavorites,
} from '../../actions';
import { StoreState } from '../../reducers';

import './random-jokes.scss';

interface RandomJokesProps {
  joke: Joke;
  favoriteJokes: Joke[];
  fetchJoke: Function;
  fetchJokesEveryThreeSec: Function;
  addJokeToFavorites: typeof addJokeToFavorites;
  restoreJokesFromStorage: typeof restoreJokesFromStorage;
  deleteJokeFromFavorites: typeof deleteJokeFromFavorites;
}

const RandomJokes = (props: RandomJokesProps) => {
  const [showJokes, setShowJokes] = useState(false);

  useEffect(() => {
    props.fetchJoke();

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

  const onStartStopButtonClicked = () => {
    clearFetchJokesEveryThreeSecInterval();

    setShowJokes(!showJokes);

    if (!showJokes) {
      props.fetchJokesEveryThreeSec();
    }
  };

  const addDeleteJokeFromFavorites = (joke: Joke) => {
    const index = props.favoriteJokes.findIndex(
      (el: Joke) => el.id === joke.id
    );

    if (index > -1) {
      props.deleteJokeFromFavorites(joke.id);
    } else {
      props.addJokeToFavorites(props.joke);
    }
  };

  return (
    <div className="random-jokes">
      <h1>Chuck Norris Jokes</h1>

      <p className="joke">{props.joke.value}</p>

      <div className="buttons">
        <Link to="/favorite-jokes" className="link">
          To Favorites List
        </Link>
        <button
          className="button"
          onClick={() => addDeleteJokeFromFavorites(props.joke)}
        >
          Add / Delete
        </button>
        <button className="button" onClick={onStartStopButtonClicked}>
          Start / Stop
        </button>
        <button className="button" onClick={() => props.fetchJoke()}>
          Next Joke
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = (state: StoreState) => {
  return {
    joke: state.joke,
    favoriteJokes: state.favoriteJokes,
  };
};

export default connect(mapStateToProps, {
  fetchJoke,
  fetchJokesEveryThreeSec,
  addJokeToFavorites,
  restoreJokesFromStorage,
  deleteJokeFromFavorites,
})(RandomJokes);

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

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
  joke: string;
  favoriteJokes: string[];
  fetchJoke: Function;
  fetchJokesEveryThreeSec: Function;
  addJokeToFavorites: Function;
  restoreJokesFromStorage: Function;
  deleteJokeFromFavorites: Function;
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

  const addDeleteJokeFromFavorites = (joke: string) => {
    if (props.favoriteJokes.includes(joke)) {
      props.deleteJokeFromFavorites(joke);
    } else {
      props.addJokeToFavorites(props.joke);
    }
  };

  return (
    <div className="random-jokes">
      <h1>Chuck Norris Jokes</h1>
      <p>{props.joke}</p>
      <button className="button">
        <Link to="/favorite-jokes">To Favorites List</Link>
      </button>
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

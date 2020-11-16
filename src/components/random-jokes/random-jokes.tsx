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
  console.log('COMPONENT RENDERED!');

  // const jokes = ['a', 'b', 'c', 'd'];

  // const jokeIndex = jokes.findIndex((el) => el === 'd');
  // console.log(jokeIndex);

  // const firstPart = jokes.slice(0, jokeIndex);
  // const lastPart = jokes.slice(jokeIndex + 1);

  // console.log([...firstPart, ...lastPart]);

  const [showJokes, setShowJokes] = useState(false);
  //const [switchS, setSwitchS] = useState(true);

  useEffect(() => {
    console.log('USE EFFECT AT INITIAL RENDER FIRED!!!');

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
    console.log(
      'USE EFFECT AT INITIAL RENDER AND EVERY RENDER WHEN CERTAIN PROPERTY CHANGED FIRED!!!'
    );

    console.log(props.favoriteJokes);

    // if (
    //   !localStorage.getItem('jokes') &&
    //   JSON.parse(localStorage.getItem('jokes')!).length !== 0
    // ) {
    // }

    // if (props.favoriteJokes.length !== 0) {
    // }

    localStorage.setItem('jokes', JSON.stringify(props.favoriteJokes));

    //props.fetchJoke();

    // const jokesFromStorage = localStorage.getItem('jokes')
    //   ? JSON.parse(localStorage.getItem('jokes')!)
    //   : [];
    //props.restoreJokesFromStorage(jokesFromStorage);
  }, [props.favoriteJokes]);

  const onStartStopButtonClicked = () => {
    clearFetchJokesEveryThreeSecInterval();

    setShowJokes(!showJokes);

    if (!showJokes) {
      props.fetchJokesEveryThreeSec();
    }
  };

  const addDeleteJokeFromFavorites = (joke: string) => {
    //setSwitchS(!switchS);

    if (props.favoriteJokes.includes(joke)) {
      console.log('JOKE IN FAVORITES!');

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

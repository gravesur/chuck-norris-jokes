import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import {
  fetchJoke,
  fetchJokesEveryThreeSec,
  clearFetchJokesEveryThreeSecInterval,
  addJokeToFavorites,
} from '../../actions';
import { StoreState } from '../../reducers';

import './random-jokes.scss';

interface RandomJokesProps {
  joke: string;
  fetchJoke: Function;
  fetchJokesEveryThreeSec: Function;
  addJokeToFavorites: Function;
}

const RandomJokes = (props: RandomJokesProps) => {
  const [showJokes, setShowJokes] = useState(false);

  useEffect(() => {
    props.fetchJoke();
  }, []);

  const onStartStopButtonClicked = () => {
    clearFetchJokesEveryThreeSecInterval();

    setShowJokes(!showJokes);

    if (!showJokes) {
      props.fetchJokesEveryThreeSec();
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
        onClick={() => props.addJokeToFavorites(props.joke)}
      >
        Add To Favorites
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
  };
};

export default connect(mapStateToProps, {
  fetchJoke,
  fetchJokesEveryThreeSec,
  addJokeToFavorites,
})(RandomJokes);

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { StoreState } from '../../reducers';
import { addJokeToFavorites, restoreJokesFromStorage } from '../../actions';

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

  const items = props.favoriteJokes.map((item: string) => {
    return <li className="list-item">{item}</li>;
  });

  return (
    <div className="favorite-jokes">
      <h1>Favorite Jokes</h1>
      <ul className="list">{items}</ul>
      <button className="button" onClick={() => localStorage.clear()}>
        Clear Favorites List
      </button>

      {/* <button
        className="button"
        onClick={() =>
          localStorage.setItem('jokes', JSON.stringify(props.favoriteJokes))
        }
      >
        Save List
      </button> */}

      <button className="button">
        <Link to="/">To Random Jokes</Link>
      </button>
    </div>
  );
};

const mapStateToProps = (state: StoreState) => {
  //console.log(state.favoriteJokes);

  return {
    favoriteJokes: state.favoriteJokes,
  };
};

export default connect(mapStateToProps, {
  addJokeToFavorites,
  restoreJokesFromStorage,
})(FavoriteJokes);

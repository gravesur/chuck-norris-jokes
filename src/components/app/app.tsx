import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import RandomJokes from '../random-jokes/random-jokes';
import FavoriteJokes from '../favorite-jokes/favorite-jokes';

import './app.scss';

const App = () => {
  return (
    <Router>
      <div className="app">
        <Route path="/" component={RandomJokes} exact />
        <Route path="/favorite-jokes" component={FavoriteJokes} exact />
      </div>
    </Router>
  );
};

export default App;

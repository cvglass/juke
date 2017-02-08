import React from 'react';
import ReactDOM from 'react-dom';
import AppContainer from './containers/AppContainer';
import { Router, Route, hashHistory, IndexRedirect} from 'react-router';
import Albums from './components/Albums';
import Album from './components/Album';
import Artists from './components/Artists';
import Artist from './components/Artist';
import Songs from './components/Songs'


ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={AppContainer}>
      <IndexRedirect to="/albums" />
      <Route path="/albums" component={Albums} />
      <Route path="/albums/:id" component={Album} />
      <Route path='/artists' component={Artists}/>
      <Route path='/artists/:id' component={Artist}>
        <Route path='/songs' component={Songs} />
        <Route path='/albums' component={Albums} />
      </Route>
  </Router>,
  document.getElementById('app')
);

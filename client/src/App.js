import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './containers/Home';
import NotFound from './containers/NotFound';

import NavigationBar from './components/NavigationBar'
import Footer from './components/Footer';
import './App.scss';

function App() {
  return (
    <Router>
      <div>
        <NavigationBar />
        <Switch>
          <Route path='/' exact component={ Home } />
          <Route component={NotFound} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

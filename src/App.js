import React from 'react';

/* STYLES */
import './assets/scss/App.scss';
/* COMPONENTS */
import Header from './components/Header';
import Home from './components/Home';
import ItemListContainer from './components/ItemListContainer';
import ItemDetailContainer from './components/ItemDetailContainer';

/* ROUTER */
import { BrowserRouter, Switch, Route } from 'react-router-dom';

const App = () => {
  return (
    <>
      <BrowserRouter>
          <Header />
          <Switch>
            <Route exact path="/" >
              <Home />
            </Route>
            <Route path="/producto/:categoria">
              <ItemListContainer /> 
            </Route>
            <Route  exact path="/detalle/:id">
              <ItemDetailContainer />
            </Route>
          </Switch>
      </BrowserRouter>
    </>
  )
}

export default App;

import React from 'react';

/* STYLES */
import './assets/scss/App.scss';
/* COMPONENTS */
import CartItem from './components/CartItems';
import Header from './components/Header';
import ItemDetailContainer from './components/ItemDetailContainer';
import ItemListContainer from './components/ItemListContainer';
/* Context */
import { CartProvider } from './context/CartContext';

/* ROUTER */
import { BrowserRouter, Switch, Route } from 'react-router-dom';

const App = () => {
  return (
    <>
      <CartProvider>
        <BrowserRouter>
            <Header />
            <Switch>
              <Route exact path="/" >
                <ItemListContainer />
              </Route>
              <Route path="/product/:paramCategory">
                <ItemListContainer /> 
              </Route>
              <Route  exact path="/detail/:id">
                <ItemDetailContainer />
              </Route>
              <Route path = "/cart">
                <CartItem />
              </Route>
            </Switch>
        </BrowserRouter>
      </CartProvider>
    </>
  )
}

export default App;

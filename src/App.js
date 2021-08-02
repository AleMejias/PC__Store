import React from 'react';

/* STYLES */
import './assets/scss/App.scss';
/* COMPONENTS */
import Header from './components/Header';
import ItemListContainer from './components/ItemListContainer';

const App = () => {
  return (
    <>
      <Header />
        <ItemListContainer />
    </>
  )
}

export default App;

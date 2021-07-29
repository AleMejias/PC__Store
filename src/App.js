import React from 'react';

/* STYLES */
import './assets/App.scss';
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

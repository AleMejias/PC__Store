import React, { useState, useEffect } from "react";

// Components
import ItemList from './ItemList';
/* Router */
import { useParams } from "react-router";

const ItemListContainer = () => {
  const [item, setItem] = useState([]);
  const { categoria } = useParams();
  useEffect(() => {
    const getItemList = () => {
      const promise = fetch("../data/data.json");
      setTimeout(() => {
        promise.then((response) => response.json())
                .then((data) => setItem(data));
      },2000)
    }
    getItemList();
  }, [categoria]);

  return (
    <section className="container mt-5">
      <ItemList item = {item} categoriaParam = {categoria}/>
    </section>
  );
};
export default ItemListContainer;

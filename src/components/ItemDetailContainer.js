import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ItemDetail from './ItemDetail';

const ItemDetailContainer = () => {
  const [item, setItem] = useState([]);
  const {id} = useParams();
  useEffect(() => {
    const getItemById = () => {
      const promise = fetch("../data/data.json")
      setTimeout(() => {
        promise.then((response) => response.json())
                .then((data) => setItem(data[id]));
      },2000);
    }
    getItemById();
  },[id]);
  return (
    <>
      <section className = "container detail mt-5">
        <ItemDetail item = {item}/>
      </section>
    </>
  );
};

export default ItemDetailContainer;

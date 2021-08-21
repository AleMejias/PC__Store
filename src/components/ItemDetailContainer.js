import React, { useState, useEffect } from "react";
/* ROUTER */
import { useParams } from "react-router-dom";
/* Firebase */
import { dataBase } from "../fireBaseConfig";
/* COMPONENTS */
import ItemDetail from './ItemDetail';
import Loading from "./Loading";

const ItemDetailContainer = () => {
  /* STATE */
  const [item, setItem] = useState([]);
  const [ loadingPage , setloadingPage ] = useState();
  /* PARAMS */
  const {id} = useParams();

  useEffect(() => {
    setloadingPage(false);
    const getItemById = async () => {
      const response = await dataBase.collection('items').get().then((querySnapShot) => querySnapShot.docs)
      response.map((element) => (
        (element.id === id) ? setItem({ id:element.id , ...element.data()}) : ""
      ))
      setloadingPage(true);
    }
    getItemById();
  },[id])
  return (
    (loadingPage)
    ?
      <section className = "container detail mt-5">
        <ItemDetail item = {item}/>
      </section>
    : <Loading />
  );
};

export default ItemDetailContainer;

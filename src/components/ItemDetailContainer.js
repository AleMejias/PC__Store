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
    (!loadingPage) 
    ? <Loading/> :
    (item.length !== 0)
    ?
      <section className = "container detail mt-5">
        <ItemDetail item = {item}/>
      </section>
    :
    <section className="container mt-5">
      <div className="row body">
        <div className="col-md-12">
          <h6>No existen productos con dicho ID, intente nuevamente</h6>
        </div>
      </div>
    </section> 
  );
};

export default ItemDetailContainer;

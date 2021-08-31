import React, { useState, useEffect } from "react";

/* COMPONENTS */
import ItemList from "./ItemList";
/* Router */
import { useParams } from "react-router";
/* FIREBASE */
import { dataBase } from "../fireBaseConfig";
import Loading from "./Loading";

import  {deleteItemFromFireBase}  from "./PurchaseDetail";

const ItemListContainer = () => {
  /* STATES */
  const [item, setItem] = useState([]);
  const [ loadingPage , setLoadingPage ] = useState();
  
  /* PARAMS */
  const { paramCategory } = useParams();

  useEffect(() => {

    const getItemsCollection = () =>
    dataBase.collection("items").get().then((querySnapShot) => querySnapShot.docs);

    const getItemsCollectionByCategory = (paramCategory) =>
    dataBase.collection("items").where("category", "==", `${paramCategory}`).get().then((querySnapShot) => querySnapShot.docs);

    const getItemsFromFireBase = async () => {
      setLoadingPage(false);
      const data = []; 
      let responseFromFireBase; 
      (paramCategory === undefined)
        ? (responseFromFireBase = await getItemsCollection())
        : (responseFromFireBase = await getItemsCollectionByCategory(paramCategory));
      
      responseFromFireBase.map((element) =>
        data.push({ id: element.id, ...element.data() })
      );
      setItem(data);
      setLoadingPage(true);
    };
  const deleteOrdersFromFireBase = async() => {
      const itemsToDelete = await dataBase.collection('order').get().then((querySnapShot) => querySnapShot.docs);
       itemsToDelete.map( (element) => (     
        deleteItemFromFireBase(element.id)
      ))
  }
    getItemsFromFireBase();
    deleteOrdersFromFireBase();
  }, [paramCategory]);
  
  return (
    (!loadingPage) ? <Loading/> :
    ( item.length !== 0 )
    ? <section className="container mt-5">
        <ItemList item={item} />
      </section>
    :
      <section className="container mt-5">
        <div className="row body">
          <div className="col-md-12">
            <h6>No existen productos con dicha categoria</h6>
          </div>
        </div>
      </section>   
  );
};
export default ItemListContainer;

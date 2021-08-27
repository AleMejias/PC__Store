import React, { useState, useEffect } from "react";

// Components
import ItemList from "./ItemList";
/* Router */
import { useParams } from "react-router";
/* FIREBASE */
import { dataBase } from "../fireBaseConfig";
import Loading from "./Loading";

const ItemListContainer = () => {
  /* STATES */
  const [item, setItem] = useState([]);
  const [ loadingPage , setLoadingPage ] = useState();
  
  /* PARAMS */
  const { paramCategory } = useParams();

  useEffect(() => {
    /* FUNCION PARA TRAER TODOS LOS ELEMENTOS DESDE MI FIREBASE */
    const getItemsCollection = () =>
    dataBase.collection("items").get().then((querySnapShot) => querySnapShot.docs);

    /* FUNCION PARA TRAER ELEMENTOS DESDE MI FIREBASE SEGUN SU CATEGORIA */
    const getItemsCollectionByCategory = (paramCategory) =>
    dataBase.collection("items").where("category", "==", `${paramCategory}`).get().then((querySnapShot) => querySnapShot.docs);

    /* FUNCION QUE MANEJA LOS RESULTADOS DE LAS OTRAS FUNCIONES GET */
    const getItemsFromFireBase = async () => {
      setLoadingPage(false);
      const data = []; // Aqui guardo los resultados provenientes del firebase 
      let responseFromFireBase; // aqui guardo el array de documentos que me viene desde el firebase
      (paramCategory === undefined)
        ? (responseFromFireBase = await getItemsCollection())
        : (responseFromFireBase = await getItemsCollectionByCategory(paramCategory));
      
      // Como en este punto ya tengo la respuesta almacenada en mi variable pues la recorro y hago el push de los elementos obtenidos
      responseFromFireBase.map((element) =>
        data.push({ id: element.id, ...element.data() })
      );
      setItem(data);
      setLoadingPage(true);
    };
    getItemsFromFireBase();
  }, [paramCategory]);
  
  return (
    (!loadingPage) ? <Loading/> :
    ( item.length !== 0 )
    ? <section className="container mt-5 animacion">
        <ItemList item={item} />
      </section>
    :
      <section className="container mt-5">
        <div className="row">
          <div className="col-md-12">
            <h6>No existen productos con dicha categoria</h6>
          </div>
        </div>
      </section>   
  );
};
export default ItemListContainer;

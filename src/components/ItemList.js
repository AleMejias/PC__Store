import React, { useState,useEffect } from "react";
import Item from './Item';
import { dataArr } from "../data";



const ItemList = () => {
  const [item, setItem] = useState([]);
  useEffect(()=> {
    const data = new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(dataArr);
        }, 2000);
      });
      data.then((item) => {
          setItem(item)
      })
  },[])

  return (
    <section className="container mt-5">
      <div className="row">
        {
            item.map(({id,nombre,precio,img}) => ( 
                <div className = "col-md-4" key={id}>
                    <Item nombre={nombre} precio = {precio} img={img}/>
                </div>
            ))
        }
      </div>
    </section>
  );
};

export default ItemList;

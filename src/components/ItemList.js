import React from "react";
import Item from "./Item";
import { imgArr } from "../img";

const ItemList = ({item}) => {

  return (
    <section className="container mt-5">
      <div className="row">
        {
          item.map(({ id, nombre, precio}) => (
            <div className="col-md-4" key={id}>
              <Item id = {id} nombre={nombre} precio={precio} img={imgArr[id]} />
            </div>
          ))
        }
      </div>
    </section>
  );
};

export default ItemList;

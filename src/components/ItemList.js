import React from "react";
/* Components */
import Item from "./Item";
/* Router */
import { imgArr } from "../img";
import { Link } from "react-router-dom";

const ItemList = ({item,categoriaParam}) => {
  return (
    <div className="row">
      {
        item.map(({ id, nombre, precio,categoria}) => (
          (categoria === categoriaParam) ? (
            <div className="col-md-4" key={id}>
              <Link  to={`/detalle/${id}`} style={{textDecoration:"none"}}>
                <Item id = {id} nombre={nombre} precio={precio} img={imgArr[id]} />
              </Link>
            </div>
          ) : ""
        ))
      }
    </div>
  );
};

export default ItemList;

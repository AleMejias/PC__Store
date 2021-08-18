import React from "react";
/* Components */
import Item from "./Item";
/* ARRAYS DE IMAGENES */
import { imgArr } from "../img";
/* Router */
import { Link } from "react-router-dom";

const ItemList = ({ item, categoriaParam }) => {
  const printItem = (id, nombre, precio) => {
    return (
      <div className="col-md-4 mb-4" key={id}>
        <Link to={`/detalle/${id}`} style={{ textDecoration: "none" }}>
          <Item id={id} nombre={nombre} precio={precio} img={imgArr[id]} />
        </Link>
      </div>
    );
  };
  return (
    <div className="row">
      {item.map(({ id, nombre, precio, categoria }) =>
        (categoriaParam === undefined) ? printItem(id, nombre, precio) : 
        (categoria === categoriaParam) ? printItem(id, nombre, precio) : ""
      )}
    </div>
  );
};

export default ItemList;

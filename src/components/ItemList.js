import React from "react";
/* Components */
import Item from "./Item";
/* Router */
import { Link } from "react-router-dom";
const printItem = (id, name, price,image) => {
  return (
    <div className="col-md-4 mb-4 aanimacion" key={id}>
      <Link to={`/detail/${id}`} style={{ textDecoration: "none" }}>
        <Item id={id} name={name} price={price} image={image} />
      </Link>
    </div>
  );
};

const ItemList = ({ item }) => {
  return (
    <div className="row">
      {
        item.map(({ id, name, price, image}) => printItem(id, name, price, image) )
      }
    </div>
  );
};

export default ItemList;

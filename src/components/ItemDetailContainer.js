import React, { useState, useEffect } from "react";
import { Modal} from "react-bootstrap";
import ItemDetail from './ItemDetail';

const ItemDetailContainer = ({ show, onHide, id }) => {
  const [item, setItem] = useState([]);
  useEffect(() => {
    getItem(id);
  }, [id]);
  const getItem = (idParam) => {
    const promise = fetch("./data/data.json");
    setTimeout(() => {
      promise
        .then((response) => response.json())
        .then((data) =>
          data.filter((producto) => (producto.id === idParam ? setItem(producto) : ""))
        );
    }, 2000);

    return promise;
  };
  return (
    <Modal show={show} aria-labelledby="contained-modal-title-vcenter" size="xl">
      <ItemDetail item = {item} onHide={onHide}/> 
    </Modal>
  );
};

export default ItemDetailContainer;

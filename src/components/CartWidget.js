import React, { useContext } from "react";

/* DEPENDENCIAS */
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faShoppingCart} from '@fortawesome/free-solid-svg-icons';

/* CONTEXT */
import CartContext from "../context/CartContext";

const CartWidget = () => {
  const { purchases } = useContext( CartContext );
  return (
    <div className="row">
      <div className="col-md-12 header__shoppingCartContainer">
        <FontAwesomeIcon icon={faShoppingCart} />
        <span className= 
          { 
            (purchases.length === 0 ? 'hide' : 'show') 
          }>
          {purchases.length}
        </span>
      </div>
    </div>
  );
};

export default CartWidget;
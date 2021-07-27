import React from "react";

/* DEPENDENCIAS */
//Font Awesome
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faShoppingCart} from '@fortawesome/free-solid-svg-icons';

const CartWidget = () => {
  return (
    <div className="row">
      <div className="col-md-12 header__shoppingCartContainer">
        <FontAwesomeIcon icon={faShoppingCart} />
      </div>
    </div>
  );
};

export default CartWidget;
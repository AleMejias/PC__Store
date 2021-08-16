import React, { createContext, useState } from "react";

const CartContext = createContext();

class CartItem {
  constructor( item, quantify ){
    this.item = item;
    this.quantify = quantify;
  }
}
const CartProvider = ({ children }) => {
  const [purchases, setPurchases] = useState([]); 
  const [ itemsAddedToCart , setitemsAddedToCart ] = useState([]); // Array que almacena los id de los items agregados al carrito

  /* FUNCION PARA AGREGAR PRODUCTOS Y OBVIAR DUPLICADOS EN EL CARRITO */
  const addItemToCart = (item,quantify) => {
    const isInCart = itemsAddedToCart.includes(item.id); // Verfico si en el state "itemsAddedTocart" existe el id del item recibido

    if (!isInCart) {
      setPurchases([...purchases ,new CartItem( item,quantify)]);
      setitemsAddedToCart( [...itemsAddedToCart, item.id] )
    }
  };
  /* FUNCION PARA ELIMINAR PRODUCTOS DEL CARRITO */
  const deleteItemById = (idToDelete) => {
    const items = purchases.filter((element) => (element.item.id !== idToDelete )) //Devuelvo los items que no coincidan con el id a eliminar
    const itemsArr = itemsAddedToCart.filter((element) => (element) !== idToDelete) //Devuelvo los ID de los items que no coincidan con el id a eliminar
    setPurchases( items );
    setitemsAddedToCart(itemsArr);
  }
  const data = { purchases, addItemToCart , deleteItemById};
  return (
    <CartContext.Provider value={data}>
      {children}
    </CartContext.Provider>
  );
};
export { CartProvider };
export default CartContext;

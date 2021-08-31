import React, { createContext, useState } from "react";

const CartContext = createContext();

class CartItem {
  constructor( item, quantify ){
    this.item = item;
    this.quantify = quantify;
  }
  setQuantifyInCart = ( newQuantify ) => {
    this.quantify = newQuantify;
  }
}
const CartProvider = ({ children }) => {
  const [purchases, setPurchases] = useState([]); 
  const [ itemsAddedToCart , setitemsAddedToCart ] = useState([]); 

  const addItemToCart = (item,quantify) => {
    const isInCart = itemsAddedToCart.includes(item.id);
    const indexInACart = itemsAddedToCart.indexOf( item.id );

    if (isInCart) {
      const updateQuantify = ( purchases[indexInACart].quantify === item.stock ) ? quantify :
                             ( (quantify + purchases[indexInACart].quantify  > item.stock) ) ? item.stock : 
                             ( quantify + purchases[indexInACart].quantify );
                                   
      purchases[indexInACart].setQuantifyInCart( updateQuantify );
    }else{
      setPurchases([...purchases ,new CartItem( item,quantify)]);
      setitemsAddedToCart( [...itemsAddedToCart, item.id] );
    }
  };
  
  const deleteItemById = (idToDelete) => {
    const items = purchases.filter((element) => (element.item.id !== idToDelete ));
    const itemsArr = itemsAddedToCart.filter((element) => (element) !== idToDelete);
    setPurchases( items );
    setitemsAddedToCart(itemsArr);
  }
  
  const clearCart = () => {
    setPurchases([]); 
    setitemsAddedToCart([]); 
  }
  const data = { purchases, addItemToCart , deleteItemById , clearCart};
  return (
    <CartContext.Provider value={data}>
      {children}
    </CartContext.Provider>
  );
};
export { CartProvider };
export default CartContext;

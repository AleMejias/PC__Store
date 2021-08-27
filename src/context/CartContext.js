import React, { createContext, useState } from "react";

const CartContext = createContext();

class CartItem {
  constructor( item, quantify ){
    this.item = item;
    this.quantify = quantify;
  }
  // Metodo para setear el quantify de los items que YA se encuentren agregados al carrito
  setQuantifyInCart = ( newQuantify ) => {
    this.quantify = newQuantify;
  }
}
const CartProvider = ({ children }) => {
  const [purchases, setPurchases] = useState([]); 
  const [ itemsAddedToCart , setitemsAddedToCart ] = useState([]); // Array que almacena los id de los items agregados al carrito

  /* FUNCION PARA AGREGAR PRODUCTOS Y OBVIAR DUPLICADOS EN EL CARRITO */
  const addItemToCart = (item,quantify) => {
    const isInCart = itemsAddedToCart.includes(item.id); // Verifico si en el state "itemsAddedTocart" existe el id del item recibido
    const indexInACart = itemsAddedToCart.indexOf( item.id ); // Busco en "itemsAddedToCart" el id que viene por parametro para conocer su index ya que son equitativos  
    //Si ya esta en el carro, entonces "actualiza" el item en la posicion recibida por "indexInACart"
    if (isInCart) {
      const updateQuantify = ( purchases[indexInACart].quantify === item.stock ) ? quantify :
                             ( (quantify + purchases[indexInACart].quantify  > item.stock) ) ? item.stock : 
                             ( quantify + purchases[indexInACart].quantify );
                                   
      purchases[indexInACart].setQuantifyInCart( updateQuantify );
    }else{
      // Si no esta en el carro pues agregame el nuevo producto haciendo una nueva instancia
      setPurchases([...purchases ,new CartItem( item,quantify)]);
      setitemsAddedToCart( [...itemsAddedToCart, item.id] );
    }
  };
  /* FUNCION PARA ELIMINAR PRODUCTOS DEL CARRITO */
  const deleteItemById = (idToDelete) => {
    const items = purchases.filter((element) => (element.item.id !== idToDelete )) //Devuelvo los items que no coincidan con el id a eliminar
    const itemsArr = itemsAddedToCart.filter((element) => (element) !== idToDelete) //Devuelvo los ID de los items que no coincidan con el id a eliminar
    setPurchases( items );
    setitemsAddedToCart(itemsArr);
  }
  /* FUNCION PARA LIMPIAR EL CARRITO DE COMPRA */
  const clearCart = () => {
    setPurchases([]); //Reinicio el estado pasandole un Array vacio
    setitemsAddedToCart([]); // Reinicio mi array de id pasandole uno vacio
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

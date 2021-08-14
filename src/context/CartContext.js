import React, { createContext, useState } from 'react';

const CartContext = createContext()
const cartItems = {
    item : [],
    quantify : 0
};
const CartProvider = ({ children }) => {
    const [ purchases , setPurchases ] = useState( cartItems );
    const addItemToCart = ( {item,quantify} ) => {
/*     console.log(item)
    console.log(quantify) */
        setPurchases({
            item: [...item],
            quantify: quantify
        })
    }
/*     console.log(purchases) */
    const data = { purchases ,addItemToCart };
    return (
        <CartContext.Provider value={ data } >
            { children }
        </CartContext.Provider>
    ) 
}
export { CartProvider };
export default CartContext;
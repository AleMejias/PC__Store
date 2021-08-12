import React from 'react';
import { useParams } from 'react-router-dom';


const CartItem = () => {
    const { purchase } = useParams();
    return (
        <>
            <h2>Gracias por tu compra, registramos que seleccionaste { purchase }</h2>
        </>
    );
}

export default CartItem;
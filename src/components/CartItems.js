import React , { useContext, useState} from 'react';
/* CONTEXT */
import CartContext from '../context/CartContext';
/* Components */
import ClientForm from './ClientForm';

/* DEPENDENCIAS */
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrashAlt , faTimes , faUndo} from '@fortawesome/free-solid-svg-icons';

/* ROUTER */
import { Link } from 'react-router-dom';

const CartItem = () => {

    /* CONTEXTO */
    const { purchases, deleteItemById , clearCart} = useContext( CartContext );
    const [modalFormShow, setModalFormShow] = useState(false);

    const totalAmount = () => {
        let amount = 0;
        purchases.map(( {item:{price},quantify} ) => (
            amount += price * quantify
        ))
        return amount;
    }
    const cartEmpty = () => {
        return (
            <div className="row body">
                <div className="col-md-12 cartEmpty">
                    <h4>El carrito se encuentra vacio</h4>
                    <Link to="/">
                        Volver al listado de productos
                        <FontAwesomeIcon className= "mx-1" icon = { faUndo } />
                    </Link>
                </div>
            </div>
        )
    }

    const printItems = ( ) => {

        return (
            <div className= "row d-flex justify-content-evenly">
                <div className= "col-md-8">
                    {
                        purchases.map(({ item:{id , name , price , image} , quantify }) => (
                            <article className="cartItem mb-4" key={id}>
                                <div>
                                    <img src={image} alt={name} />
                                </div>
                                <div>
                                    <h6>{ name }</h6>
                                </div>
                                <div>
                                    <strong>Precio</strong>
                                    ${price}
                                </div>
                                <div>
                                    <strong>Cantidad</strong>
                                    { quantify }
                                </div>
                                <div>
                                    <strong>Sub-total</strong>
                                    <span>${ (price * quantify) }</span>
                                </div>
                                <div>
                                    <FontAwesomeIcon icon= { faTimes } title= "Eliminar producto" onClick = {() => deleteItemById(id)}/>
                                </div>
                            </article>
                        ))
                    }
                </div>
                <div className= "col-md-4 cartItemResume">
                    <div className="cartItemResume__titleContainer">
                        <h5>Resumen del Pedido</h5>
                    </div>
                    <div className="cartItemResume__amountContainer">
                        <strong>Monto total:</strong><span>${ totalAmount() }</span>
                    </div>
                    <div className = "cartItemResume__buttonsContainer"> 
                        <div className="cartItemResume__buttonsContainer--clearCart">
                            <FontAwesomeIcon icon = { faTrashAlt } title = "Vaciar carrito" onClick = { clearCart } />
                        </div>
                        <div className="cartItemResume__buttonsContainer--confirmPurchase">
                            <button onClick= { () => setModalFormShow( true ) }>CONFIRMAR</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <>
            <section className = "container mt-5 animacion">
                {
                    (purchases.length === 0) ? cartEmpty() : printItems()
                }
            </section>
            <ClientForm show={ modalFormShow } onHide={ () => setModalFormShow(false) }  total={() => totalAmount()}/>
        </>
    );
}

export default CartItem;
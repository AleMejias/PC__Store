import React , { useContext } from 'react';
import CartContext from '../context/CartContext';
/* DEPENDENCIAS */
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrashAlt } from '@fortawesome/free-solid-svg-icons';
/* Array de imagenes */
import { imgArr } from '../img';



const CartItem = () => {

    const { purchases, deleteItemById } = useContext( CartContext );
    const totalAmount = () => {
        let amount = 0;
        purchases.map(( {item:{precio},quantify} ) => (
            amount += precio * quantify
        ))
        return amount;
    }
    const cartEmpty = () => {
        return (
            <div className="row">
                <div className="col-md-12">
                    <h4>El carrito se encuentra vacio</h4>
                </div>
            </div>
        )
    }
    const printItems = () => {

        return (
            <div className= "row d-flex justify-content-evenly">
                <div className= "col-md-7">
                    {
                        // Hago dos destructuring a mi state purchases : 1) Las propiedades que necesito del objeto Item, 2) La cantidad agregada al carrito de ese objeto item
                        purchases.map(({ item:{id,nombre,precio} , quantify }) => (
                            <article className="cartItem mb-4" key={id}>
                                <div>
                                    {<img src={imgArr[id]} alt={nombre} />}
                                </div>
                                <div>
                                    <h6>{ nombre }</h6>
                                </div>
                                <div>
                                    <span>${ (precio * quantify) }</span>
                                </div>
                                <div>
                                    <FontAwesomeIcon icon= { faTrashAlt } onClick = {() => deleteItemById(id)}/>
                                </div>
                            </article>
                        ))
                    }
                </div>
                <div className= "col-md-4 cartItemResume">
                    <div className="cartItemResume__titleContainer">
                        <h5>Resumen del Pedido</h5>
                    </div>
                    <div className="cartItemResume__amountContainer mt-3">
                        <strong>Monto total:</strong><span>${ totalAmount() }</span>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <section className = "container mt-5">
            {
                (purchases.length === 0) ? cartEmpty() : printItems()
            }
        </section>
    );
}

export default CartItem;
import React , { useContext} from 'react';
import CartContext from '../context/CartContext';

/* DEPENDENCIAS */
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrashAlt , faTimes , faUndo} from '@fortawesome/free-solid-svg-icons';

/* ROUTER */
import { Link } from 'react-router-dom';
/* FIRESBASE */
import { dataBase } from '../fireBaseConfig';


const CartItem = () => {

    /* CONTEXTO */
    const { purchases, deleteItemById , clearCart} = useContext( CartContext );

    const items = []; // Aqui se cargaran el objeto con el detalle de la compra en la funcion
    const client = {
        name : 'Alejandro',
        phone : '+54 91121816563',
        email : 'alejandro20452@gmail.com'
    }

    const totalAmount = () => {
        let amount = 0;
        purchases.map(( {item:{price},quantify} ) => (
            amount += price * quantify
        ))
        return amount;
    }
    const cartEmpty = () => {
        return (
            <div className="row">
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
    const getDate = () => {
        const date = new Date();
        const mins = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes() ;
        const hours = date.getHours();
        const year = date.getFullYear();
        const day = date.getDate();
        const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
        const time = hours < 13 ? 'am' : 'pm'
        const result = `${day}/${month}/${year}, a las ${hours}:${mins} ${time}`;

        return result;
    }
    const confirmPurchase = async () => {
        const date = getDate();
        purchases.map((element) => items.push( element.item ))
        const order = {
            buyer: client,
            items: items,
            date: date,
            total: totalAmount()
        }
        await dataBase.collection('order').doc().set(order);

        clearCart();
    }

    const printItems = ( ) => {

        return (
            <div className= "row d-flex justify-content-evenly">
                <div className= "col-md-8">
                    {
                        // Hago dos destructuring a mi state purchases : 1) Las propiedades que necesito del objeto Item, 2) La cantidad agregada al carrito de ese objeto item
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
                            <Link to="/order">
                                <button onClick= { confirmPurchase }>CONFIRMAR</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <section className = "container mt-5 animacion">
            {
                (purchases.length === 0) ? cartEmpty() : printItems()
            }
        </section>
    );
}

export default CartItem;
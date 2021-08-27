import React, { useEffect, useState } from 'react';
/* Components */
import Loading from './Loading';
/* FIREBASE */
import { dataBase } from '../fireBaseConfig';
/* DEPENDENCIAS */
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUndo} from '@fortawesome/free-solid-svg-icons';
/* Router */
import { Link } from 'react-router-dom';


const PurchaseDetail = () => {
    const [ detailPurchase , setDetailPurchase ] = useState();
    const [ loadingPage , setLoadingPage ] = useState(false);
    useEffect(() => {
        const getItems = async () => {
            const items = await dataBase.collection('order').get().then(( querySnapShot ) => querySnapShot.docs);
            items.map((element) => setDetailPurchase({id:element.id , ...element.data()}))
        }
        getItems();
        setLoadingPage(true);
    },[])
    const deleteOrder = async() => {
        await dataBase.collection('order').doc(`${detailPurchase.id}`).delete().then(() => {
        })
    }
    const printDetailPurchase =   ( item ) => {
        const { name , phone , email } = item.buyer;
        const { id , items , date , total } = item;

        return (
            <>
                <div className="row">
                    <div className="purchaseDetail__messageContainer col-md-12">
                        <div className="purchaseDetail__messageContainer--title">
                            <h4>¡Registramos exitosamente tu pedido!</h4>
                        </div>
                        <div className="purchaseDetail__messageContainer--backToHome">
                            <Link to="/" onClick={deleteOrder}>
                                Volver al listado de productos
                                <FontAwesomeIcon className= "mx-1" icon = { faUndo } />
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-md-4 purchaseDetail__clientContainer">
                        <div className = "purchaseDetail__clientTitle">
                            <span>Datos del cliente:</span>
                        </div>
                        <div className = "purchaseDetail__clientData">
                            <ul className="p-2">
                                <li>Orden de compra: 
                                    <span> { id }</span>
                                </li>
                                <li>Nombre: 
                                    <span> { name }</span>
                                </li>
                                <li>Telefono: 
                                    <span> { phone }</span>
                                </li>
                                <li>Email: 
                                    <span> { email }</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-8 purchaseDetail__itemsContainer">
                        <div className="purchaseDetail__itemsTitle">
                            <span>Detalle de la compra:</span>
                        </div>
                        <div className="p-2">
                            {
                                items.map(({ id , name , price}) => (
                                    <article key={name} className="purchaseDetail__article mb-1">
                                        <div>
                                            <p className="m-0">ID</p>
                                            <span>{id}</span>
                                        </div>
                                        <div>
                                            <p className="m-0">Producto</p>
                                            <span>{name}</span>
                                        </div>
                                        <div>
                                            <p className="m-0">Precio</p>
                                            <span>${price}</span>
                                        </div>
                                    </article>
                                ))
                            }
                        </div>
                        <div className="purchaseDetail__dateContainer">
                            <p>Fecha de la compra</p>
                            <span>{ date }</span>
                        </div>
                        <div className="purchaseDetail__totalContainer">
                            <p>Total de la compra</p>
                            <span>${ total }</span>
                        </div>
                    </div>          
                </div>
            </>
        )
    }
    return (
        <section className = "container mt-4 purchaseDetail">
            {
                (!loadingPage) ? <Loading /> :
                ( detailPurchase !== undefined ) ? printDetailPurchase( detailPurchase )
                :
                <div className="row">
                    <div className="col-md-12 purchaseDetail__orderNone">
                        <h6>No se registraron ordenes de compra </h6>
                    </div>
                </div>
            }
        </section>
    );
}

export default PurchaseDetail;
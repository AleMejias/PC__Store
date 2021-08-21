import React, { useState , useContext }  from 'react';
/* ROUTER */
import { Link } from 'react-router-dom';
/* DEPENDENCIAS */
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCheckCircle , faTruck , faShieldAlt } from '@fortawesome/free-solid-svg-icons';
/* Components */
import ItemCount from './ItemCount';
/* CONTEXT */
import CartContext from '../context/CartContext';

const ItemDetail = ({item}) => {
     const {description} = item; //Hago destructuring del arreglo que contiene los detalles del producto para luego pintarlos con un bucle
     const { name , price , stock , image} = item;
     const priceWithIva = price * 1.21;
     let stockColor = (stock < 4) ? "#FF8300" : "#00E303"; // color a definir segun le cantidad de stock recibida
     let stockText = (stock < 4) ? "STOCK BAJO" : "STOCK ALTO"; //Mensaje a definir segun el stock recbido

    /* Tendremos 2 estados:  Uno para la cantidad que se desea agregar, y otro para guardar la cantidad que se agrega */
    const [quantify,setQuantify] = useState( 1 );
    const [ purchase, setPurchase ] = useState( null );

    /* CONTEXTO */
    const {addItemToCart} = useContext( CartContext );
    
    return (
      <>
        <div className = "row">
          <div className = "col-md-8">
            <div className = "detail__containerTitle">
              <h2>{ name }</h2>
            </div>
            <div className = "detail__containerImg mt-2">
              <img src= {image} alt = {name}/>
            </div>
          </div>
          <div className = "col-md-4 py-1">
            <div className= "detail__containerPrice">
              <span>${ price }</span>
            </div>
            <div className= "detail__containerPriceWithIva">
              <span>Precio de lista: </span><small> ${ priceWithIva }</small>
            </div>
            <div className="detail__containerFee mt-2">
              <span>12 cuotas de sin interés de <small>${ (priceWithIva / 12).toFixed(2) }</small> a precio de lista.</span>
            </div>
            <div className="detail__containerStock mt-2">
              <div className = "detail__containerStock--iconContainer">
                <FontAwesomeIcon icon= {faCheckCircle} style={{color:`${stockColor}`}}/>
              </div>
              <div className="detail__containerStock--textStockContainer">
                <span style={{color:`${stockColor}`}}>
                  {stockText}
                </span>
              </div>
            </div>
            <div className="detail__containerShipping mt-2">
              <div className="detail__containerShipping--iconContainer">
                <FontAwesomeIcon icon={faTruck} />
              </div>
              <div className="detail__containerShipping--textShippingContainer">
                <span>Envíos a todo el país.</span>
              </div>
            </div>
            <div className="detail__containerGuarantee mt-2">
              <div className="detail__containerGuarantee--iconContainer">
                <FontAwesomeIcon icon={faShieldAlt} />
              </div>
              <div className="detail__containerGuarantee--textGuaranteeContainer">
                <span>Garantía por 360 días.</span>
              </div>
            </div>
            <div className="detail__containerPurchase mt-4">
              {/* EL ESTADO DE LA COMPRA ( PURCHASE ) COMIENZA EN NULL, Y ESO HACE QUE MUESTRE EL BOTON DE COMPRA PORQUE NO TIENE VALOR, UNA VEZ TENGA VALOR PUES MOSTRARA EL BOTON "TERMINAR COMPRA" Y MANDARA POR PARAMETRO DE LA URL LA CANTIDAD QUE SE COMPRÓ */}
              {
                (purchase === null) 
                ? <ItemCount stock={stock} quantify={quantify} setQuantify={setQuantify} setPurchase = {setPurchase}/>
                :  <Link to={`/cart`}>
                    <button className="detail__containerPurchase--btnPurchase" onClick = { () => addItemToCart( item , purchase) }>TERMINAR COMPRA</button>
                   </Link>
              }
            </div>
          </div>
        </div>
        <div className="row px-3 py-3">
          <div className="col-md-12 properties">
            <div className="properties__titleContainer">
              <h4>ESPECIFICACIONES DEL PRODUCTO</h4>
            </div>
            <div className="properties__listContainer">
              <ul>
                {
                  // COMO ITEM.DESCRIPCION ES UNDEFINED Y LUEGO DE DOS SEGUNDOS TOMA VALORES, ENTONCES COLOQUE ESTA CONDICIONAL PARA EVITAR
                  // ERRORES EN EL MAP , ERA MEJOR UTILIZAR UN useEffect ???
                  (description !== undefined) ? 
                  description.map((property,index) => (
                    <li key={index}>{Object.getOwnPropertyNames(property)}:<span>{Object.values(property)}</span></li>
                  )) : ""
                }
              </ul>
            </div>
          </div>
        </div>
      </>
    );
}

export default ItemDetail;
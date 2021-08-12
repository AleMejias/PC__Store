import React, { useState }  from 'react';
import { Link } from 'react-router-dom';
/* DEPENDENCIAS */
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCheckCircle , faTruck , faShieldAlt } from '@fortawesome/free-solid-svg-icons';
import {imgArr} from '../img';
/* Components */
import ItemCount from './ItemCount';

const ItemDetail = ({item}) => {
     const {descripcion} = item; //Hago destructuring del arreglo que contiene los detalles del producto para luego pintarlos con un bucle
     const { id , nombre , precio } = item;
     const priceWithIva = precio * 1.21;
     let stockColor = (item.stock < 4) ? "#FF8300" : "#00E303"; // color a definir segun le cantidad de stock recibida
     let stockText = (item.stock < 4) ? "STOCK BAJO" : "STOCK ALTO"; //Mensaje a definir segun el stock recbido
    /* Tendremos 2 estados:  Uno para la cantidad que se desea agregar, y otro para guardar la cantidad que se agrega */
    const [quantify,setQuantify] = useState( 1 );
    const [ purchase, setPurchase ] = useState( null );
    return (
      <>
        <div className = "row">
          <div className = "col-md-8">
            <div className = "detail__containerTitle">
              <h2>{ nombre }</h2>
            </div>
            <div className = "detail__containerImg mt-2">
              <img src= {imgArr[id]} alt = {nombre}/>
            </div>
          </div>
          <div className = "col-md-4 py-1">
            <div className= "detail__containerPrice">
              <span>${ precio }</span>
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
              
              {
                (purchase === null) ? <ItemCount stock={item.stock} quantify={quantify} setQuantify={setQuantify} setPurchase = {setPurchase}/>
                                 :  <Link to={`/cart/${purchase}`}><button className="detail__containerPurchase--btnPurchase">TERMINAR COMPRA</button></Link>
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
                  (descripcion !== undefined) ? 
                  descripcion.map((property,index) => (
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
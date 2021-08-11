import React from 'react';
import { Link } from 'react-router-dom';


const Item  = ({id ,nombre,precio,img}) => {

    return (
        <>
            <article className = "articulo" key={id}>
                <div className = "articulo__divImg">
                <img src={img} alt = {nombre}/>
                </div>
                <div className = "articulo__divNombre">
                    <h4>{nombre}</h4>
                </div>
                <div className = "articulo__divPrecio">
                    <span>$ {precio}</span>
                </div>
                <div className="articulo__divCuotas">
                    <span>12 Cuotas de $ {(precio / 12).toFixed(2)}</span>
                </div>
                <div className="articulo__divBtnDetalle">
                    <Link to = {`/detalle/${id}`}><button>Ver Producto</button></Link>
                </div>
            </article>
        </>
    );
}

export default Item;

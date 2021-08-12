import React from 'react';


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
                    <button>Ver Producto</button>
                </div>
            </article>
        </>
    );
}

export default Item;

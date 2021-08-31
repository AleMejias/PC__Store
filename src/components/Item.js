import React from 'react';


const Item  = ({id ,name,price,image}) => {

    return (
        <>
            <article className = "articulo mt-4" key={id}>
                <div className = "articulo__divImg">
                    <img src={image} alt = {name} />
                </div>
                <div className = "articulo__divNombre">
                    <h4>{name}</h4>
                </div>
                <div className = "articulo__divPrecio">
                    <span>$ {price}</span>
                </div>
                <div className="articulo__divCuotas">
                    <span>12 Cuotas de $ {(price / 12).toFixed(2)}</span>
                </div>
                <div className="articulo__divBtnDetalle">
                    <button>Ver Producto</button>
                </div>
            </article>
        </>
    );
}

export default Item;

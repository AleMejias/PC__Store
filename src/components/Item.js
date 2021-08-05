import React,{useState} from 'react';

//Components
/* import ItemDetail from './ItemDetail'; */
import ItemDetailContainer from './ItemDetailContainer';

const Item  = ({id ,nombre,precio,img}) => {
    const [modalShow, setModalShow] = useState(false);
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
                    <button onClick={() => setModalShow(true)}>Ver Producto</button>
                </div>
            </article>
            <ItemDetailContainer show={modalShow} onHide={() => setModalShow(false)} id={id} />
        </>
    );
}

export default Item;

import React from 'react';


const ItemCount = ( {stock,quantify,setQuantify,setPurchase} ) => {


    // Aumento
    const addQuantify = () => (quantify !== stock) ? setQuantify( quantify + 1 ) : "";

    // Decremento
    const subtractQuantify = () => (quantify > 1) ? setQuantify( quantify - 1 ) : "";

    // Registo la compra
    const onAdd = () => {
        setPurchase( quantify ); // Aqui guardo la cantidad de items "comprada"
        setQuantify( 1 ); // Una vez guardada la cantidad de items, los reinicio a 1. 
    }

    return (
        <>
            <div className="detail__containerPurchase--countContainer mb-2">
                <button onClick= {subtractQuantify}>-</button>
                <span>{ quantify }</span>
                <button onClick= { addQuantify }>+</button>
            </div>
            <button className="detail__containerPurchase--btnPurchase" onClick= { onAdd }>COMPRAR</button>
        </>

    );
};

export default ItemCount;
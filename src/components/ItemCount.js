import React from 'react';


const ItemCount = ( {stock,quantify,setQuantify} ) => {

    const addQuantify = () => (quantify !== stock) ? setQuantify( quantify + 1 ) : "";

    const subtractQuantify = () => (quantify > 1) ? setQuantify( quantify - 1 ) : "";

    return (
        <>
            <div className="detail__containerPurchase--countContainer mb-2">
                <button onClick= {subtractQuantify}>-</button>
                <span>{ quantify }</span>
                <button onClick= { addQuantify }>+</button>
            </div>
        </>

    );
};

export default ItemCount;
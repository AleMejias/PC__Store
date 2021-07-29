import React,{useState} from 'react';


const ItemCount = ( {stock,initialValue} ) => {

    /* Tendramos 2 estados:  Uno para la cantidad que se desea agregar, y otro para guardar la cantidad que se agrega */
    const [quantify,setQuantify] = useState( initialValue );
    const [ purchase, setPurchase ] = useState( 0 );

    // Aumento
    const addQuantify = () => (quantify !== stock) ? setQuantify( quantify + 1 ) : "";

    // Decremento
    const subtractQuantify = () => (quantify > 1) ? setQuantify( quantify - 1 ) : "";

    // Registo la compra
    const onAdd = () => {
        setPurchase( quantify ); // Aqui guardo la cantidad de items "comprada"
        setQuantify( 1 ); // Una vez guardada la cantidad de items, los reinicio a 0. 
    }

    return (
        <>
            <div className = "d-flex justify-content-center px-2 py-2">
                <p>{quantify}</p>
            </div>
            <div className=" d-flex justify-content-center">
                <button className="btn btn-danger" onClick={subtractQuantify} >-</button>
                <button className="btn btn-success mx-2" onClick={()=> onAdd(quantify)}>Agregar</button>
                <button className="btn btn-primary" onClick = {addQuantify}>+</button>
            </div>
            <div className = "d-flex justify-content-center mt-4">
                <p> Cantidad agregada: <strong>{ purchase }</strong></p>
            </div>
        </>
    );
};

export default ItemCount;
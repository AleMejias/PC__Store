import React, { useContext, useState } from 'react';

/* CONTEXT */
import CartContext from '../context/CartContext';

/* REACTBOOTSTRAP */
import { Modal } from 'react-bootstrap';
import { dataBase } from '../fireBaseConfig';

/* ROUTER */
import { Link } from 'react-router-dom';

const client = {
    name: "",
    phone: "",
    email:"",
    confirmEmail:""
}

const ClientForm = ({show , onHide, total}) => {
    const [ isValid , setIsValid ] = useState(client);
    const [ clientData, setClientData ] = useState(client);
    const [  purchasedCompleted , setPurchasedCompleted ] = useState(false);

    /* CONTEXTO */
    const { purchases, clearCart} = useContext( CartContext );
    const items = []; // Aqui se cargaran los objetos provenientes del estado para ser cargados a firebase

    const validatedInputForm = (value , inputType) => {
        let isValid;

        switch( inputType ){
            case 'name':
                isValid = new RegExp(/^([A-Za-z ñáéíóú]{3,15})$/i);
                break;
            case 'phone':
                isValid = new RegExp(/^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$/);
                break;
            default:
                isValid = new RegExp(/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i);
        }
        return isValid.test(value);
    };
    const getDate = () => {
        const date = new Date();
        const mins = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes() ;
        const hours = date.getHours();
        const year = date.getFullYear();
        const day = date.getDate();
        const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
        const time = hours < 13 ? 'am' : 'pm'
        const result = `${day}/${month}/${year}, a las ${hours}:${mins} ${time}`;

        return result;
    }

    const sendPurchaseToFireBase = async () => {
        const date = getDate();
        purchases.map((element) => items.push( element.item ))
        const order = {
            buyer: clientData,
            items: items,
            date: date,
            total: total()
        }
        await dataBase.collection('order').doc().set(order)
        .then(() => {
            setPurchasedCompleted(true)
            setClientData({...client})
        })

    }
    const handleSubmit = ( data ) => {
        data.preventDefault();
        sendPurchaseToFireBase();
        clearCart();
    }
    const handleInputChange = ( data ) => {
        const { value , name } = data.target;
        const response = validatedInputForm(value,name);
        setIsValid( {...clientData, [name]: response} );
        setClientData({...clientData , [name] : value});
    }
    return (
      <Modal
        className= "modalForm"
        show={ show }
        onHide = { onHide }
        backdrop="static"
        keyboard={false}
        animation={true}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton className="modalForm__header">
          <Modal.Title id="contained-modal-title-vcenter" className= "modalForm__header--titleContainer">
            <h6>
                {
                    ( purchasedCompleted ) ? '¡Felicitaciones, tu compra se generó correctamente!' : 'Generar orden de compra'
                }
            </h6>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="modalForm__body">
            <form className=
            {
                ( !purchasedCompleted ) ? 'show modalForm__body--formContainer' : 'hide'
            } 
                 onSubmit={ handleSubmit }>
                <label htmlFor="name">Nombre</label>
                    <input type ="text" name="name" placeholder="Introduce tu nombre" onChange={ handleInputChange }
                    value={clientData.name}
                    className=
                    {
                        (isValid.name === "" || clientData.name === "") ? 'border' :
                        (isValid.name) ? 'valid' : 'notValid'                   
                    }/>
                <label htmlFor="phone">Telefono</label>
                    <input type="tel" name="phone" placeholder="Introduce tu número de contacto sin el signo +" onChange={ handleInputChange }
                    value={clientData.phone}
                    className=
                    {
                        (isValid.phone === "" || clientData.phone === "") ? 'border' :
                        (isValid.phone) ? 'valid' : 'notValid'                   
                    }
                    />
                <label htmlFor="email">Email</label>
                    <input type="email" name="email" placeholder="Introduce tu email" onChange={ handleInputChange }
                    value={clientData.email}
                    className=
                    {
                        (isValid.email === "" || clientData.email === "") ? 'border' :
                        (isValid.email) ? 'valid' : 'notValid'                   
                    }
                    />
                <label htmlFor="confirmEmail">Confirmar Email</label>
                    <input type="email" name="confirmEmail" placeholder="Confirmar tu email" onChange={ handleInputChange }
                    value={clientData.confirmEmail}
                    className=
                    {
                        (isValid.confirmEmail === "" || clientData.confirmEmail === "") ? 'border' :
                        (isValid.confirmEmail && clientData.email === clientData.confirmEmail) ? 'valid' : 'notValid'   
                    }
                    />
                <div className="mt-1 modalForm__body--btnSubmitContainer">
                    {
                        <input type="submit" value="Finalizar Compra"
                        disabled=
                        {
                            (clientData.name && clientData.phone && clientData.email !== "" && clientData.confirmEmail !== "" && 
                            clientData.email === clientData.confirmEmail) ? false : true
                        }
                        />
                    }
                </div>
            </form>
        </Modal.Body>
        <div className=
        {
            (!purchasedCompleted) ? 'hide' : 'show modalForm__Footer'
        }>
            <Link to="/order">
                Ver orden de compra
            </Link>
        </div>
      </Modal>
    );
  }

export default ClientForm;
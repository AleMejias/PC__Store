import React from 'react';

import {Modal,Container,Row,Col} from 'react-bootstrap';
import {imgArr} from '../img';

const ItemDetail = ({onHide,item}) => {
  const {descripcion} = item; //Hago destructuring del arreglo que contiene los detalles del producto para luego pintarlos con un bucle
    return (
      <>
          <Modal.Header closeButton onClick={onHide}>
            <Modal.Title id="contained-modal-title-vcenter">
              {item.nombre}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="show-grid">
            <Container>
              <Row>
                <Col xs={12} md={6}>
                  <img src={imgArr[item.id]} alt = {item.nombre} className="modal-img"/>
                </Col>
                <Col xs={6} md={6}>
                  <ul className="lista-detalle">
                  <div className="px-1 py-1 text-end">
                      <h5 className="display-6 text-dark">${item.precio}</h5>
                    </div>
                    <div className="px-1 py-1 text-center">
                      <h5>Detalles</h5>
                    </div>
                    {
                      descripcion.map((propiedad,index) => (
                        <li key={index}>
                          <strong>{Object.getOwnPropertyNames(propiedad)}:</strong><span className="mx-1">{Object.values(propiedad)}</span>
                        </li>
                      ))
                    }
                  </ul>
                </Col>
              </Row>
            </Container>
          </Modal.Body>
      </>
    );
}

export default ItemDetail;
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FormForEdit from './form/form';

const ModalDetailProduct=(props)=> {
  const {show, setShow, fetchAllProducts} = props
 

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>

      <Modal 
        show={show} 
        onHide={handleClose}
        size="xl"
        >
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormForEdit 
            fetchAllProducts = {fetchAllProducts}
          ></FormForEdit>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
         
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalDetailProduct;
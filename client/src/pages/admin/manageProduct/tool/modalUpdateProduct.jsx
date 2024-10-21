import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import FormForEdit from "./form/form";
import FormForUpdate from "./form/formUpdate";

const ModalUpdateProduct = (props) => {
  const { show, setShow, fetchAllProducts, productUpdate } = props;

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Modal show={show} onHide={handleClose} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormForUpdate
            fetchAllProducts={fetchAllProducts}
            productUpdate={productUpdate}
            handleClose={handleClose}
          ></FormForUpdate>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalUpdateProduct;

import axios from "../../../../utils/axios.customize";
import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";

const ModalDeleteOrder = (props) => {
  const { show, setShow, data } = props;
  console.log("Day la data: ", data);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDelete = async () => {
    try {
      const res = await axios.delete(
        `http://localhost:5000/api/orders/${data}`
      );
      console.log("delete: ", res);
      toast.success("Delete success");
      handleClose();

      await props.fetchAllInvoices();
    } catch (err) {
      toast.error("Delete fail");
      console.log(err);
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure to delete?
          <br />
          Order ID: <b>{data ? data : ""}</b>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleDelete}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalDeleteOrder;

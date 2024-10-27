import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import DataTable from "./content/tableOfDetailUser";

function ModalDetailOrderOfUser(props) {
  const { show, setShow, data } = props;

  return (
    <>
      <Modal
        size="xl"
        show={show}
        onHide={() => setShow(false)}
        keyboard={false}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            All order of User
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DataTable data={data}></DataTable>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModalDetailOrderOfUser;

import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
// import * as React from 'react';
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import './ModelDetailproduct.scss'
const ModalDetailProduct = (props) => {
  const { show, setShow, data } = props;
   
    
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

 const VND = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    });


    const rows = data.map(orderItem => ({
        name : orderItem.name,
        id: orderItem.order_item_id,
        color: orderItem.color,
        size: orderItem.size,
        price: VND.format(orderItem.price),
        quantity: orderItem.quantity,
        order_item_id: orderItem.order_item_id
    }))

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

//   function createData(name, calories, fat, carbs, protein) {
//     return { name, calories, fat, carbs, protein };
//   }

  
  return (
    <>
      <Modal
    
        size="xl"
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        className="modal-detail-order"
      >
        <Modal.Header closeButton>
          <Modal.Title>Detail Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell >Name product</StyledTableCell>
                  <StyledTableCell align="right">ID</StyledTableCell>
                  <StyledTableCell align="right">Color</StyledTableCell>
                  <StyledTableCell align="right">
                    Size
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    price
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    Quantity
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <StyledTableRow key={row.order_item_id}>
                    <StyledTableCell component="th" scope="row">
                      {row.name}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.id}
                    </StyledTableCell>
                    <StyledTableCell align="right">{row.color}</StyledTableCell>
                    <StyledTableCell align="right">{row.size}</StyledTableCell>
                    <StyledTableCell align="right">
                      {row.price}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.quantity}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          
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

export default ModalDetailProduct;

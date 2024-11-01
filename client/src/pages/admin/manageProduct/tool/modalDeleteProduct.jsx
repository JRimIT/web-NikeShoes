import axios from "axios";
import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { deleteProduct, getProductById } from "../../../../data/api/apiService";
import { Avatar, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";

const ModalDeleteProduct = (props) => {
    const { show, setShow, product, fetchAllProducts } = props;
    // console.log("Day la data: ", id);
   
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    

    const handleDelete = async () => {
        try {
            const res = await deleteProduct(product.product_id)
            //   console.log("delete: ", res);
             fetchAllProducts();
            toast.success("Delete success");
            handleClose();

        } catch (err) {

            toast.error("Delete fail");
            console.log(err);
        }
    };

    return (
        <>


            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"

            >
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure to delete?<br />
                    {/* Product ID: <b>{product.product_id ? product.product_id : ""}</b> */}

                    <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                            <Avatar alt="Remy Sharp" src={product.primary_image} />
                        </ListItemAvatar>
                        <ListItemText
                            primary={product.name}
                            secondary={
                                <React.Fragment>
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        sx={{ color: 'text.primary', display: 'inline' }}
                                    >
                                        ID: {product.product_id}
                                    </Typography>
                                    {/* {" — I'll be in your neighborhood doing errands this…"} */}
                                </React.Fragment>
                            }
                        />
                    </ListItem>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleDelete}>Ok</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalDeleteProduct;

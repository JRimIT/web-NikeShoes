import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import * as formik from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import {
  createNewProduct,
  updateProductById,
} from "../../../../../data/api/apiService";
import axios from "axios";

import loadingGif from "../../../../../assets/Spin@1x-1.0s-200px-200px.gif";

function FormForUpdate(props) {
  const { fetchAllProducts, productUpdate, handleClose } = props;
  const { Formik } = formik;

  const [previewPrivateImage, setPreviewPrivateImage] = useState("");
  const [previewListColorImage, setPreviewListColorImage] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "",
    stock: "",
    size: "",
    color: "",
    list_color: "",
    description: "",
    primary_image: "",
    pro_message_list: "",
  });

  useEffect(() => {
    // Populate the form with the existing product data
    setProduct(productUpdate);
  }, [productUpdate]);

  const schema = yup.object().shape({
    name: yup.string().required(),
    category: yup.string().required(),
    price: yup.number().required(),
    stock: yup.number().required(),
    size: yup.string(),
    description: yup.string().required(),
    pro_message_list: yup.string(),
  });

  const handleChangeInput = (e) => {
    setProduct((prev) => ({
      ...prev,
      [e.target.name]: e.target.value, // Update state dynamically
    }));
  };

  const handleSubmitForm = async (values) => {
    setIsLoading(true);
    setTimeout(async () => {
      setIsLoading(false);

      try {
        console.log("Updated product data:", values);

        let res = await updateProductById(productUpdate.product_id, values); // Send updated product data to the API

        fetchAllProducts(); // Refresh product list

        toast.success(res);
        handleClose();
      } catch (error) {
        console.log(error);
        toast.error(error);
      }
    }, 3000);
  };

  return (
    <Formik
      validationSchema={schema}
      noValidate
      onSubmit={handleSubmitForm}
      enableReinitialize={true} // Enable form to reinitialize when productUpdate changes
      initialValues={product} // Use product state as initial values
    >
      {({ handleSubmit, handleChange, values, touched, errors }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group
              as={Col}
              md="4"
              controlId="validationFormik101"
              className="position-relative"
            >
              <Form.Label>Name Product</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={values.name} // Bind to Formik's values
                onChange={handleChange} // Use Formik's handleChange for updates
                isValid={touched.name && !errors.name}
              />
              <Form.Control.Feedback tooltip>Looks good!</Form.Control.Feedback>
            </Form.Group>

            <Form.Group
              as={Col}
              md="4"
              controlId="validationFormik102"
              className="position-relative"
            >
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                name="category"
                value={values.category}
                onChange={handleChange}
                isValid={touched.category && !errors.category}
              />
              <Form.Control.Feedback tooltip>Looks good!</Form.Control.Feedback>
            </Form.Group>

            <Form.Group
              as={Col}
              md="4"
              controlId="validationFormik102"
              className="position-relative"
            >
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="text"
                name="price"
                value={values.price}
                onChange={handleChange}
                isValid={touched.price && !errors.price}
              />
              <Form.Control.Feedback tooltip>Looks good!</Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group
              as={Col}
              md="4"
              controlId="validationFormik103"
              className="position-relative"
            >
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type="text"
                name="stock"
                value={values.stock}
                onChange={handleChange}
                isInvalid={!!errors.stock}
              />
              <Form.Control.Feedback type="invalid" tooltip>
                {errors.stock}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group
              as={Col}
              md="4"
              controlId="validationFormik104"
              className="position-relative"
            >
              <Form.Label>Size</Form.Label>
              <Form.Control
                type="text"
                name="size"
                value={values.size}
                onChange={handleChange}
                isInvalid={!!errors.size}
              />
              <Form.Control.Feedback type="invalid" tooltip>
                {errors.size}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group
              as={Col}
              md="2"
              controlId="validationFormik105"
              className="position-relative"
            >
              <Form.Label>Color</Form.Label>
              <Form.Control
                type="text"
                name="color"
                value={values.color}
                onChange={handleChange}
                isInvalid={!!errors.color}
              />
              <Form.Control.Feedback type="invalid" tooltip>
                {errors.color}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Form.Group className="position-relative mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              name="description"
              value={values.description}
              onChange={handleChange}
              isInvalid={!!errors.description}
            />
            <Form.Control.Feedback type="invalid" tooltip>
              {errors.description}
            </Form.Control.Feedback>
          </Form.Group>

          <Button type="submit">
            {isLoading ? (
              <img src={loadingGif} alt="Loading..."></img>
            ) : (
              "Submit Form"
            )}
          </Button>
        </Form>
      )}
    </Formik>
  );
}

export default FormForUpdate;

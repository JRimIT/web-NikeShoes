import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import * as formik from "formik";
import * as yup from "yup";

import "./preview.scss";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useMemo } from "react";
import { createNewProduct } from "../../../../../data/api/apiService";
import { toast } from "react-toastify";

import loadingGif from "../../../../../assets/Dual Ring@1x-1.0s-200px-200px.gif";

function FormForEdit(props) {
  const { fetchAllProducts, handleClose } = props;
  const { Formik } = formik;
  const [url_Color, setUrl_Color] = useState([]);
  const [primaryImage, setPrimaryImage] = useState("");
  const [listColorImage, setListColorImage] = useState([]);
  const [previewPrivateImage, setPreviewPrivateImage] = useState("");
  const [previewListColorImage, setPreviewListColorImage] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  let primary_image = "";
  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "",
    stock: "",
    size: "",
    color: "",
    list_color: "",
    description: "",
    primary_image: primaryImage,
    pro_message_list: "",
  });

  useEffect(() => {
    console.log("Create product:", product);
  }, [product, url_Color]);

  const schema = yup.object().shape({
    name: yup.string().required(),
    category: yup.string().required(),
    username: yup.string().required(),
    description: yup.string().required(),
    pro_message_list: yup.string().required(),
    price: yup.number().required(),
    stock: yup.number().required(),
    primary_image: yup.mixed().required(),
    list_color: yup.mixed(),
    size: yup.string(),
  });

  const handlePreviewListColorImage = (event) => {
    const files = event.target.files; // Get the first selected file => files is obj
    console.log("List color: ", files);

    if (files) {
      const fileArray = Array.from(files); //Convert files is FileList obj to Array
      setPreviewListColorImage([]);
      // console.log("fileArray: ",fileArray); // Log file information
      setListColorImage(files);

      fileArray.forEach((file) => {
        const reader = new FileReader();

        reader.onload = function (e) {
          console.log(e.target); // Base64 URL of the image
          setPreviewListColorImage((prev) => [...prev, e.target.result]); // Set the preview image here
        };

        reader.readAsDataURL(file); // Convert image to base64 format
      });
    }
  };
  const handlePreviewPrimaryImage = (event) => {
    const file = event.target.files[0]; // Get the first selected file
    if (file) {
      console.log(file); // Log file information
      setPrimaryImage(file);

      const reader = new FileReader();

      reader.onload = function (e) {
        console.log(e.target); // Base64 URL of the image
        setPreviewPrivateImage(e.target.result); // Set the preview image here
      };

      reader.readAsDataURL(file); // Convert image to base64 format
    }
  };

  const handleUploadPrimary_Image = async () => {
    const file = primaryImage;

    const CLOUD_NAME = "dzbhzlwoe";
    const PRESET_NAME = "maeqzsyj";
    const FOLDER_NAME = "Primary_image";
    // const urls = [];

    const api = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

    const formData = new FormData();
    formData.append("upload_preset", PRESET_NAME);
    formData.append("folder", FOLDER_NAME);
    formData.append("file", file);

    await axios
      .post(api, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        // setProduct({
        //     ...product, primary_image: res.data.url
        // })
        primary_image = res.data.url;
      })
      .catch((err) => console.log(err));
  };

  const handleUploadListColor_Image = async () => {
    const files = listColorImage;

    const CLOUD_NAME = "dzbhzlwoe";
    const PRESET_NAME = "maeqzsyj";
    const FOLDER_NAME = "ListColor_Image";
    setUrl_Color([]);

    const api = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

    const formData = new FormData();
    formData.append("upload_preset", PRESET_NAME);
    formData.append("folder", FOLDER_NAME);

    for (const file of files) {
      formData.append("file", file);

      await axios
        .post(api, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          url_Color.push(res.data.url);
        })
        .catch((err) => console.log(err));
    }
    // setUrl_Color(url_Color.length > 0 ? url_Color.join("; ") : "")
  };

  const updateProductState = (newValues) => {
    return new Promise((resolve) => {
      setProduct((prev) => {
        const updatedProduct = { ...prev, ...newValues };
        resolve(updatedProduct); // Trả về state mới sau khi đã được cập nhật
        return updatedProduct;
      });
    });
  };

  const handleSubmitForm = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setTimeout(async () => {
      setIsLoading(false);

      try {
        await handleUploadPrimary_Image();
        await handleUploadListColor_Image();

        // Đợi state cập nhật xong rồi log
        const updatedProduct = await updateProductState({
          primary_image: primary_image,
          list_color: url_Color.length > 0 ? url_Color.join("; ") : "",
        });

        console.log("Product after update:", updatedProduct);

        let res = await createNewProduct(updatedProduct);

        setProduct({
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

        fetchAllProducts();
        toast.success(res);
        handleClose();
      } catch (error) {
        console.log(error);
        toast.error(error);
      }
    }, 3000);
  };

  const handleChangeInput = (e) => {
    setProduct((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  return (
    <Formik
      validationSchema={schema}
      onSubmit={handleSubmitForm}
      initialValues={{
        name: product.name,
        price: product.price,
        category: product.category,
        stock: product.stock,
        size: product.size,
        color: product.color,
        list_color: product.list_color,
        description: product.description,
        primary_image: product.primary_image,
        pro_message_list: product.pro_message_list,
      }}
    >
      {({ handleSubmit, handleChange, values, touched, errors, isValid }) => (
        <Form noValidate>
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
                // value={values.name}
                onChange={(e) => handleChangeInput(e)}
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
                // value={values.category}
                onChange={(e) => handleChangeInput(e)}
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
                // value={values.price}
                onChange={(e) => handleChangeInput(e)}
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
                placeholder="stock"
                name="stock"
                // value={values.stock}
                onChange={(e) => handleChangeInput(e)}
                isValid={touched.stock && !errors.stock}
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
                placeholder="Size"
                name="size"
                // value={values.size}
                onChange={(e) => handleChangeInput(e)}
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
                placeholder="Color"
                name="color"
                aria-disabled
                // value={values.color}
                onChange={(e) => handleChangeInput(e)}
                isInvalid={!!errors.color}
              />

              <Form.Control.Feedback type="invalid" tooltip>
                {errors.color}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group
              as={Col}
              md="2"
              controlId="validationFormik105"
              className="position-relative"
            >
              <Form.Label>Message</Form.Label>
              <Form.Control
                type="text"
                placeholder="Message"
                name="pro_message_list"
                aria-disabled
                // value={values.pro_message_list}
                onChange={(e) => handleChangeInput(e)}
                isInvalid={!!errors.pro_message_list}
              />

              <Form.Control.Feedback type="invalid" tooltip>
                {errors.pro_message_list}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Form.Group className="position-relative mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              required
              name="description"
              // value={values.description}
              onChange={(e) => handleChangeInput(e)}
              isValid={touched.description && !errors.description}
              isInvalid={!!errors.description}
            />
            <Form.Control.Feedback type="invalid" tooltip>
              {errors.description}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="position-relative mb-3">
            <Form.Label>Primary image</Form.Label>
            <Form.Control
              type="file"
              required
              name="primary_image"
              onChange={(e) => handlePreviewPrimaryImage(e)}
              isInvalid={!!errors.primary_image}
            />

            <div className="col-md-12 img-preview">
              {previewPrivateImage ? (
                <img src={previewPrivateImage} alt="aaaaa" />
              ) : (
                <span>Preview Image</span>
              )}
            </div>
            <Form.Control.Feedback type="invalid" tooltip>
              {errors.primary_image}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="position-relative mb-3">
            <Form.Label>List color</Form.Label>
            <Form.Control
              type="file"
              multiple
              name="list_color"
              onChange={(e) => handlePreviewListColorImage(e)}
              isInvalid={!!errors.list_color}
            />
            <div className="col-md-12 img-preview">
              {previewListColorImage.length > 0 ? (
                previewListColorImage.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt="List Color"
                    className="img-preview"
                  />
                ))
              ) : (
                <span>Preview Image</span>
              )}
            </div>
            <Form.Control.Feedback type="invalid" tooltip>
              {errors.list_color}
            </Form.Control.Feedback>
          </Form.Group>

          <Button
            type="submit"
            disabled={!isValid || isLoading}
            onClick={(event) => {
              handleSubmitForm(event);
            }}
          >
            {isLoading ? (
              <img src={loadingGif} alt="Loading..."></img>
            ) : (
              "Submit form"
            )}
          </Button>
        </Form>
      )}
    </Formik>
  );
}

export default FormForEdit;

import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../../components/AdminSide/Header";
import { useEffect, useState } from "react";
import { FcPlus } from "react-icons/fc";
import "./scss/index.scss";
import axios from "axios";
import { toast } from "react-toastify";


const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const [previewImage, setPreviewImage] = useState(null);
  const [image, setImage] = useState("")
  const [infoUser, setInfoUser] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
    address_line: "",
    city: "",
    state: "",
    country: "",
    role_id: 1,
    user_image: image,
  })

  useEffect(() => {
    console.log("Updated infoUser:", infoUser);
  }, [infoUser]); // This runs when infoUser changes

  const handleFormSubmit = (values) => {
    console.log(values);
  };

  // sibmit-------------------------
  const handleUploadImage = async() => {
     const file = image;

      const CLOUD_NAME = "dzbhzlwoe"
      const PRESET_NAME = "maeqzsyj"
      const FOLDER_NAME = "Avartar_User"
      // const urls = [];

      const api = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`

      const formData = new FormData();
      formData.append("upload_preset", PRESET_NAME);
      formData.append("folder", FOLDER_NAME);
      formData.append("file", file);

      await axios.post(api, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
      }).then(res => {
        // console.log(res.data.url);
        // setImage(res.data.url);
        setInfoUser({
          ...infoUser, user_image: res.data.url
        })
        // console.log("=[>>>> Image: ", image);
        
        // setInfoUser({...infoUser, image: image})
      }).catch(err => console.log(err))
  }


  const handleSubmitUser = async (event) => {
    event.preventDefault(); 
    try {
     
      await handleUploadImage()
      console.log("Submit form: ", infoUser);
      
      const res = await axios.post("http://localhost:8802/api/user", infoUser)
      toast.success(res.data.message);
    } catch (err) {
      if (err.response && err.response.data.error) {
        toast.error(err.response.data.error);
        // Error message from server
      } else {
        toast.error("Something went wrong while creating the user");
      }
    }

  }
  const handlePreviewImage = (event) => {

    const file = event.target.files[0]; // Get the first selected file
    if (file) {
      console.log(file); // Log file information
      setImage(file)

      const reader = new FileReader();

      reader.onload = function (e) {
        console.log(e.target); // Base64 URL of the image
        setPreviewImage(e.target.result); // Set the preview image here
      };

      reader.readAsDataURL(file); // Convert image to base64 format
    }

    // If you prefer to use URL.createObjectURL for a local preview without base64 conversion:
    // console.log(URL.createObjectURL(file));

    // setPreviewImage(URL.createObjectURL(file));
  };
  const initialValues = {
      username: infoUser.username,
      email: infoUser.email,
      password: infoUser.password,
      phone: infoUser.phone,
      address_line: infoUser.address_line,
      city: infoUser.city,
      state: infoUser.state,
      country: infoUser.country,
      role_id: infoUser.role_id,
      image: infoUser.image,
  };

  const handleChangeInput = (e) => {
    setInfoUser(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }
  return (
    <Box m="20px">
      <Header title="CREATE USER" subtitle="Create a New User Profile" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form >
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label={infoUser.username ? "" : "User Name"}
                onBlur={handleBlur}
                onChange={handleChangeInput}
                // value={values.username}
                name="username"
                error={!!touched.username && !!errors.username}
                helperText={touched.username && errors.username}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label={infoUser.email ? "" : "Email"}
                onBlur={handleBlur}
                onChange={handleChangeInput}
                // value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label={infoUser.phone ? "" : " Phone"}
                onBlur={handleBlur}
                onChange={handleChangeInput}
                // value={values.phone}
                name="phone"
                error={!!touched.phone && !!errors.phone}
                helperText={touched.phone && errors.phone}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label={infoUser.password ? "" : "Pass Word"}
                onBlur={handleBlur}
                onChange={handleChangeInput}
                // value={values.password}
                name="password"
                error={!!touched.password && !!errors.password}
                helperText={touched.password && errors.password}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label={infoUser.address_line ? "" : "Address line"}
                onBlur={handleBlur}
                onChange={handleChangeInput}
                // value={values.address_line}
                name="address_line"
                error={!!touched.address_line && !!errors.address_line}
                helperText={touched.address_line && errors.address_line}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label={infoUser.city ? "" : "city"}
                onBlur={handleBlur}
                onChange={handleChangeInput}
                // value={values.city}
                name="city"
                error={!!touched.city && !!errors.city}
                helperText={touched.city && errors.city}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label={infoUser.state ? "" : "State"}
                onBlur={handleBlur}
                onChange={handleChangeInput}
                // value={values.state}
                name="state"
                error={!!touched.state && !!errors.state}
                helperText={touched.state && errors.state}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label={infoUser.country ? "" : "Country"}
                onBlur={handleBlur}
                onChange={handleChangeInput}
                // value={values.country}
                name="country"
                error={!!touched.country && !!errors.country}
                helperText={touched.country && errors.country}
                sx={{ gridColumn: "span 2" }}
              />


              <select class="form-select" aria-label="Default select example"
                onChange={handleChangeInput}
                name="role_id"
              >
                <option selected>Role</option>
                <option value={1}>User</option>
                <option value={2}>Admin</option>

              </select>

              <div className="col-md-12">


                <label
                  className="form-label label-upload"
                  htmlFor="labelUpload"
                >
                  <FcPlus></FcPlus> Upload File Image
                </label>
                <input
                  id="labelUpload"
                  type="file"
                  alt="none"
                  hidden
                  accept="image/png, image/jpeg"
                  onChange={(event) => handlePreviewImage(event)}
                ></input>
              </div>

              <div style={{ gridColumn: "span 4" }} className="col-md-12 img-preview">
                {previewImage ? (
                  <img src={previewImage} alt="aaaaa" />
                ) : (
                  <span>Preview Image</span>
                )}
              </div>
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained" onClick={(event) => handleSubmitUser(event)
              }>
                Create New User
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  contact: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  address1: yup.string().required("required"),
  address2: yup.string().required("required"),
});
// const initialValues = {
//   firstName: "",
//   lastName: "",
//   email: "",
//   contact: "",
//   address1: "",
//   address2: "",
// };


export default Form;

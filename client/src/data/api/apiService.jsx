import axios from "../../utils/axios.customize";

export const getAllProducts = async () => {
  try {
    const res = await axios.get(`api/allProducts`);

    return res;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const createNewProduct = async (product) => {
  try {
    const res = await axios.post(`api/products`, product);
    console.log("Create: ", res);
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const deleteProduct = async (id) => {
  try {
    const res = await axios.delete(`api/products/${id}`);
    return res;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getProductById = async (id) => {
  try {
    const res = await axios.get(`http://localhost:5000/products/${id}`);
    return res;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const updateProductById = async (id, body) => {
  try {
    const res = await axios.put(
      `http://localhost:5000/api/products/${id}`,
      body
    );
    return res;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getRevenuePerMonth = async (year) => {
  try {
<<<<<<< HEAD
    const res = await axios.get(
      `http://localhost:5000/api/revenue-per-month?year=${year}`
    );
=======
    const res = await axios.get(`/api/revenue-per-month?year=${year}`);
>>>>>>> 5394466e2f357ff7d74e7a8ee2bd13000e5ac89b
    return res;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getCountAllUsers = async () => {
  try {
<<<<<<< HEAD
    const res = await axios.get(`http://localhost:5000/api/user/count`);
=======
    const res = await axios.get(`/api/user/count`);
>>>>>>> 5394466e2f357ff7d74e7a8ee2bd13000e5ac89b
    return res;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getCountAllNewUser = async () => {
  try {
<<<<<<< HEAD
    const res = await axios.get("http://localhost:5000/api/user/countNewUser");
=======
    const res = await axios.get("/api/user/countNewUser");
>>>>>>> 5394466e2f357ff7d74e7a8ee2bd13000e5ac89b
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getRecentTransactions = async () => {
  try {
<<<<<<< HEAD
    const res = await axios.get("http://localhost:5000/api/transaction");
=======
    const res = await axios.get("/api/transaction");
>>>>>>> 5394466e2f357ff7d74e7a8ee2bd13000e5ac89b
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getCountSuccessTransactions = async () => {
  try {
<<<<<<< HEAD
    const res = await axios.get("http://localhost:5000/api/count_transaction");
=======
    const res = await axios.get("/api/count_transaction");
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getUserByToken = async () => {
  try {
    const res = await axios.get("/api/user/userinfo");
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getAllUser = async () => {
  try {
    const res = await axios.get("/api/allUser");
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getAllOrderOfUser = async (id) => {
  try {
    const res = await axios.get(`/api/order_Of_user?id=${id}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const deleteUserById = async (id) => {
  try {
    const res = await axios.delete(`/api/user/${id}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getUserById = async (id) => {
  try {
    const res = await axios.get(`/api/user?id=${id}`);
>>>>>>> 5394466e2f357ff7d74e7a8ee2bd13000e5ac89b
    return res;
  } catch (error) {
    console.log(error);
  }
};

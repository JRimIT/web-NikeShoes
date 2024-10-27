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
    const res = await axios.get(`/api/revenue-per-month?year=${year}`);
    return res;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getCountAllUsers = async () => {
  try {
    const res = await axios.get(`/api/user/count`);
    return res;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getCountAllNewUser = async () => {
  try {
    const res = await axios.get("/api/user/countNewUser");
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getRecentTransactions = async () => {
  try {
    const res = await axios.get("/api/transaction");
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getCountSuccessTransactions = async () => {
  try {
    const res = await axios.get("/api/count_transaction");
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getUserByToken = async () => {
  try {
    const res = await axios.get("/api/userinfo");
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
    return res;
  } catch (error) {
    console.log(error);
  }
};

import axios from "axios";

export const getAllProducts = async () => {
  try {
    const res = await axios.get(`http://localhost:5000/api/allProducts`);

    return res;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const createNewProduct = async (product) => {
  try {
    const res = await axios.post(`http://localhost:5000/api/products`, product);
    console.log("Create: ", res);
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const deleteProduct = async (id) => {
  try {
    const res = await axios.delete(`http://localhost:5000/api/products/${id}`);
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
    const res = await axios.get(
      `http://localhost:5000/api/revenue-per-month?year=${year}`
    );
    return res;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getCountAllUsers = async () => {
  try {
    const res = await axios.get(`http://localhost:5000/api/user/count`);
    return res;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getCountAllNewUser = async () => {
  try {
    const res = await axios.get("http://localhost:5000/api/user/countNewUser");
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getRecentTransactions = async () => {
  try {
    const res = await axios.get("http://localhost:5000/api/transaction");
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getCountSuccessTransactions = async () => {
  try {
    const res = await axios.get("http://localhost:5000/api/count_transaction");
    return res;
  } catch (error) {
    console.log(error);
  }
};

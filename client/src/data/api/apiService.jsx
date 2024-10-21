import axios from "axios"

export const getAllProducts = async() => {
    try {
        const res = await axios.get(`http://localhost:5000/api/allProducts`);
        
        return res
    } catch (error) {
        console.log(error);   
        return error
    }
}

export const createNewProduct = async ( product) => {
    try {
      const res = await axios.post(`http://localhost:5000/api/products`, product);
      console.log("Create: ", res);
        return res
    } catch (err) {
      console.log(err);
      return err
    }
  };

export const deleteProduct = async(id) => {
    try {
        const res = await axios.delete(`http://localhost:5000/api/products/${id}`)
        return res;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export const getProductById = async(id) => {
    try {
        const res = await axios.get(`http://localhost:5000/products/${id}`)
        return res;
    } catch (error) {
        console.log(error);
        return error
    }
}

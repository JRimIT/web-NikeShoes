import {
  Avatar,
  Box,
  IconButton,
  ListItemAvatar,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import { mockDataContacts } from "../../../data/admin/mockData";
import Header from "../../../components/AdminSide/Header";
import { Button } from "react-bootstrap";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import SearchTag from "./tag/SearchTag";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  deleteProduct,
  getAllProducts,
  getProductById,
} from "../../../data/api/apiService";

import { IoIosInformationCircle } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";
import Search from "./search/searchByInput";
import ModalDetailProduct from "./tool/modalDetailProduct";
import { toast } from "react-toastify";
import ModalDeleteProduct from "./tool/modalDeleteProduct";
import ModalUpdateProduct from "./tool/modalUpdateProduct";

const ManagerProduct = () => {
  const [initialProduct, setInitialProduct] = useState([]);
  const [products, setProducts] = useState([]);
  const [productDelete, setProductDelete] = useState({});
  const [productUpdate, setProductUpdate] = useState({});

  const [showModal, setShowModal] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  // const [isUpadteModal, setIsUpdateModal] = useState(false)
  const [idDelete, setIdDelete] = useState(0);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  useEffect(() => {
    fetchAllProducts();
  }, []);
  const fetchAllProducts = async () => {
    let res = await getAllProducts();
    // console.log("All products: ",res);

    if (res.status === 200) {
      // setProducts(res.data.products)
      const dataProducts = res.data.products.map((product) => {
        return {
          id: product.product_id,
          ...product,
          product_id: undefined, // Xóa product_id khỏi sản phẩm
        };
      });
      setInitialProduct(dataProducts);
      setProducts(dataProducts);
    }
  };

  const getProduct = async (idDelete) => {
    const pro = await getProductById(idDelete);
    return pro.data;
  };

  const handleClickDeleteModal = async (id) => {
    const res = await getProduct(id);
    setProductDelete(res);
    setShowModalDelete(true);
  };

  const handleModalDetailProduct = () => {
    handleShow();
  };
  const handleModalUpdateProduct = async (id) => {
    const res = await getProduct(id);
    setProductUpdate(res);
    setShowModalUpdate(true);
  };

  console.log("products: ", products);

  const VND = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  const columns = [
    { field: "id", headerName: "ID", flex: 0.2 },
    {
      field: "primary_image",
      headerName: "Image",
      flex: 0.2,
      renderCell: (params) => (
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src={params.row.primary_image} />
        </ListItemAvatar>
      ),
    },
    { field: "name", headerName: "Name", flex: 1 },

    {
      field: "category",
      headerName: "Category",
      flex: 0.8,
      cellClassName: "name-column--cell",
    },
    {
      field: "size",
      headerName: "Size",
      headerAlign: "left",
      align: "left",
      flex: 1,
    },
    {
      field: "color",
      headerName: "Color ",
      flex: 0.5,
    },
    {
      field: "stock",
      headerName: "Stock",
      flex: 0.2,
    },
    {
      field: "price",
      headerName: "Price",
      flex: 0.5,
      renderCell: (params) => (
        <Typography color={colors.greenAccent[500]}>
          {VND.format(params.row.price)}
        </Typography>
      ),
    },
    {
      headerName: "Tool",
      flex: 0.5,
      renderCell: (params) => (
        <>
          {/* <Button variant="contained">Contained</Button> */}
          <Button
            variant="info"
            onClick={() => handleModalUpdateProduct(params.row.id)}
          >
            <IoIosInformationCircle />
          </Button>{" "}
          <Button
            variant="danger"
            onClick={() => handleClickDeleteModal(params.row.id)}
          >
            <MdDeleteForever />
          </Button>
        </>
      ),
    },
  ];

  return (
    <>
      <Box m="20px">
        <Header title="Manage Product" subtitle="List of Product" />
        <Stack
          spacing={{ xs: 1, sm: 2 }}
          direction="row"
          useFlexGap
          sx={{ flexWrap: "wrap" }}
        >
          <SearchTag
            products={products}
            initialProduct={initialProduct}
            setInitialProduct={setInitialProduct}
            setProducts={setProducts}
          ></SearchTag>

          <Search
            products={products ? products : []}
            initialProduct={initialProduct ? initialProduct : []}
            setInitialProduct={setInitialProduct}
            setProducts={setProducts}
          ></Search>

          <Button variant="success" onClick={handleModalDetailProduct}>
            Create New Product
          </Button>
        </Stack>

        <Box
          m="40px 0 0 0"
          height="75vh"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .name-column--cell": {
              color: colors.greenAccent[300],
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: colors.blueAccent[700],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: colors.primary[400],
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "none",
              backgroundColor: colors.blueAccent[700],
            },
            "& .MuiCheckbox-root": {
              color: `${colors.greenAccent[200]} !important`,
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: `${colors.grey[100]} !important`,
            },
          }}
        >
          <DataGrid
            rows={products}
            columns={columns}
            components={{ Toolbar: GridToolbar }}
          />
        </Box>
      </Box>

      <ModalDetailProduct
        show={showModal}
        setShow={setShowModal}
        fetchAllProducts={fetchAllProducts}
      ></ModalDetailProduct>

      <ModalUpdateProduct
        show={showModalUpdate}
        setShow={setShowModalUpdate}
        fetchAllProducts={fetchAllProducts}
        productUpdate={productUpdate}
      ></ModalUpdateProduct>

      <ModalDeleteProduct
        show={showModalDelete}
        setShow={setShowModalDelete}
        fetchAllProducts={fetchAllProducts}
        product={productDelete}
      ></ModalDeleteProduct>
    </>
  );
};

export default ManagerProduct;

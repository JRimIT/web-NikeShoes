import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid, GridDeleteIcon } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import { mockDataInvoices } from "../../../data/admin/mockData";
import Header from "../../../components/AdminSide/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import { IoIosInformationCircle } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";
import ModalDetailProduct from "./content/ModalDetailProduct";
import ModalDeleteOrder from "./content/ModalDeleteOrder";

const Invoices = () => {
  const [showModalDetailProduct, setShowModalDetailProduct] = useState(false);
  const [showModalDeleteOrder, setShowModalDeleteOrder] = useState(false)

  const [invoices, setInvoices] = useState([]);
  const [detailOrder, setDetailOrder] = useState([]);
  const [dataDelete, setDataDelete] = useState(0)
  useEffect(() => {
    fetchAllInvoices();
  }, []);


  const fetchAllInvoices = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/allInvoices");
      let data = res.data.map((invoice) => ({
        id: invoice.order_id,
        username: invoice.username,
        email: invoice.email,
        phone: invoice.phone,
        order_Status: invoice.order_status,
        shipping_method: invoice.shipping_method,
        total_amount: invoice.total_amount,
      }));
      // console.log(data);

      setInvoices(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAllProductById = async (order_id) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/orders?order_id=${order_id}`
      );
      console.log(res);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const VND = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  // Handle show hide modal
  const handleClickDetailBtn = async (arrProduct) => {
    const data = await arrProduct;
    setShowModalDetailProduct(true);
    setDetailOrder(data);
  };


  useEffect(() => {
    console.log("Id to delete effect: ", dataDelete);

  }, [dataDelete]);
  const handleClickDeleteModal = (id) => {

    setShowModalDeleteOrder(true)
     setDataDelete(id)
    
  }
  
  
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "username",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 1,
    },
    // {
    //   field: "email",
    //   headerName: "Email",
    //   flex: 1,
    // },
    {
      field: "order_Status",
      headerName: "order Status",
      flex: 1,
    },
    {
      field: "shipping_method",
      headerName: "shipping method",
      flex: 1,
    },
    {
      field: "total_amount",
      headerName: "total_amount",
      flex: 1,
      renderCell: (params) => (
        <Typography color={colors.greenAccent[500]}>
          {VND.format(params.row.total_amount)}
        </Typography>
      ),
    },
    {
      headerName: "Tool",
      flex: 1,
      renderCell: (params) => (
        <>
          {/* <Button variant="contained">Contained</Button> */}
          <Button
            variant="info"
            onClick={() =>
              handleClickDetailBtn(fetchAllProductById(params.row.id))
            }
          >
            <IoIosInformationCircle />
          </Button>{" "}
          <Button variant="danger" 
            onClick={()=>{handleClickDeleteModal(params.row.id)}}
          >
            <MdDeleteForever />
          </Button>
        </>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header title="INVOICES" subtitle="List of Invoice Balances" />
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
        }}
      >
        <DataGrid rows={invoices} columns={columns} />
      </Box>

      <ModalDetailProduct
        show={showModalDetailProduct}
        setShow={setShowModalDetailProduct}
        data={detailOrder}
      ></ModalDetailProduct>

      <ModalDeleteOrder
        show = {showModalDeleteOrder}
        setShow = {setShowModalDeleteOrder}
        data= {dataDelete}
        fetchAllInvoices = {fetchAllInvoices}
      >

      </ModalDeleteOrder>
    </Box>
  );
};

export default Invoices;

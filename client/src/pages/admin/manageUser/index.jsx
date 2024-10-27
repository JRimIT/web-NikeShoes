import {
  Avatar,
  Box,
  IconButton,
  ListItemAvatar,
  useTheme,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../theme";

import Header from "../../../components/AdminSide/Header";

import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import SearchTag from "./tag/SearchTag";
import { useEffect } from "react";
import {
  getAllOrderOfUser,
  getAllUser,
  getUserById,
} from "../../../data/api/apiService";
import { useState } from "react";
import Search from "./search/searchByInput";
import { MdDeleteForever } from "react-icons/md";
import { Button } from "react-bootstrap";
import InfoIcon from "@mui/icons-material/Info";
import ModalDetailOrderOfUser from "./tool/ModalDetailOrdersOfUser";
import ModalDeleteUser from "./tool/ModalDeleteUser";

const ManagerUser = () => {
  const [users, setUsers] = useState([]);
  const [initialUsers, setInitialUsers] = useState([]);
  const [showModalDetail, setShowModalDetail] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [dataDetail, setDataDetail] = useState([]);
  const [userDelete, setUserDelete] = useState([]);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    fetchAllUsers();
  }, []);
  const fetchAllUsers = async () => {
    let res = await getAllUser();
    console.log("All users: ", res);

    if (res.status === 200) {
      // setProducts(res.data.products)
      const dataUsers = res.data.map((user) => {
        return {
          id: user.user_id,
          ...user,
          user_id: undefined, // Xóa product_id khỏi sản phẩm
        };
      });
      setInitialUsers(dataUsers);
      setUsers(dataUsers);
    }
  };

  const handleClickDetailBtn = async (id) => {
    const res = await getAllOrderOfUser(id);
    const orderByUser = res.data.map((order) => ({
      id: order.order_id,
      ...order,
    }));
    console.log("order by user: ", res.data);
    setShowModalDetail(true);
    setDataDetail(orderByUser);
  };

  const handleClickDeleteBtn = async (id) => {
    const res = await getUserById(id);
    console.log("USer delete: ", res.data[0]);

    setUserDelete(res.data[0]);
    setShowModalDelete(true);
  };
  const columns = [
    { field: "id", headerName: "ID", flex: 0.2 },
    {
      field: "user_image",
      headerName: "Image",
      flex: 0.2,
      renderCell: (params) => (
        <ListItemAvatar>
          <Avatar alt="Avatar" src={params.row.user_image} />
        </ListItemAvatar>
      ),
    },
    { field: "username", headerName: "User Name" },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "phone",
      headerName: "Phone",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "address_line",
      headerName: "Address",
      flex: 1,
    },
    {
      field: "city",
      headerName: "City",
      flex: 1,
    },
    {
      field: "state",
      headerName: "state",
      flex: 1,
    },
    {
      field: "country",
      headerName: "country",
      flex: 0.5,
    },
    {
      headerName: "Tool",
      flex: 0.6,
      renderCell: (params) => (
        <>
          {/* <Button variant="contained">Contained</Button> */}
          <Button
            variant="info"
            onClick={() => handleClickDetailBtn(params.row.id)}
          >
            <InfoIcon />
          </Button>{" "}
          <Button
            variant="danger"
            onClick={() => handleClickDeleteBtn(params.row.id)}
          >
            <MdDeleteForever />
          </Button>
        </>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header title="MANAGE USERS" subtitle="List of users" />
      <Box display="flex" justifyContent="space-between">
        <SearchTag
          users={users}
          initialUsers={initialUsers}
          setInitialUsers={setInitialUsers}
          setUsers={setUsers}
        ></SearchTag>
        <Search
          users={users ? users : []}
          initialUsers={initialUsers ? initialUsers : []}
          setInitialUsers={setInitialUsers}
          setUsers={setUsers}
        ></Search>
      </Box>
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
          rows={users}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>

      <ModalDetailOrderOfUser
        show={showModalDetail}
        setShow={setShowModalDetail}
        data={dataDetail}
      ></ModalDetailOrderOfUser>
      <ModalDeleteUser
        show={showModalDelete}
        setShow={setShowModalDelete}
        data={userDelete}
        fetchAllUsers={fetchAllUsers}
      ></ModalDeleteUser>
    </Box>
  );
};

export default ManagerUser;

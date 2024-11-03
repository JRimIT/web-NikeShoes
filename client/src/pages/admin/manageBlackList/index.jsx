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

import { useEffect } from "react";
import {
  getAllBlackList,
  getOrderOfUser,
  getUserById,
  getUserFromBlackList,
} from "../../../data/api/apiService";
import { useState } from "react";

import { MdDeleteForever } from "react-icons/md";
import { Button } from "react-bootstrap";
import InfoIcon from "@mui/icons-material/Info";
import ModalDeleteUser from "../manageUser/tool/ModalDeleteUser";
import ModalUnKickUser from "./tool/ModalUnKickUser";

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
    let res = await getAllBlackList();
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

  const handleClickDeleteBtn = async (id) => {
    const res = await getUserFromBlackList(id);
    console.log("UnKick: ", res.data[0]);

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
      field: "reason",
      headerName: "reason",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "added_at",
      headerName: "removed_at",
      flex: 1,
      cellClassName: "name-column--cell",
    },

    {
      headerName: "Tool",
      flex: 0.6,
      renderCell: (params) => (
        <>
          {/* <Button variant="contained">Contained</Button> */}

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
      <Header title="BLACKLIST" subtitle="List of users" />
      <Box display="flex" justifyContent="space-between"></Box>
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

      <ModalUnKickUser
        show={showModalDelete}
        setShow={setShowModalDelete}
        data={userDelete}
        fetchAllUsers={fetchAllUsers}
      ></ModalUnKickUser>
    </Box>
  );
};

export default ManagerUser;

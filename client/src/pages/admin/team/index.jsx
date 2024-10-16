import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import { mockDataTeam } from "../../../data/admin/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../../components/AdminSide/Header";
import { useEffect, useState } from "react";
import axios from "axios";


/*
    id: 5,
    name: "Daenerys Targaryen",
    email: "daenerystargaryen@gmail.com",
    age: 31,
    phone: "(421)445-1189",
    access: "user",

*/

const Team = () => {

      const [team, setTeam] = useState([])

      useEffect(() => {
          fetchAllAdmin()
      }, [])



      const fetchAllAdmin = async() => {
          try {
              const res = await axios.get("http://localhost:8802/api/allAdmin")
              // console.log(res.data);
              let data =  res.data.map(user => {
                return{
                  id: user.user_id,
                  username: user.username,
                  email: user.email,
                  phone: user.phone,
                  role_name: user.role_name

                }
              })
              
              
              setTeam(data)
          } catch (err) {
              console.log(err);
              
          }

          
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
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "role_name",
      headerName: "Access Level",
      flex: 1,
      renderCell: ({ row: { role_name } }) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              role_name === "admin"
                ? colors.greenAccent[600]
                : role_name === "manager"
                ? colors.greenAccent[700]
                : colors.greenAccent[700]
            }
            borderRadius="4px"
          >
            {role_name === "admin" && <AdminPanelSettingsOutlinedIcon />}
            {role_name === "manager" && <SecurityOutlinedIcon />}
            {role_name === "user" && <LockOpenOutlinedIcon />}
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {role_name}
            </Typography>
          </Box>
        );
      },
    },
  ];
  return (
    <Box m="5px">
      <Header title="TEAM" subtitle="Managing the team Members" />

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
        <DataGrid rows={team} columns={columns} />
      </Box>
    </Box>
  );
};
export default Team;
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid, GridDeleteIcon } from "@mui/x-data-grid";
import { tokens } from "../../../../../theme";

import Header from "../../../../../components/AdminSide/Header";

const DataTable = (props) => {
  const { data } = props;
  const VND = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "product_name",
      headerName: "Name product",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "size",
      headerName: "size",
      flex: 1,
    },
    {
      field: "quantity",
      headerName: "quantity",
      flex: 1,
    },
    {
      field: "order_status",
      headerName: "order_status",
      flex: 1,
    },
    {
      field: "order_date",
      headerName: "order_date",
      flex: 1,
    },
    {
      field: "payment_method",
      headerName: "payment_method",
      flex: 1,
    },
    {
      field: "product_price",
      headerName: "price",
      flex: 1,
      renderCell: (params) => (
        <Typography color={colors.greenAccent[500]}>
          {VND.format(params.row.product_price)}
        </Typography>
      ),
    },
  ];

  return (
    <Box m="2">
      <Box
        m="20px 0 0 0"
        height="45vh"
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
        <DataGrid rows={data} columns={columns} />
      </Box>
    </Box>
  );
};

export default DataTable;

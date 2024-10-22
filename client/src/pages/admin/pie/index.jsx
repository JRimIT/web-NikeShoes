import { Box } from "@mui/material";
import Header from "../../../components/AdminSide/Header";
import PieChart from "../../../components/AdminSide/PieChart";
import { useState } from "react";


const Pie = () => {
   const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());

  const changeNumtoMonth = (num) => {
    let title = ""
    switch (num) {
  case 1:
    title = `Featured products this January`;
    break;
  case 2:
    title = `Featured products this February`;
    break;
  case 3:
    title = `Featured products this March`;
    break;
  case 4:
    title = `Featured products this April`;
    break;
  case 5:
    title = `Featured products this May`;
    break;
  case 6:
    title = `Featured products this June`;
    break;
  case 7:
    title = `Featured products this July`;
    break;
  case 8:
    title = `Featured products this August`;
    break;
  case 9:
    title = `Featured products this September`;
    break;
  case 10:
    title = `Featured products this October`;
    break;
  case 11:
    title = `Featured products this November`;
    break;
  case 12:
    title = `Featured products this December`;
    break;
  default:
    title = `Featured products this month`; // Default case for invalid month
    break;
}
    return title
  }

  
  return (
    <Box m="20px">
      <Header title="Pie Chart" subtitle={changeNumtoMonth(month)}/>
      <Box height="75vh">
        <PieChart month={month} year = {year}/>
      </Box>
    </Box>
  );
};

export default Pie;
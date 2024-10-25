import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../../theme";
import { mockTransactions } from "../../../data/admin/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../../components/AdminSide/Header";
import StatBox from "../../../components/AdminSide/StatBox";

import ProgressCircle from "../../../components/AdminSide/ProgressCricle";
import BarChart from "../../../components/AdminSide/Barchart";
import PieChart from "../../../components/AdminSide/PieChart";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import { useSelector } from "react-redux";
import {
  getCountAllNewUser,
  getCountAllUsers,
  getCountSuccessTransactions,
  getRecentTransactions,
} from "../../../data/api/apiService";
import { useEffect, useState } from "react";

import loadingGif from "../../../assets/Double Ring@1x-1.0s-200px-200px.gif";
import { toast } from "react-toastify";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [numberUsers, setNumberUsers] = useState(0);
  const [numberNewUsers, setNumberNewUsers] = useState(0);
  const [numberOfTransactions, setNumberOfTransactions] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const VND = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  const revenue = useSelector((state) => state.revenue);

  useEffect(() => {
    setTimeout(() => {
      const fetchNumberOfUser = async () => {
        try {
          const res = await getCountAllUsers();
          console.log("Check res Dmin: ", res);

          if (!res?.message) {
            setNumberUsers(res);
          } else {
            toast.error({
              message: "unauthorized",
            });
          }
        } catch (error) {
          toast.error("Fail");
          console.log(error);
        } finally {
          setLoading(false); // Tắt trạng thái loading sau khi dữ liệu nạp xong
        }
      };
      fetchNumberOfUser();
    }, 3000);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      const fetchNumberOfNewUser = async () => {
        try {
          const res = await getCountAllNewUser();
          // console.log("New user: ", res.data[0].new_users_count);
          setNumberNewUsers(res.data[0].new_users_count);
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false); // Tắt trạng thái loading sau khi dữ liệu nạp xong
        }
      };
      fetchNumberOfNewUser();
    }, 3000);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      const fetchRecentTractions = async () => {
        try {
          const res = await getRecentTransactions();
          console.log("transactions: ", res);
          setTransactions(res.data);
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      };
      fetchRecentTractions();
    }, 3000);
  }, []);
  useEffect(() => {
    setTimeout(() => {
      const fetchCountSuccessTractions = async () => {
        try {
          const res = await getCountSuccessTransactions();
          console.log("Count transactions: ", res.data[0].total_transactions);
          setNumberOfTransactions(res.data[0].total_transactions);
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      };
      fetchCountSuccessTractions();
    }, 3000);
  });

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

        {/* <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box> */}
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        {/* <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="12,361"
            subtitle="Emails Sent"
            progress="0.75"
            increase="+14%"
            icon={
              <EmailIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box> */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {loading ? (
            <>
              <img src={loadingGif} alt="loading" />
              <Typography>Loading...</Typography>
            </>
          ) : (
            <StatBox
              title={
                revenue && revenue.length > 0 ? VND.format(revenue[0].total) : 0
              }
              subtitle="Sales Obtained"
              icon={
                <PointOfSaleIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
          )}
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {loading ? (
            <>
              <img src={loadingGif} alt="loading" />
              <Typography>Loading...</Typography>
            </>
          ) : (
            <StatBox
              title={numberUsers.data}
              subtitle="Clients"
              // progress="0.30"
              // increase="+5%"
              icon={
                <PersonAddIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
          )}
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {loading ? (
            <>
              <img src={loadingGif} alt="loading" />
              <Typography>Loading...</Typography>
            </>
          ) : (
            <StatBox
              title={numberOfTransactions}
              subtitle="All transaction"
              progress="0.80"
              increase="+43%"
              icon={
                <TrafficIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
          )}
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {loading ? (
            <>
              <img src={loadingGif} alt="loading" />
              <Typography>Loading...</Typography>
            </>
          ) : (
            <StatBox
              title={numberNewUsers}
              subtitle="New Clients"
              icon={
                <GroupAddIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
          )}
        </Box>

        {/* ROW 2 */}
        <Box
          gridColumn="span 8"
          gridRow="span 4"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Revenue Generated
              </Typography>
              {/* <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                $59,342.32
              </Typography> */}
            </Box>
          </Box>
          <Box height="580px" m="-20px 0 0 0">
            <BarChart isDashboard={true} />
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 4"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Recent Transactions
            </Typography>
          </Box>
          {loading ? (
            <>
              <img src={loadingGif} alt="loading" />
              <Typography>Loading...</Typography>
            </>
          ) : (
            transactions.map((transaction, i) => (
              <Box
                key={`${transaction.transaction_id}-${i}`}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                borderBottom={`4px solid ${colors.primary[500]}`}
                p="15px"
              >
                <Box>
                  <Typography
                    color={colors.greenAccent[500]}
                    variant="h5"
                    fontWeight="600"
                  >
                    {transaction.transaction_id}
                  </Typography>
                  <Typography color={colors.grey[100]}>
                    {transaction.username}
                  </Typography>
                </Box>
                <Box color={colors.grey[100]}>
                  {transaction.transaction_date}
                </Box>
                <Box
                  backgroundColor={colors.greenAccent[500]}
                  p="5px 10px"
                  borderRadius="4px"
                >
                  {VND.format(transaction.amount)}
                </Box>
              </Box>
            ))
          )}
        </Box>

        {/* ROW 3 */}
        {/* <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="30px"
        >
          <Typography variant="h5" fontWeight="600">
            Campaign
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="25px"
          >
            <PieChart isDashboard={true}></PieChart> */}
        {/* <ProgressCircle size="125" /> */}
        {/* <Typography
              variant="h5"
              color={colors.greenAccent[500]}
              sx={{ mt: "15px" }}
            >
              $48,352 revenue generated
            </Typography>
            <Typography>Includes extra misc expenditures and costs</Typography> */}
        {/* </Box>
        </Box> */}
        {/* <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            Sales Quantity
          </Typography>
          <Box height="250px" mt="-20px">
            <BarChart isDashboard={true} />
          </Box>
        </Box> */}
      </Box>
    </Box>
  );
};

export default Dashboard;

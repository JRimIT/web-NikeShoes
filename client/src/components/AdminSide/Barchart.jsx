import { useTheme } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import { tokens } from "../../theme";
// import { mockBarData as data } from "../../data/admin/mockData";
import { useEffect, useState } from "react";
import axios from "axios";

const BarChart = ({ isDashboard = false }) => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [data, setData] = useState([])
  const [revenue, setRevenue] = useState([])

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  
  const VND = new Intl.NumberFormat("vi-VN", {
    style: "decimal", // using decimal style instead of currency to omit VND symbol
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  useEffect(()=>{
    const fetchRevenue = async() => {
      try {
        const res = await axios.get(`http://localhost:5000/api/revenue-per-month?year=${year}`)
        
        console.log("Revenue" ,res.data);
        
        const dataInitial  = res.data.map((item) => ({
          month: item.month,
          total : item.total_amount
        }))
        // setRevenue(dataInitial)
        console.log(typeof dataInitial[0].total);
        
        setData(dataInitial)
        
      } catch (error) {
        console.log(error);
        
      }
    }
    fetchRevenue()
  }, [year])


  

  return (
    <ResponsiveBar
      data={data}
      theme={{
        // added
        axis: {
          domain: {
            line: {
              stroke: colors.grey[100],
            },
          },
          legend: {
            text: {
              fill: colors.grey[100],
            },
          },
          ticks: {
            line: {
              stroke: colors.grey[100],
              strokeWidth: 1,
            },
            text: {
              fill: colors.grey[100],
            },
          },
        },
        legends: {
          text: {
            fill: colors.grey[100],
          },
        },
      }}
      keys={["total"]}
      indexBy="month"
      margin={{ top: 50, right: 130, bottom: 50, left: 90 }}
      padding={0.3}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={{ scheme: "nivo" }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "#38bcb2",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "#eed312",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      borderColor={{
        from: "color",
        modifiers: [["darker", "1.6"]],
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "Month", // changed
        legendPosition: "middle",
        legendOffset: 32,
      }}
      axisLeft={{
        tickValues: 25,
        tickSize: 10,
        tickPadding: 6,
        tickRotation: 0,
        legend: isDashboard ? undefined : "Revenue ( VND )", // changed
        legendPosition: "middle",
        legendOffset: -80,
      }}
      enableLabel={false}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      legends={[
        {
          dataFrom: "keys",
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: "left-to-right",
          itemOpacity: 0.85,
          symbolSize: 20,
          effects: [
            {
              on: "hover",
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
      role="application"
      barAriaLabel={function (e) {
        return e.id + ": " + e.formattedValue + " in country: " + e.indexValue;
      }}
    />
  );
};

export default BarChart;

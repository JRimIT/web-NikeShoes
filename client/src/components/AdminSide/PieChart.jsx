import { ResponsivePie } from "@nivo/pie";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material";
// import { mockPieData as data } from "../../data/admin/mockData";
import { useEffect, useState } from "react";
import axios from "axios";

const PieChart = (props) => {
  // id: "hack",
  //   label: "hack",
  //   value: 239,
  const {month, year} = props
  // const [month, setMonth] = useState(new Date().getMonth());
  // const [year, setYear] = useState(new Date().getFullYear());
  const [popularProducts, setPopularProducts] = useState([]);

  useEffect(() => {
     const fetchPopularProduct = async() => {
    try {
      const res = await axios.get(`http://localhost:5000/api/most-popular-product?month=${month + 1}&year=${year}`);
      
      console.log(res.data);
      const data = res.data.map(product => ({
        id: product.name,
        label: product.name,
        value: product.total_orders
      }))
      console.log(data);
      
      setPopularProducts(data)

    } catch (error) {
      console.log("Api get popular product err: ", error);
      
    }
  }

    fetchPopularProduct()
  },[month, year])

 
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <ResponsivePie
        data={popularProducts}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    0.2
                ]
            ]
        }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#38bcb2"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    2
                ]
            ]
        }}
        defs={[
            {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                size: 4,
                padding: 1,
                stagger: true
            },
            {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                rotation: -45,
                lineWidth: 6,
                spacing: 10
            }
        ]}
        
        // legends={[
        //     {
        //         anchor: 'bottom',
        //         direction: 'row',
        //         justify: false,
        //         translateX: 0,
        //         translateY: 56,
        //         itemsSpacing: 0,
        //         itemWidth: 100,
        //         itemHeight: 18,
        //         itemTextColor: '#999',
        //         itemDirection: 'left-to-right',
        //         itemOpacity: 1,
        //         symbolSize: 18,
        //         symbolShape: 'circle',
        //         effects: [
        //             {
        //                 on: 'hover',
        //                 style: {
        //                     itemTextColor: '#121212'
        //                 }
        //             }
        //         ]
        //     }
        // ]}
    />


    // <ResponsivePie
    //   data={popularProducts}
    //   theme={{
    //     axis: {
    //       domain: {
    //         line: {
    //           stroke: colors.grey[100],
    //         },
    //       },
    //       legend: {
    //         text: {
    //           fill: colors.grey[100],
    //         },
    //       },
    //       ticks: {
    //         line: {
    //           stroke: colors.grey[100],
    //           strokeWidth: 1,
    //         },
    //         text: {
    //           fill: colors.grey[100],
    //         },
    //       },
    //     },
    //     legends: {
    //       text: {
    //         fill: colors.grey[100],
    //       },
    //     },
    //   }}
    //   margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
    //   innerRadius={0.5}
    //   padAngle={0.7}
    //   cornerRadius={3}
    //   activeOuterRadiusOffset={8}
    //   borderColor={{
    //     from: "color",
    //     modifiers: [["darker", 0.2]],
    //   }}
    //   arcLinkLabelsSkipAngle={10}
    //   arcLinkLabelsTextColor={colors.grey[100]}
    //   arcLinkLabelsThickness={2}
    //   arcLinkLabelsColor={{ from: "color" }}
    //   enableArcLabels={false}
    //   arcLabelsRadiusOffset={0.4}
    //   arcLabelsSkipAngle={7}
    //   arcLabelsTextColor={{
    //     from: "color",
    //     modifiers: [["darker", 2]],
    //   }}
    //   defs={[
    //     {
    //       id: "dots",
    //       type: "patternDots",
    //       background: "inherit",
    //       color: "rgba(255, 255, 255, 0.3)",
    //       size: 4,
    //       padding: 1,
    //       stagger: true,
    //     },
    //     {
    //       id: "lines",
    //       type: "patternLines",
    //       background: "inherit",
    //       color: "rgba(255, 255, 255, 0.3)",
    //       rotation: -45,
    //       lineWidth: 6,
    //       spacing: 10,
    //     },
    //   ]}
    //   legends={[
    //     {
    //       anchor: "left",
    //       direction: "column",
    //       justify: false,
    //       translateX: -70,
    //       translateY: 240,
    //       itemsSpacing: 50,
    //       itemWidth: 60,
    //       // itemMargin: 20,
    //       itemHeight: 18,
    //       itemTextColor: "#999",
    //       itemDirection: "left-to-right",
    //       itemOpacity: 1,
    //       symbolSize: 18,
    //       symbolShape: "circle",
    //       effects: [
    //         {
    //           on: "hover",
    //           style: {
    //             itemTextColor: "#000",
    //           },
    //         },
    //       ],
    //     },
    //   ]}
    // />
  );
};

export default PieChart;

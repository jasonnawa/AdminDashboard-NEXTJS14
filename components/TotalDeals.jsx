'use client'
import { Heading, Box , Text, Flex} from "@chakra-ui/react";
import { Image } from "@chakra-ui/next-js";
import profilePicture from "@/static/images/prequel.jpg";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
  } from "recharts";

  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];
  
const TotalDeals = ()=>{
    
    return(
        <Box display="flex" flexDir="row" justifyContent="space-between">
        <Box>
          <Heading fontSize={12} mb={2}>
            Total Deals
          </Heading>
          <Heading fontSize={18} mb={6}>
            800
          </Heading>
          <Text fontSize={13}>View all</Text>
        </Box>
        <Box textAlign="end">
          <LineChart width={100} height={50} data={data} mb={6}>
            <Line
              type="monotone"
              dataKey="pv"
              stroke="#8884d8"
              strokeWidth={2}
            />
          </LineChart>
          <Box>
            <Text fontSize={13} fontWeight="900" color="green">
              45%
            </Text>
            <Text fontSize={12}>This month</Text>
          </Box>
        </Box>
      </Box>
    )
}

export default TotalDeals;
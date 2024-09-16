"use client";
import {
  Box,
  Flex,
  Text,
  Grid,
  GridItem,
  Heading,
  flexbox,
  IconButton,
  Icon,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { Link } from "@chakra-ui/next-js";
import { useSession } from "next-auth/react";
import { Image } from "@chakra-ui/next-js";
import { useRouter } from "next/navigation";
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
import TopDeals from "@/components/TopDeals";
import TotalCompanies from "@/components/TotalCompanies";
import TotalContacts from "@/components/TotalContacts";
import TotalDeals from "@/components/TotalDeals";
import TotalRevenue from "@/components/TotalRevenue";

import profilePicture from "@/static/images/prequel.jpg";

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

const Dashboard = () => {
  const { data: session, status: sessionStatus } = useSession();
  const router = useRouter();


  return (
    sessionStatus == "authenticated" && (
      <Box as="section" p={5} mt={4}>
        <Grid
          h="500px"
          templateRows=" 2fr 2fr 1fr 2.5fr"
          templateColumns="repeat(4, 2fr)"
          gap={4}
        >
          <GridItem
            rowSpan={3}
            colSpan={1}
            p={3}
            borderWidth={1}
            borderRadius={5}
          >
            <Heading fontSize={25} mb={3}>
              Top Deals
            </Heading>

            <TopDeals />
          </GridItem>
          <GridItem
            rowSpan={1}
            colSpan={1}
            p={3}
            borderWidth={1}
            borderRadius={5}
          >
          <TotalCompanies/>
          </GridItem>
          <GridItem
            rowSpan={1}
            colSpan={1}
            p={3}
            borderWidth={1}
            borderRadius={5}
          >
            <TotalContacts/>
          </GridItem>
          <GridItem
            rowSpan={3}
            colSpan={1}
            p={3}
            borderWidth={1}
            borderRadius={5}
          >
            <Heading fontSize={25}>Leads By Sources</Heading>
          </GridItem>

          <GridItem
            rowSpan={1}
            colSpan={1}
            p={3}
            borderWidth={1}
            borderRadius={5}
          >
            <TotalDeals/>
          </GridItem>
          <GridItem
            rowSpan={1}
            colSpan={1}
            p={3}
            borderWidth={1}
            borderRadius={5}
          >
            <TotalRevenue />
          </GridItem>
          <GridItem
            rowSpan={2}
            colSpan={2}
            p={3}
            borderWidth={1}
            borderRadius={5}
          >
            <Heading fontSize={25}>Revenue Analysis</Heading>
          </GridItem>
          <GridItem
            rowSpan={1}
            colSpan={1}
            p={3}
            borderWidth={1}
            borderRadius={5}
          >
            <Heading fontSize={18}>Bar Chart</Heading>
          </GridItem>
          <GridItem
            rowSpan={1}
            colSpan={1}
            p={3}
            borderWidth={1}
            borderRadius={5}
          >
            <Heading fontSize={18}>Profit Earned</Heading>
          </GridItem>
        </Grid>
      </Box>
    )
  );
};

export default Dashboard;

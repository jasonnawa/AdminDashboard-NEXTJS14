
'use client'
import { Box, Flex, Text, Button } from "@chakra-ui/react";
import Link from "next/link";

const Home = ()=>{
  
    return  (
        <Flex align="center" justifyContent="center" h="100vh">
            <Box  h={200}>
                <Text fontSize={30}><strong> Home Page </strong></Text>
                <Link href="/login"><Button>Login</Button></Link>
            </Box>
        </Flex>
    )
}

export default Home
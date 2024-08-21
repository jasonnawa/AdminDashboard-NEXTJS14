
'use client'
import { Box, Flex, Text } from "@chakra-ui/react";

const Home = ()=>{
  
    return  (
        <Flex align="center" justifyContent="center" h="100vh">
            <Box  h={200}>
                <Text fontSize={30}><strong> Home Page </strong></Text>
            </Box>
        </Flex>
    )
}

export default Home
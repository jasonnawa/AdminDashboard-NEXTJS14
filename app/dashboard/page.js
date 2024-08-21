
'use client'
import { Box, Flex, Text } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Dashboard = ()=>{
    const { data : session, status: sessionStatus} = useSession()
    const router = useRouter()

    if(sessionStatus !== "authenticated"){
        router.push("/login")
    }
  
    return  sessionStatus == "authenticated" && (
        <Flex align="center" justifyContent="center" h="100vh">
            <Box  color="green" h={200}>
                <Text fontSize={30}><strong>{session.user.name} successfully logged in</strong></Text>
            </Box>
        </Flex>
    )
}

export default Dashboard
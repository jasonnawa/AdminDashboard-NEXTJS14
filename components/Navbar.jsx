'use client'
import { Box, Button } from "@chakra-ui/react"
import { List, ListItem } from "@chakra-ui/react"
import Link from "next/link"
import { useSession } from "next-auth/react"
import { signOut } from "next-auth/react"

const Navbar = ()=>{
    const {data : session, status: sessionStatus } = useSession()

    const handleLogout = ()=>{
        signOut({callbackUrl: "http://localhost:3000/"})
        return  toast({
            title: "user signed out.",
            status: 'info',
            position: 'top-right',
            duration: 2500,
            isClosable: true,
          })
    }
    return(
       <Box as="nav" position="sticky" bg="black" maxW={150} flexDir="column" >
        <Box mx="auto">
            <List display="flex" p={4} justifyContent="space-between" height="100vh" flexDir="column">
               <Box>
                    <ListItem mx={4} mt={5}>
                        <Link href="/"><strong>home</strong></Link>
                    </ListItem>

                    <ListItem mx={4} mt={5}>
                        <Link href="/dashboard"><strong>Dashboard</strong></Link>
                    </ListItem>
               </Box>

              

{sessionStatus == "authenticated" ? (
    <>
    <Box>
        <h5>{session.user.name}</h5>
       
        <Button bg="red" mt={5} onClick={handleLogout}>Logout</Button>
    </Box>
   
    </>
 ): (
   <Box>
   <ListItem mx={4} mt={5}>
       <Link href="/login"><strong>Login</strong></Link>
   </ListItem>

   <ListItem mx={4} mt={5}>
       <Link href="/register"><strong>Register</strong></Link>
   </ListItem>
          </Box>
 )}
                 
              
              
            </List>
        </Box>
       </Box>
    )
}

export default Navbar;
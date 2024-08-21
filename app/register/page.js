'use client'
import Link from "next/link"
import bycrypt from "bcryptjs"
import { Box, Button, Flex, Heading, HStack, Input } from "@chakra-ui/react"
import { useToast } from "@chakra-ui/react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { useEffect } from "react"


const Register = ()=>{
    const router = useRouter()
    const {data : session, status: sessionStatus} = useSession()

    useEffect(()=>{
        if(sessionStatus == "authenticated"){
            router.push('/dashboard')
        }
    },[sessionStatus, router])

  
 
    const handleSubmit = async (e)=>{
        e.preventDefault();
        console.log("submitted")
        const username = e.target[0].value
        const password = e.target[1].value
        const confirmPassword = e.target[2].value

        if(!username || !password || !confirmPassword){
            return (
                toast({
                    title: "Please fill all required fields.",
                    status: 'error',
                    position: 'top-right',
                    duration: 1500,
                    isClosable: true,
                  })
            )
        }

        const isPasswordSame = (password === confirmPassword)

        if (isPasswordSame){
            
        try {
            const res = await fetch ("/api/register", {
                method: "POST", 
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({username, password, confirmPassword})
            })

            if(res.status == "201"){
                toast({
                    title: "User successfully created",
                    status: 'success',
                    position: 'top-right',
                    duration: 2500,
                    isClosable: true,
                  })
                  router.push("/login")
            }else if(res.status == "400"){
                toast({
                    title: "User already exists",
                    status: 'warning',
                    position: 'top-right',
                    duration: 1500,
                    isClosable: true,
                  })
            }



        } catch (error) {
            throw new Error(error);
        
        }

        }else{
            return (
                toast({
                    title: "Passwords are not the same.",
                    status: 'error',
                    position: 'top-right',
                    duration: 1500,
                    isClosable: true,
                  })
            )
        }


       
       
    }

    const toast = useToast()


    return sessionStatus !== "authenticated" && (
        <Flex height="100vh" bg="grey" justifyContent="center" align="center">
            <Box bg="white" p={8} color="black">
                <Heading fontSize={30}>Register</Heading>

                <Box mt={5}>
                <form onSubmit={handleSubmit}>
                   
                    <HStack as="div" flexDir="column" >
                    
                    <Input  placeholder="username" type="text" name="username"/>
                    <Input  placeholder="password" type="password" name="password" />
                    <Input  placeholder="confirm password" type="password" name="confirmPassword" />
                    </HStack>
                    
                    <Box mt={4} mb={2} width="100%">
                        <Button  type="submit" py={5} px={3} bg="black" color="white" width="100%">Submit</Button>
                    </Box>

                    <span>
                       <small> Already have an account?</small>
                       <Link href="/login">
                       <small> <u>Login</u></small>
                       </Link>
                    </span>
                
                </form>

                </Box>

                
                
            </Box>
        </Flex>
    )
}

export default Register
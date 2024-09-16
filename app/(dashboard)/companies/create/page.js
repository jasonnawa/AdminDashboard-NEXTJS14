"use client";

import {
  Heading,
  Flex,
  Box,
  HStack,
  Button,
  Input,
  Select,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const CreateCompany = () => {
  const toast = useToast()
  const router = useRouter()

  const [name, setName] = useState("")

  const handleSubmit = async (e)=>{
    e.preventDefault()
    try {
      const response = await fetch("/api/company", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({name})
    })
    const result = await response.json()
    console.log(result)
    if(response.status === 200){
      
      return (toast({
        title: "Company successsfully created.",
        status: "success",
        position: "top-right",
        duration: 2500,
        isClosable: true,
      }) && router.push(`/companies/${result.company._id}`));
    }else{
      return toast({
        title: "Error creating company",
        status: "error",
        position: "top-right",
        duration: 2500,
        isClosable: true,
      });
    }

    } catch (error) {
      alert(error)
    }
  }
  return (
    <Flex height="100vh" justifyContent="center" align="center">
      <Box p={8}>
        <Heading fontSize={30}>Create Company</Heading>

        <Box mt={5}>
          <form onSubmit={handleSubmit}>
            <HStack as="div" flexDir="column">
              <Input placeholder="name" type="text" name="name" onChange={(e)=>setName(e.target.value)}/>

            </HStack>

            <Box mt={4} mb={2} width="100%">
              <Button type="submit" py={5} px={3} width="100%">
                Create
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </Flex>
  );
};
export default CreateCompany;

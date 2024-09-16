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
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const CreateContact = () => {

  const toast = useToast()
  const router = useRouter()

  const [companies, setCompanies] = useState("")

  //states for form
  const [name, setName] = useState("")
  const [number, setNumber] = useState("")
  const [company, setCompany] = useState("")

  useEffect(()=>{
    async function fetchCompanies() {

      try {
        const response = await fetch("/api/company")
      const result = await response.json()
      console.log(result)
      setCompanies(result.companies)

    }catch(error){
      alert(error)
    }
  }

  fetchCompanies()
  }, [])
  


  const handleSubmit = async (e)=>{
    e.preventDefault()
    console.log("submitted")
    console.log(name, number, company)
    try {
      if(!name || !number || !company){
        return toast({
          title: "Fill all fields.",
          status: "warning",
          position: "top-right",
          duration: 2500,
          isClosable: true,
        })
      }

      const response = await fetch("/api/contact",{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
      },
        body: JSON.stringify({
          name,
          number,
          company
        })
      })
      const result = await response.json()
      if(response.status === 200){
        return (toast({
          title: "contact successsfully created.",
          status: "success",
          position: "top-right",
          duration: 2500,
          isClosable: true,
        }))// && router.push(`/companies/${result.company._id}`));
      }else if(response.status === 400){
        return toast({
          title: result.message,
          status: "warning",
          position: "top-right",
          duration: 2500,
          isClosable: true,
        });
      }else{
        return toast({
          title: "Error creating contact",
          status: "error",
          position: "top-right",
          duration: 2500,
          isClosable: true,
        });
      }



    } catch (error) {
      alert (error)
    }

  }


  return companies && (
    <Flex height="100vh" justifyContent = "center" align="center">
      <Box p={8}>
        <Heading fontSize={30}>Create Contact</Heading>

        <Box mt={5}>
          <form onSubmit={(e)=>handleSubmit(e)}>
            <HStack as="div" flexDir="column">
             
              <Input placeholder="name"  variant="filled" type="text" onChange={(e)=>setName(e.target.value)} />
              <Input placeholder="phone number" variant="filled" type="text" onChange={(e)=>setNumber(e.target.value)} />
              <Select placeholder="Select Company" variant="filled" onChange={(e)=>setCompany(e.target.value)}>
                {companies.map((company)=>(
                   <option key={company._id} value={company._id}>{company.name}</option>
                ))}
               
               
              </Select>
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
export default CreateContact;

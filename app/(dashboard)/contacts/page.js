"use client";
import {
  Box,
  Flex,
  Text,
  Button,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputLeftAddon
} from "@chakra-ui/react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  useToast,
} from "@chakra-ui/react";
import { Image } from "@chakra-ui/next-js";
import image from "@/static/images/prequel.jpg";
import { DeleteIcon, DragHandleIcon, HamburgerIcon, AddIcon, Search2Icon,ChevronLeftIcon,
  ChevronRightIcon } from "@chakra-ui/icons";
import Link from "next/link";
import { useSearchParams, usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";





const Contacts = () => {

  const toast = useToast()
  const searchParams = useSearchParams();
    const pathname = usePathname();
  
    const params = new URLSearchParams(searchParams);
  
  const [contacts, setContacts] = useState(null)
  const [searchValue, setSearchValue] = useState(null)
  const [page, setPage] = useState(1)
  const [totalContacts, setTotalContacts] = useState(null)
  const router = useRouter()

  const handleSearch = (e) => {
    if (e.target.value){
      setSearchValue(e.target.value)
      router.replace(`${pathname}?page=${page}&q=${e.target.value}`);
    }else{
      router.replace(`${pathname}`);
      setSearchValue(null)
    }
  };

  async function fetchData(){
    try {
      if(searchValue){
        const response = await fetch(`/api/contact?page=${page}&q=${searchValue}`)
        const result = await response.json()
      setContacts(result.contacts)
      setTotalContacts(result.totalContacts)
      console.log("totalcontacts1", result.totalContacts)
      }else{
        const response = await fetch(`/api/contact?page=${page}`)
        const result = await response.json()
      setContacts(result.contacts)
      setTotalContacts(result.totalContacts)
      console.log("totalcontacts2", result.totalContacts, result.companies)
      }
      
    } catch (error) {
      console.log("Error", error)
    }
  
  }
  useEffect(()=>{

    fetchData()
  }, [searchValue, page])

  async function deleteContact(id) {
    const response = await fetch(`/api/contact/${id}`,{
      method : "DELETE",
    })
      if (response.status === 200){
        fetchData()
        return toast({
          title: "Company successsfully deleted.",
          status: "success",
          position: "top-right",
          duration: 2500,
          isClosable: true,
        });
    }else{
      return toast({
        title: "error deleting contact.",
        status: "error",
        position: "top-right",
        duration: 2500,
        isClosable: true,
      });
      
    }
      
  }

  const nextPage = (e)=>{
    setPage(page+1)
  }

  const previousPage = (e)=>{
    setPage(page-1)
    console.log(totalContacts)
  }


  const editDate= (x)=>{
    const value = new Date(x).toLocaleDateString('en-GB')
    return value
  }




  return contacts && (
    <Box as="section" p={5}>
        <Flex justifyContent="space-between" px={35}>
      <Heading pb={3}>Contacts</Heading>

        <Box>
      <InputGroup>
        <InputLeftAddon><Search2Icon/></InputLeftAddon>
        <Input type="search" onChange={handleSearch} variant="filled" placeholder="search for contact"/>
        </InputGroup>
        </Box>

      <Box>
        <Link href="/contacts/create"><Button bg="brand.darkPrimary"><AddIcon/> &nbsp; Create new</Button></Link>
      </Box>
      </Flex>
      <hr />
      <TableContainer mt={35}>
        <Table>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Company</Th>
              <Th>Number</Th>
              <Th>Date</Th>
              <Th>Options</Th>
            </Tr>
          </Thead>
          <Tbody>
          {contacts &&
            contacts.map((contact) => (
            <Tr key={contact._id}>
              <Td display="flex" alignItems="center">
                {" "}
                <Image w={10} h={10} src={image} alt="xksjne" borderRadius="5" /> &nbsp;
                &nbsp; <strong> {contact.name}</strong>
              </Td>

              {/**Displays Company Name */}
              <Td> {contact.company?.name}</Td>


              <Td> {contact.number} </Td>
              <Td> {editDate(contact.createdAt)} </Td>
              <Td>
                {" "}
                <Link href={`/contacts/${contact._id}`}>
                <IconButton
                  variant="outline"
                  color="teal"
                  icon={<HamburgerIcon />}
                />
                </Link>
                {" "}
                
                <IconButton
                  variant="outline"
                  color="red"
                  onClick={()=>deleteContact(contact._id)}
                  icon={<DeleteIcon />}
                />
              </Td>
            </Tr>
          ))}
          </Tbody>
        </Table>
        <Flex justify="space-around" pt={5}>
      <Box><IconButton onClick = {previousPage} isDisabled = {page === 1} bg="gray" icon={<ChevronLeftIcon/>} /></Box>

      <Box><Button isDisabled = {true} bg="gray"> page {page} </Button></Box>

      <Box><IconButton onClick = {nextPage} isDisabled = {page >= totalContacts} bg="gray" icon={<ChevronRightIcon/>} /></Box>
      </Flex>
      </TableContainer>
    </Box>
  );
};

export default Contacts;

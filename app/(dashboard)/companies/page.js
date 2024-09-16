"use client"
import { useEffect, useState } from "react";
import { Box, Flex, Text, Button, Heading, IconButton, Icon, InputGroup, InputLeftAddon, Input } from "@chakra-ui/react";
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
  useToast
} from "@chakra-ui/react";
import { Image } from "@chakra-ui/next-js";
import image from "@/static/images/prequel.jpg";
import {
  DeleteIcon,
  DragHandleIcon,
  HamburgerIcon,
  AddIcon,
  Search2Icon,
  ChevronLeftIcon,
  ChevronRightIcon
} from "@chakra-ui/icons";
import Link from "next/link";
import { useSearchParams, usePathname } from "next/navigation";
import { useRouter } from "next/navigation";


const Companies = () => {
  const toast = useToast()
  const searchParams = useSearchParams();
    const pathname = usePathname();
  
    const params = new URLSearchParams(searchParams);
  
  const [companies, setCompanies] = useState(null)
  const [contacts, setContacts] = useState(null)
  const [deals, setDeals] = useState(null)
  const [searchValue, setSearchValue] = useState(null)
  const [page, setPage] = useState(1)
  const [totalCompanies, setTotalCompanies] = useState(null)
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
        const response = await fetch(`/api/company?page=${page}&q=${searchValue}`)
        const result = await response.json()
      setCompanies(result.companies)
      setTotalCompanies(result.totalCompanies)
      setContacts(result.contacts)
      setDeals(result.deals)
      console.log("totalcompanies1", result.totalCompanies)
      }else{
        const response = await fetch(`/api/company?page=${page}`)
        const result = await response.json()
      setCompanies(result.companies)
      setTotalCompanies(result.totalCompanies)
      setContacts(result.contacts)
      setDeals(result.deals)
      console.log("totalcompanies2", result.totalCompanies)
      }
      
    } catch (error) {
      console.log("Error", error)
    }
  
  }
  useEffect(()=>{

    fetchData()
  }, [searchValue, page])

  async function deleteCompany(id) {
    const response = await fetch(`/api/company/${id}`,{
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
        title: "error deleting company.",
        status: "error",
        position: "top-right",
        duration: 2500,
        isClosable: true,
      });
        return;
    }
      
  }

  const nextPage = (e)=>{
    setPage(page+1)
  }

  const previousPage = (e)=>{
    setPage(page-1)
    console.log(totalCompanies)
  }


  return (
    <Box as="section" p={5}>
    <Flex justifyContent="space-between" px={35}>
      <Heading pb={3}>Companies</Heading>

      <Box>
        <InputGroup>
          <InputLeftAddon>
            <Search2Icon />
          </InputLeftAddon>
          <Input type="search" variant="filled" onChange={handleSearch} placeholder="search for a company" />
        </InputGroup>
      </Box>

      <Box>
        <Link href="/companies/create">
          <Button bg="brand.darkPrimary">
            <AddIcon /> &nbsp; Create new
          </Button>
        </Link>
      </Box>
    </Flex>
    <hr />
    <TableContainer mt={35}>
      <Table>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Total Contacts</Th>
            <Th>Total Deals</Th>
            <Th>Total Revenue</Th>
            <Th>Options</Th>
          </Tr>
        </Thead>
        <Tbody>
          {companies &&
            companies.map((company) => (
              <Tr key={company._id}>
                <Td display="flex" alignItems="center">
                  {" "}
                  <Image
                    w={10}
                    h={10}
                    alt="ekjlxk"
                    src={image}
                    borderRadius="5"
                  />{" "}
                  &nbsp; &nbsp; <strong> {company.name}</strong>
                </Td>
                <Td>{contacts && (contacts.filter((contact)=>contact.company===company._id).length)}</Td>
                <Td>{deals && (deals.filter((deal)=>deal.company===company._id).length)}</Td>
                <Td>$ {deals && (deals.map((deal)=>(deal.company===company._id && deal.amount))).reduce((acc, curr)=> acc + curr)}</Td>
                <Td>
                  {" "}
                  <Link href={`/companies/${company._id}`}>
                    <IconButton
                      variant="outline"
                      color="teal"
                      icon={<HamburgerIcon />}
                    />
                  </Link>{" "}
                  <IconButton
                    variant="outline"
                    color="red"
                    icon={<DeleteIcon />}
                    onClick={()=>{deleteCompany(company._id)}}
                  />
                </Td>
              </Tr>
            ))}
        </Tbody>
    
      </Table>

      <Flex justify="space-around" pt={5}>
      <Box><IconButton onClick = {previousPage} isDisabled = {page === 1} bg="gray" icon={<ChevronLeftIcon/>} /></Box>

      <Box><Button isDisabled = {true} bg="gray"> page {page} </Button></Box>

      <Box><IconButton onClick = {nextPage} isDisabled = {page >= totalCompanies} bg="gray" icon={<ChevronRightIcon/>} /></Box>
      </Flex>
    </TableContainer>
  </Box>
  );
};

export default Companies;

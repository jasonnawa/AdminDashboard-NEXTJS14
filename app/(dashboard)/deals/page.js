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
  ChevronRightIcon} from "@chakra-ui/icons";
import Link from "next/link";
import { useSearchParams, usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";


const Deals = ()=>{
  
  const toast = useToast()
  const searchParams = useSearchParams();
    const pathname = usePathname();
    const [page, setPage] = useState(1)
    const [deals, setDeals] = useState(null)
    const [totalDeals, setTotalDeals] = useState(null)
    const [searchValue, setSearchValue] = useState(null)
  
    const params = new URLSearchParams(searchParams);
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
          const response = await fetch(`/api/deal?page=${page}&q=${searchValue}`)
          const result = await response.json()
        setDeals(result.deals)
        setTotalDeals(result.totalDeals)
        console.log("totaldeals1", result.totalDeals)
        console.log("data", result)

        if(response.status === 404){
          return toast({
            title: result.message,
            status: "error",
            position: "top-right",
            duration: 2500,
            isClosable: true,
          });
        }
        
        }else{
          const response = await fetch(`/api/deal?page=${page}`)
          const result = await response.json()
          setDeals(result.deals)
        setTotalDeals(result.totalDeals)
        console.log("totaldeals2", result.totalDeals)
        console.log("data", result)
        }

      
        
      } catch (error) {
        console.log("Error", error)
      }

    
    }
    useEffect(()=>{
  
      fetchData()
    }, [searchValue, page])


    
  const nextPage = (e)=>{
    setPage(page+1)
  }

  const previousPage = (e)=>{
    setPage(page-1)
  }

  async function deleteDeal(id) {
    const response = await fetch(`/api/deal/${id}`,{
      method : "DELETE",
    })
      if (response.status === 200){
        fetchData()
        return toast({
          title: "Deal successsfully deleted.",
          status: "success",
          position: "top-right",
          duration: 2500,
          isClosable: true,
        });
    }else{
      return toast({
        title: "error deleting deal.",
        status: "error",
        position: "top-right",
        duration: 2500,
        isClosable: true,
      });
      
    }
      
  }
  const editDate= (x)=>{
    const value = new Date(x).toLocaleDateString('en-GB')
    return value
  }

    return  (
        <Box as="section" p={5}>
        <Flex justifyContent="space-between" px={35}>
      <Heading pb={3}>Deals</Heading>

        <Box>
      <InputGroup>
        <InputLeftAddon><Search2Icon/></InputLeftAddon>
        <Input type="search"  onChange={handleSearch} variant="filled" placeholder="search for deals"/>
        </InputGroup>
        </Box>

      <Box>
        <Link href="/deals/create"><Button bg="brand.darkPrimary"><AddIcon/> &nbsp; Create new</Button></Link>
      </Box>
      </Flex>
      <hr />
      <TableContainer mt={35}>
        <Table>
          <Thead>
            <Tr>
              <Th>Company</Th>
              <Th>Contact</Th>
              <Th>Amount</Th>
              <Th>Date</Th>
              <Th>Options</Th>
            </Tr>
          </Thead>
          <Tbody>
          {deals &&
            deals.map((deal) => (
            <Tr key={deal._id}>
              <Td display="flex" alignItems="center">
                {" "}
                <Image w={10} h={10} src={image} alt="companyimge" borderRadius="5" /> &nbsp;
                &nbsp; <strong> {deal.company?.name}</strong>
              </Td>
              <Td> {deal.contact?.name}</Td>
              <Td> ${deal.amount} </Td>
              <Td> {editDate(deal.date)} </Td>
              <Td>
                {" "}
                <Link href={`/deals/${deal._id}`}>
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
                  onClick ={()=>deleteDeal(deal._id)}
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

      <Box><IconButton onClick = {nextPage} isDisabled = {page >= totalDeals} bg="gray" icon={<ChevronRightIcon/>} /></Box>
      </Flex>

      </TableContainer>
    </Box>
    )
}

export default Deals


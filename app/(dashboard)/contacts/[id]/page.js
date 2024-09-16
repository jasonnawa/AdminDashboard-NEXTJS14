"use client";

import { Image } from "@chakra-ui/next-js";
import {
  Heading,
  Flex,
  Box,
  VStack,
  HStack,
  Button,
  Input,
  Select,
  Container,
  Text,
  Editable,
  EditableInput,
  IconButton,
  ButtonGroup,
  EditablePreview,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useEditableControls } from "@chakra-ui/react";
import { EditIcon, CheckIcon, CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import profilePicture from "@/static/images/prequel.jpg";
import { Link } from "@chakra-ui/next-js";
import mongoose from "mongoose";

const ViewContact = ({ params }) => {
  const router = useRouter();

  const { id } = params;
  const [contact, setContact] = useState(null);
  const [deals, setDeals] = useState(null)
  const [allCompanies, setAllCompaines] = useState(null);
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [newCompany, setNewCompany] = useState("");
  const toast = useToast();

  useEffect(() => {
    async function fetchCompany() {
      const response = await fetch(`/api/contact/${id}`);
      const result = await response.json();
      console.log(result);
      setContact(result.contact);
      setDeals(result.deal)
      setAllCompaines(result.allCompanies);
    }

    fetchCompany();
  }, []);

  const handleSubmit = async () => {
    const updates = {}
    if (name) {updates.name = name}
    if(number){updates.number = number}
    if(newCompany){ updates.company = newCompany}

    try {
      console.log("updates", updates)
      const response = await fetch(`/api/contact/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
         updates
        }),
      });

      if(response.status === 200){
        return ( toast({
          title: "Contact successsfully updated.",
          status: "success",
          position: "top-center",
          duration: 2500,
          isClosable: true,
        }) && clearForm());
      }else{
        return toast({
          title: "Error updating Contact.",
          status: "warning",
          position: "top-center",
          duration: 2500,
          isClosable: true,
        });
      }
    } catch (error) {
      alert(error);
    }
  };

  const clearForm = ()=>{
    setName("");
    setNumber("");
    setNewCompany("");
  }

  async function deleteContact() {
    const response = await fetch(`/api/contact/${id}`, {
      method: "DELETE",
    });
    if (response.status === 200) {
      router.replace("/contacts");
      return toast({
        title: "contact successsfully deleted.",
        status: "success",
        position: "top-right",
        duration: 2500,
        isClosable: true,
      });
    } else {
      return toast({
        title: "error deleting contact.",
        status: "error",
        position: "top-right",
        duration: 2500,
        isClosable: true,
      });
      return;
    }
  }
  const editDate= (x)=>{
    const value = new Date(x).toLocaleDateString('en-GB')
    return value
  }

  return (
    contact && (
      <Container maxWidth={1200} m={10}>
        <Flex justify="right">
          <Button bg="brand.lightPrimary" onClick={handleSubmit}
          isDisabled = {name || number || newCompany? false : true}
          >
            {" "}
            Save Edit
          </Button>
          <Button variant="ghost" color="red" onClick={()=>{deleteContact()}}>
            Delete
          </Button>
        </Flex>
        <Flex mt={15}>
          <Box maxW={250} mr={20}>
            <Image
              borderRadius={20}
              src={profilePicture}
              height="100%"
              width="100%"
              alt="profilepicture"
            />
          </Box>

          <Flex as="form" width="100%" p={3}>
            <Flex flexDir="column" width="100%" justifyContent="space-around">
              <Box>
                <Text>Username : </Text>
                <Input
                variant="filled"
                  defaultValue={contact.name}
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                />
              </Box>

              <Box>
                <Text>Phone : </Text>
                <Input
                variant="filled"
                  defaultValue={contact.number}
                  type="text"
                  onChange={(e) => setNumber(e.target.value)}
                />
              </Box>
              <Box>
                <Text>Company : </Text>
                <Select
                variant="filled"
                  placeholder={contact.company?.name}
                  size="lg"
                  onChange={(e) => setNewCompany(e.target.value)}
                >
                  {allCompanies &&
                    allCompanies.map((company) => (
                      <option key={company._id} value={company._id}>
                        {company.name}
                      </option>
                    ))}
                </Select>
              </Box>
            </Flex>
          </Flex>

        </Flex>

        <Flex flexDir="column" p={5}  borderWidth={3}
        mt={10}
            borderRadius={5}>
                <Heading  pb={2}>Top Deals</Heading>
                
                {deals && deals.map(deal=>(
                   <Flex key={deal._id} width="100%" justifyContent="space-between" p={2} mt={2} borderTopWidth={3}>
                   <Box>
                   <Text><b>{contact.name}</b></Text>
                   <Text>{contact.company?.name}</Text>
                   </Box>
                   
 
                   <Box alignContent="center">
                    $ {deal.amount}
                   </Box>

                   <Box alignContent="center">
                     {editDate(deal.date)}
                   </Box>
 
                   <Box>
                   <Link href={`/deals/${deal._id}`}>
                     <IconButton
                       variant="outline"
                       color="teal"
                       icon={<HamburgerIcon />}
                     />
                     </Link>
                   </Box>
                   
                 </Flex>
                
                ))}
               
            
                </Flex>
      </Container>
    )
  );
};
export default ViewContact;

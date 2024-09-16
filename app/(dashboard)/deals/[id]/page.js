"use client";

import { Image } from "@chakra-ui/next-js";
import {
  Heading,
  Flex,
  Box,
  VStack,
  Button,
  Input,
  Select,
  Container,
  Text,
  useToast
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {  useRouter } from "next/navigation";
import { useEditableControls } from "@chakra-ui/react";
import { EditIcon, CheckIcon, CloseIcon } from "@chakra-ui/icons";
import profilePicture from "@/static/images/prequel.jpg";
import mongoose from "mongoose";

const ViewDeal = ({ params }) => {
  const router = useRouter();

  const { id } = params;
  const [deal, setDeal] = useState(null)
  const [allContacts, setAllContacts] = useState(null)
  const [amount, setAmount] = useState("");
  const [newContact, setNewContact] = useState("");
  const [newCompany, setNewCompany] = useState("");
  const toast = useToast();

  

  useEffect(() => {
    async function fetchDeal() {
      const response = await fetch(`/api/deal/${id}`);
      const result = await response.json();
      setDeal(result.deal);
      setAllContacts(result.allContacts)  
    }
    fetchDeal();
  }, []);

  const handleSubmit = async () => {
    const updates = {}

    if(newContact){
      const parsed = await JSON.parse(newContact)
      updates.company = parsed.companyId
      updates.contact = parsed.contactId
    }
    if(amount){ updates.amount = amount}


    console.log("updates", updates)
    try {
      console.log("updates", updates)
      const response = await fetch(`/api/deal/${id}`, {
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
          title: "Deal successsfully updated.",
          status: "success",
          position: "top-center",
          duration: 2500,
          isClosable: true,
        }) && router.replace("/deals"));
      }else{
        return toast({
          title: "Error updating Deal.",
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


    return deal && (
     <Container  maxWidth={1200} m={10}>
      <Flex justify="right">
      <Button onClick={handleSubmit} bg="brand.lightPrimary"> Save Edit</Button>
      <Button variant="ghost" color="red">Delete</Button>
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
                <Text>Contact : </Text>
                <Select
                  placeholder={deal.contact?.name}
                  size="lg"
                  onChange={(e) => (setNewContact(e.target.value), setNewCompany("x") )}
                >
                  {allContacts &&
                    allContacts.map((contact) => (
                      <option key={contact._id} value={JSON.stringify({contactId: contact._id ,companyId: contact.company._id})}>
                        {`${contact.name} (${contact.company?.name})`}
                      </option>
                    ))}
                </Select>
              </Box>

              <Box>
                <Text>amount : </Text>
                <Input
                  defaultValue={deal.amount}
                  type="number"
                  onChange={(e) => setAmount(e.target.value)}
                />
              </Box>
            </Flex>
          </Flex>
        </Flex>
  
     </Container>
    );
  };
  export default ViewDeal;
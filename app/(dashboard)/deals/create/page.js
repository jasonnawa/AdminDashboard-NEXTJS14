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
import { set } from "mongoose";

const CreateDeal = () => {
  const toast = useToast();
  const router = useRouter();

  const [contacts, setContacts] = useState("");

  //states for form
  const [contact, setContact] = useState("");
  const [amount, setAmount] = useState("");
  //const [date, setDate] = useState("")

  useEffect(() => {
    async function fetchContacts() {
      try {
        const response = await fetch("/api/contact");
        const result = await response.json();
        console.log(result);
        setContacts(result.contacts);
      } catch (error) {
        alert(error);
      }
    }

    fetchContacts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submitted");

    console.log(contact, amount);
    try {
      if (!contact || !amount) {
        return toast({
          title: "Fill all fields.",
          status: "warning",
          position: "top-right",
          duration: 2500,
          isClosable: true,
        });
      }

      const response = await fetch("/api/deal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contact,
          amount,
        }),
      });
      const result = await response.json();
      if (response.status === 200) {
        return (
          toast({
            title: "deal successsfully created.",
            status: "success",
            position: "top-right",
            duration: 2500,
            isClosable: true,
          })
        );
      } else if (response.status === 400) {
        return toast({
          title: result.message,
          status: "warning",
          position: "top-right",
          duration: 2500,
          isClosable: true,
        });
      } else {
        return toast({
          title: "Error creating deal",
          status: "error",
          position: "top-right",
          duration: 2500,
          isClosable: true,
        });
      }
    } catch (error) {
      alert(error);
    }

   
  };

  return (
    contacts && (
      <Flex height="100vh" justifyContent="center" align="center">
        <Box p={8}>
          <Heading fontSize={30}>Create Deal</Heading>

          <Box mt={5}>
            <form onSubmit={(e) => handleSubmit(e)}>
              <HStack as="div" flexDir="column">
                <Select
                  placeholder="Select Contact"
                  size="lg"
                  onChange={(e) => setContact(e.target.value)}
                >
                  {contacts.map((contact) => (
                    <option key={contact._id} value={contact._id}>
                      {contact.name}
                    </option>
                  ))}
                </Select>
                <Input
                  placeholder="set amount"
                  type="number"
                  name="amount"
                  onChange={(e) => setAmount(e.target.value)}
                />
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
    )
  );
};
export default CreateDeal;

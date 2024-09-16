"use client";

import { Image } from "@chakra-ui/next-js";
import {
  Heading,
  Flex,
  Box,
  HStack,
  Button,
  Input,
  Link,
  Select,
  Container,
  Text,
  Editable,
  EditableInput,
  IconButton,
  ButtonGroup,
  EditablePreview,
} from "@chakra-ui/react";
import { Grid, GridItem } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import profilePicture from "@/static/images/prequel.jpg";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useEditableControls } from "@chakra-ui/react";
import { EditIcon, CheckIcon, CloseIcon, HamburgerIcon } from "@chakra-ui/icons";

const ViewCompany = ({ params }) => {
  const router = useRouter();

  const { id } = params;
  const [company, setCompany] = useState(null);
  const [newCompanyName, setNewCompanyName] = useState(null);
  const [deals, setDeals] = useState(null)
  const [contacts, setContacts] = useState(null)
  const toast = useToast();

  useEffect(() => {
    async function fetchCompany() {
      const response = await fetch(`/api/company/${id}`);
      const result = await response.json();
      console.log(result);
      setCompany(result.company);
      setDeals(result.deals)
      setContacts(result.contacts)
    }

    fetchCompany();
  }, []);

  async function deleteCompany() {
    console.log("clicked");
    const response = await fetch(`/api/company/${id}`, {
      method: "DELETE",
    });
    if (response.status === 200) {
      router.replace("/companies");
      return toast({
        title: "Company successsfully deleted.",
        status: "success",
        position: "top-right",
        duration: 2500,
        isClosable: true,
      });
    } else {
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

  // edit company
  const handleSubmit = async () => {
    console.log(newCompanyName);
    try {
      const response = await fetch(`/api/company/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: newCompanyName }),
      });

      //const result = await response.json()
      //console.log(result)

      if (response.status === 200) {
        return (
          setNewCompanyName(null) &&
          toast({
            title: "Company successsfully updated.",
            status: "success",
            position: "top-center",
            duration: 2500,
            isClosable: true,
          })
        );
      } else {
        return toast({
          title: "Error updating company.",
          status: "error",
          position: "top-center",
          duration: 2500,
          isClosable: true,
        });
      }
    } catch (error) {
      alert(error);
    }
  };

  function EditableControls() {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps,
    } = useEditableControls();

    return isEditing ? (
      <ButtonGroup justifyContent="center" size="sm">
        <IconButton icon={<CheckIcon />} {...getSubmitButtonProps()} />
        <IconButton icon={<CloseIcon />} {...getCancelButtonProps()} />
      </ButtonGroup>
    ) : (
      <Flex justifyContent="center">
        <IconButton size="sm" icon={<EditIcon />} {...getEditButtonProps()} />
      </Flex>
    );
  }

  const editDate= (x)=>{
    const value = new Date(x).toLocaleDateString('en-GB')
    return value
  }

  return (
    company && (
      <Container maxWidth={1200} m={10}>
        <Flex justify="right">
          <Button
            bg="brand.lightPrimary"
            isDisabled={newCompanyName ? false : true}
            type="submit"
            onClick={() => handleSubmit()}
          >
            {" "}
            Save Edit
          </Button>
          <Button variant="ghost" color="red" onClick={() => deleteCompany()}>
            Delete
          </Button>
        </Flex>

        <HStack spacing={10}></HStack>
        <Flex mt={15}>
          <Grid
            templateRows={{ base: "repeat(2, 1fr)", md: "repeat(2, 1fr)" }}
            templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
            gap={4}
            width="100%"
          >
            <GridItem
             
              rowSpan={{ base: 1, md: 2 }}
              colSpan={{ base: 1, md: 1 }}
            >
              <Flex flexDir="column" >
                <Flex mb={10} p={5}>
                <Box maxW={250} mr={20}>
                  <Image
                    borderRadius={20}
                    src={profilePicture}
                    h={150}
                    w={150}
                    alt="profilepicture"
                  />
                </Box>

                <Flex as="form" width="100%" p={3}>
                  <Flex flexDir="column" justifyContent="space-around">
                    <Editable
                      textAlign="center"
                      defaultValue={company.name}
                      fontSize="6xl"
                      isPreviewFocusable={true}
                    >
                      <EditablePreview />
                      {/* Here is the custom input */}
                      <Input
                        as={EditableInput}
                        onChange={(e) => setNewCompanyName(e.target.value)}
                      />
                      <EditableControls />
                    </Editable>
                  </Flex>
                </Flex>
                </Flex>

                <Flex flexDir="column" p={5}  borderWidth={3}
            borderRadius={5}>
                <Heading  pb={2}>Top Deals</Heading>
                <hr/>
                {deals && deals.map(deal=>(
                   <Flex width="100%" justifyContent="space-between" p={2} mb={2} borderBottomWidth={3}>
                   <Box>
                   <Text><b>{deal.contact?.name}</b></Text>
                   <Text>{deal.contact?.number}</Text>
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
      
              </Flex>
            </GridItem>

            <GridItem rowSpan={{ base: 1, md: 2 }} colSpan={{ base: 1, md: 1 }} 
            borderWidth={3}
            borderRadius={5} >
              <Box height="100%" p={4} >
                <Heading pb={2}>Contacts</Heading>
                <hr/>
                { contacts && contacts.map(contact=>(
                  <Flex width="100%" justifyContent="space-between" p={2}>
                  <Box>
                  <Text><b>{contact.name}</b></Text>
                  <Text>{contact.number}</Text>
                  </Box>

                  <Box>
                  <Link href={`/contacts/${contact._id}`}>
                    <IconButton
                      variant="outline"
                      color="teal"
                      icon={<HamburgerIcon />}
                    />
                    </Link>
                  </Box>
                </Flex>
                ))}
                
                

               
              </Box>
            </GridItem>
          </Grid>
        </Flex>
      </Container>
    )
  );
};
export default ViewCompany;

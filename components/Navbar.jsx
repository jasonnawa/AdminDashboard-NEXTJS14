"use client";
import {
  Box,
  Button,
  Heading,
  Icon,
  IconButton,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { List, ListItem } from "@chakra-ui/react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { useColorMode } from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import profilePicture from "@/static/images/prequel.jpg";
import { Image } from "@chakra-ui/next-js";
import { getURL } from "next/dist/shared/lib/utils";
import { usePathname } from "next/navigation";

const Navbar = (props) => {
  const { data: session, status: sessionStatus } = useSession();
  const pathname = usePathname();
  const toast = useToast()
  const { colorMode, toggleColorMode } = useColorMode();

  const handleLogout = () => {
    signOut({ callbackUrl: "http://localhost:3000/" });
    return toast({
      title: "user signed out.",
      status: "info",
      position: "top-right",
      duration: 2500,
      isClosable: true,
    });
  };
  return (
    sessionStatus == "authenticated" && (
      <Box
        as="nav"
        bg={colorMode === "dark" ? "black" : "gray.600"}
        maxW={250}
        flexDir="column"
      >
        <Box mx="auto">
          <List
            display="flex"
            p={5}
            justifyContent="space-between"
            height="100vh"
            flexDir="column"
          >
            <Box>
              <ListItem mx={4} mt={5}>
                <Image src={profilePicture} alt="profile picture" h={50} w={50} borderRadius={7} />
                <Heading
                  fontSize={24}
                  color={colorMode === "dark" ? "white" : "white"}
                  mt={4}
                >
                  {session.user.name} 
                </Heading>
                <Text
                  color={
                    colorMode === "dark" ? "brand.lightSecondary" : "gray.500"
                  }
                >
                  <small>{session.user.email}</small>
                </Text>
              </ListItem>

             

              <ListItem
                mx={4}
                mt={20}
                color={pathname === "/dashboard" ? "brand.lightPrimary" : ""}
              >
                <Link href="/dashboard">
                  <strong>Dashboard</strong>
                </Link>
              </ListItem>

              <ListItem
                mx={4}
                mt={5}
                color={pathname === "/deals" ? "brand.lightPrimary" : ""}
              >
                <Link href="/deals">
                  <strong>Deals</strong>
                </Link>
              </ListItem>

              <ListItem
                mx={4}
                mt={5}
                color={pathname === "/companies" ? "brand.lightPrimary" : ""}
              >
                <Link href="/companies">
                  <strong>Companies</strong>
                </Link>
              </ListItem>

              <ListItem
                mx={4}
                mt={5}
                color={pathname === "/contacts" ? "brand.lightPrimary" : ""}
              >
                <Link href="/contacts">
                  <strong>Contacts</strong>
                </Link>
              </ListItem>

              <ListItem mx={4} mt={5}>
                <IconButton
                  bg="brand.lightPrimary"
                  color="black"
                  onClick={toggleColorMode}
                  icon={colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
                />
              </ListItem>
            </Box>

            <Box>
              <Button bg="red" mt={5} onClick={handleLogout}>
                Logout
              </Button>
            </Box>
          </List>
        </Box>
      </Box>
    )
  );
};

export default Navbar;

import { Providers } from "../providers";
import { Box, Flex, GridItem, Grid, useColorMode } from "@chakra-ui/react";
import { getServerSession } from "next-auth";
import Navbar from "@/components/Navbar";
import SessionProvider from "@/sessionProvider";



export default async function HomeLayout({ children }) {
  const session = await getServerSession();

  return (
    <html lang="en">
    <Box as="body">
      <SessionProvider session={session}>
        <Providers>
          {children}
        </Providers>
      </SessionProvider>
    </Box>
  </html>
  );
}

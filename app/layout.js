import { Providers }  from "./providers";
import { Box, Flex, GridItem, Grid } from "@chakra-ui/react";
import { getServerSession } from "next-auth";
import Navbar from "@/components/Navbar";
import  SessionProvider  from "@/sessionProvider";


export default async function RootLayout({ children }) {
  const session = await getServerSession()

  return (
    <html lang="en">
      <Box as="body" bg="black" color="white">
        <SessionProvider session = {session}>
        <Providers>
        <Grid templateColumns='1fr 6fr' gap={6}>
          <GridItem>
          <Navbar />
          </GridItem>
          <GridItem>
          {children}
          </GridItem>
        </Grid>
        
       
        </Providers>
        </SessionProvider>
        </Box>
    </html>
  );
}

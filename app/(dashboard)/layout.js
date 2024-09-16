import { Providers } from "../providers";
import { Box, Flex, GridItem, Grid, useColorMode } from "@chakra-ui/react";
import { getServerSession } from "next-auth";
import Navbar from "@/components/Navbar";
import SessionProvider from "@/sessionProvider";



export default async function DashLayout({ children }) {
  const session = await getServerSession();

  return (
    <html lang="en">
      <Box as="body">
        <SessionProvider session={session}>
          <Providers>
            <Grid templateColumns="1fr 6fr">
              <GridItem>
                <Navbar/>
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

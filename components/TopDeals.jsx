'use client'
import { Heading, Box , Text, Flex, Skeleton, SkeletonCircle, SkeletonText} from "@chakra-ui/react";
import { Image } from "@chakra-ui/next-js";
import profilePicture from "@/static/images/prequel.jpg";

const TopDeals = ()=>{

    return(
        <>
        <Flex width="100%" justifyContent="space-between" p={1} mb={3}>
              <Flex flexDir="row">
                <Box mr={1}>
                  <Image
                    src={profilePicture}
                    borderRadius={20}
                    height={6}
                    w={6}
                  />
                </Box>

                <Flex flexDir="column">
                  <Text as="b" mb={1} fontSize={13}>
                    Osikoay Jason
                  </Text>
                  <Text as="sub" fontSize={11}>
                    Software Developer
                  </Text>
                </Flex>
              </Flex>

              <Box alignContent="center">
                <Text as="sub" fontSize={12}>
                  {" "}
                  <strong>$456783</strong>
                </Text>
              </Box>
            </Flex>

            <Flex width="100%" justifyContent="space-between" p={1} mb={3}>
              <Flex flexDir="row">
                <Box mr={1}>
                  <SkeletonCircle />
                </Box>

                <Flex flexDir="column">
                  <SkeletonText height={2} w={20}/>
                </Flex>
              </Flex>

              <Box alignContent="center" h={10}>
                <Skeleton height={2} width={20}/>
              </Box>
            </Flex>
            </>
    )
}

export default TopDeals;
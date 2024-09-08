import React from "react";
import {
  Box,
  Container,
  Grid,
  VStack,
  HStack,
  Text,
  Link,
  useBreakpointValue,
} from "@chakra-ui/react";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa"; // Import icons
import Logo from "../Logo/Logo";

const Footer = () => {
  const gridTemplateColumns = useBreakpointValue({
    base: "1fr",
    md: "repeat(5, 1fr)",
  });

  return (
    <Box
      bg="teal.600"
      color="white"
      py={8}
      borderTop="1px"
      borderColor="gray.200"
    >
      <Container maxW="container.xl">
        <Grid templateColumns={gridTemplateColumns} gap={8}>
          <VStack align="start" spacing={4}>
            <Box bg="white" p={2} borderRadius="md">
              <Logo />
            </Box>
            <Text fontSize="lg" fontWeight="bold">
              Company Name
            </Text>
            <Text fontSize="sm">1234 Street Name, City, State, 12345</Text>
            <Text fontSize="sm">
              &copy; {new Date().getFullYear()} Company Name. All rights
              reserved.
            </Text>
          </VStack>

          <VStack align="start" spacing={4} ml={8}>
            <Text fontSize="lg" fontWeight="bold">
              About
            </Text>
            <Link href="#" _hover={{ color: "teal.200" }} fontSize="sm">
              Our Story
            </Link>
            <Link href="#" _hover={{ color: "teal.200" }} fontSize="sm">
              Careers
            </Link>
            <Link href="#" _hover={{ color: "teal.200" }} fontSize="sm">
              Press
            </Link>
          </VStack>

          <VStack align="start" spacing={4}>
            <Text fontSize="lg" fontWeight="bold">
              Projects
            </Text>
            <Link href="#" _hover={{ color: "teal.200" }} fontSize="sm">
              Current Projects
            </Link>
            <Link href="#" _hover={{ color: "teal.200" }} fontSize="sm">
              Past Projects
            </Link>
            <Link href="#" _hover={{ color: "teal.200" }} fontSize="sm">
              Client Stories
            </Link>
          </VStack>

          <VStack align="start" spacing={4}>
            <Text fontSize="lg" fontWeight="bold">
              Quick Links
            </Text>
            <Link href="#" _hover={{ color: "teal.200" }} fontSize="sm">
              Home
            </Link>
            <Link href="#" _hover={{ color: "teal.200" }} fontSize="sm">
              Services
            </Link>
            <Link href="#" _hover={{ color: "teal.200" }} fontSize="sm">
              Contact Us
            </Link>
            <Link href="#" _hover={{ color: "teal.200" }} fontSize="sm">
              Privacy Policy
            </Link>
          </VStack>

          <VStack align="start" spacing={4}>
            <Text fontSize="lg" fontWeight="bold">
              Follow Us
            </Text>
            <HStack spacing={4}>
              <Link href="#" _hover={{ color: "teal.200" }} fontSize="3xl">
                <FaFacebookF />
              </Link>
              <Link href="#" _hover={{ color: "teal.200" }} fontSize="3xl">
                <FaTwitter />
              </Link>
              <Link href="#" _hover={{ color: "teal.200" }} fontSize="3xl">
                <FaLinkedinIn />
              </Link>
            </HStack>
          </VStack>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;

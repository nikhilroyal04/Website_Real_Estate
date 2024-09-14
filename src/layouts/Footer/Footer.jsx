import React, { useState } from "react";
import {
  Box,
  Container,
  Grid,
  VStack,
  HStack,
  Text,
  Link,
  useBreakpointValue,
  Collapse,
  Divider,
} from "@chakra-ui/react";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import Logo from "../Logo/Logo";

const Footer = () => {
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);
  const [isQuickLinksOpen, setIsQuickLinksOpen] = useState(false);

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
          </VStack>

          <VStack
            align="start"
            spacing={4}
            display={{ base: "none", md: "flex" }}
          >
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

          <VStack
            align="start"
            spacing={4}
            display={{ base: "none", md: "flex" }}
          >
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

          <VStack
            align="start"
            spacing={4}
            display={{ base: "none", md: "flex" }}
          >
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

          <VStack
            align="start"
            spacing={4}
            display={{ base: "none", md: "flex" }}
          >
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

        {/* Collapsible sections for small screens */}
        <Box display={{ base: "block", md: "none" }} mt={10}>
          {/* Follow Us section for small screens */}
          <VStack align="start" spacing={4} mt={6}>
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

          <VStack align="start" spacing={4} mt={6}>
            <HStack
              spacing={2}
              onClick={() => setIsAboutOpen(!isAboutOpen)}
              cursor="pointer"
            >
              <Text fontSize="lg" fontWeight="bold">
                About
              </Text>
              {isAboutOpen ? <FaChevronUp /> : <FaChevronDown />}
            </HStack>
            <Collapse in={isAboutOpen}>
              <VStack align="start" spacing={2}>
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
            </Collapse>
          </VStack>

          <VStack align="start" spacing={4} mt={6}>
            <HStack
              spacing={2}
              onClick={() => setIsProjectsOpen(!isProjectsOpen)}
              cursor="pointer"
            >
              <Text fontSize="lg" fontWeight="bold">
                Projects
              </Text>
              {isProjectsOpen ? <FaChevronUp /> : <FaChevronDown />}
            </HStack>
            <Collapse in={isProjectsOpen}>
              <VStack align="start" spacing={2}>
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
            </Collapse>
          </VStack>

          <VStack align="start" spacing={4} mt={6}>
            <HStack
              spacing={2}
              onClick={() => setIsQuickLinksOpen(!isQuickLinksOpen)}
              cursor="pointer"
            >
              <Text fontSize="lg" fontWeight="bold">
                Quick Links
              </Text>
              {isQuickLinksOpen ? <FaChevronUp /> : <FaChevronDown />}
            </HStack>
            <Collapse in={isQuickLinksOpen}>
              <VStack align="start" spacing={2}>
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
            </Collapse>
          </VStack>
        </Box>
      </Container>

      {/* Copyright and additional info */}
      <Box mt={10} textAlign="center">
        <Divider borderColor="gray.500" mb={4} />
        <Text fontSize="md">
          &copy; {new Date().getFullYear()} Apna Ghar. All rights reserved.
        </Text>
      </Box>
    </Box>
  );
};

export default Footer;

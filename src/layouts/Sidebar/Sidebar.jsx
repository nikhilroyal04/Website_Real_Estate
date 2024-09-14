import React from "react";
import {
  Box,
  Stack,
  Button,
  IconButton,
  VStack,
  HStack,
  Text,
} from "@chakra-ui/react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { CloseIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import Logo from "../Logo/Logo";

const Sidebar = ({ onClose, city }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/login");
  };

  return (
    <Box
      bg="blue.200"
      w="250px" 
      h="100vh"
      pos="fixed"
      top={0}
      left={0}
      zIndex={20}
      color="white"
      boxShadow="lg"
      p={4}
      borderRadius="md" 
    >
      <IconButton
        aria-label="Close Menu"
        icon={<CloseIcon />}
        onClick={onClose}
        color="teal.500"
        bg="blue.200"
        position="absolute"
        top={4}
        right={4}
        borderRadius="full"
      />
      <VStack spacing={6} alignItems="center" mt={12}>
        <Logo />
        <VStack spacing={4} alignItems="flex-start" w="full">
          <HStack
            spacing={3}
            alignItems="center"
            justifyContent="center"
            mx="auto"
            mb={5}
          >
            {" "}
            <FaMapMarkerAlt fontSize={25} />
            <Text fontWeight="bold" fontSize="2xl" textAlign="center">
              {" "}
              {city}
            </Text>
          </HStack>
          <Button
            variant="solid"
            colorScheme="teal"
            borderRadius="md"
            w="full"
            _hover={{ transform: "scale(0.95)", bg: "teal.600" }}
            transition="transform 0.2s"
          >
            Sell Property
          </Button>
          <Button
            variant="solid"
            colorScheme="teal"
            borderRadius="md"
            w="full"
            _hover={{ transform: "scale(0.95)", bg: "teal.600" }} 
            transition="transform 0.2s"
          >
            Rent Property
          </Button>
          <Button
            variant="solid"
            colorScheme="teal"
            borderRadius="md"
            w="full"
            _hover={{ transform: "scale(0.95)", bg: "teal.600" }} 
            transition="transform 0.2s"
            onClick={handleClick}
          >
            Login / Sign Up
          </Button>
          <Button
            variant="solid"
            colorScheme="teal"
            borderRadius="md"
            w="full"
            _hover={{ transform: "scale(0.95)", bg: "teal.600" }}
            transition="transform 0.2s"
          >
            Contact Us
          </Button>
        </VStack>
      </VStack>
    </Box>
  );
};

export default Sidebar;

import React from 'react';
import { Box, Stack, Button, IconButton, VStack, HStack, Text } from '@chakra-ui/react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { CloseIcon } from '@chakra-ui/icons';
import Logo from '../Logo/Logo';

const Sidebar = ({ onClose }) => {
  return (
    <Box
      bg="teal.500"
      w="250px" // Slightly wider for better spacing
      h="100vh"
      pos="fixed"
      top={0}
      left={0}
      zIndex={20}
      color="white"
      boxShadow="lg"
      p={4}
      borderRadius="md" // Rounded corners for the sidebar
    >
      <IconButton
        aria-label="Close Menu"
        icon={<CloseIcon />}
        onClick={onClose}
        color="teal.500"
        bg="white"
        position="absolute"
        top={4}
        right={4}
        borderRadius="full" // Round the close button
      />
      <VStack spacing={6} alignItems="center" mt={12}>
        <Logo />
        <VStack spacing={4} alignItems="flex-start" w="full">
          <HStack spacing={3} alignItems="center">
            <FaMapMarkerAlt />
            <Text fontWeight="bold" fontSize="lg">Location</Text>
          </HStack>
          <Button
            variant="solid"
            colorScheme="teal"
            borderRadius="md"
            w="full"
            _hover={{ transform: 'scale(0.95)', bg: 'teal.600' }} // Zoom out effect on hover
            transition="transform 0.2s"
          >
            Sell Property
          </Button>
          <Button
            variant="solid"
            colorScheme="teal"
            borderRadius="md"
            w="full"
            _hover={{ transform: 'scale(0.95)', bg: 'teal.600' }} // Zoom out effect on hover
            transition="transform 0.2s"
          >
            Rent Property
          </Button>
          <Button
            variant="solid"
            colorScheme="teal"
            borderRadius="md"
            w="full"
            _hover={{ transform: 'scale(0.95)', bg: 'teal.600' }} // Zoom out effect on hover
            transition="transform 0.2s"
          >
            Login / Sign Up
          </Button>
          <Button
            variant="solid"
            colorScheme="teal"
            borderRadius="md"
            w="full"
            _hover={{ transform: 'scale(0.95)', bg: 'teal.600' }} // Zoom out effect on hover
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

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Flex, IconButton, Button, useDisclosure, HStack, Text } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { FaMapMarkerAlt } from "react-icons/fa";
import Sidebar from "../Sidebar/Sidebar";
import Logo from "../Logo/Logo";
import { useNavigate } from "react-router-dom";
import { setLocation, resetLocation, selectLocation, selectLocationStatus, selectLocationError, fetchCityByLatLng } from '../../app/Slices/locationSlice';

const Header = () => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const location = useSelector(selectLocation);
  const status = useSelector(selectLocationStatus);
  const error = useSelector(selectLocationError);

  useEffect(() => {
    const fetchLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            dispatch(setLocation({ latitude, longitude }));
            fetchCityByLatLng(dispatch, latitude, longitude); 
          },
          () => {
            dispatch(resetLocation());
          }
        );
      } else {
        dispatch(resetLocation());
      }
    };

    fetchLocation();
  }, [dispatch]);

  const handleLogin = () => {
    navigate("/login");
  };

  const handleContact = () => {
    navigate("/");
  };

  return (
    <Box
      bg="white"
      px={4}
      boxShadow="md"
      borderBottom="1px"
      borderColor="gray.200"
    >
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <IconButton
          size="md"
          icon={<HamburgerIcon />}
          aria-label="Open Menu"
          display={{ base: "flex", md: "none" }}
          onClick={onOpen}
          bg="white"
          borderRadius="full"
        />

        <Flex
          alignItems="center"
          flex="1"
          justifyContent="center"
          display={{ base: "flex", md: "none" }}
        >
          <Logo />
        </Flex>

        <Flex
          alignItems="center"
          display={{ base: "none", md: "flex" }}
          flex="1"
          justifyContent="flex-start"
        >
          <Logo />
          <HStack spacing={2} color="teal.500" ml={4}>
            <FaMapMarkerAlt />
            <Text fontWeight="bold" fontSize="lg">
              {status === 'loading' ? 'Loading...' : location}
            </Text>
          </HStack>
        </Flex>

        <Flex alignItems="center">
          <HStack as="nav" spacing={4} display={{ base: "none", md: "flex" }}>
            <Button variant="ghost" color="teal.500">
              Sell Property
            </Button>
            <Button variant="ghost" color="teal.500">
              Rent Property
            </Button>
            <Button
              onClick={handleLogin}
              colorScheme="teal"
              bg="teal.500"
              color="white"
              _hover={{ bg: "teal.600" }}
            >
              Login / Sign Up
            </Button>
            <Button
              colorScheme="teal"
              bg="blue.400"
              color="white"
              _hover={{ bg: "blue.700" }}
              onClick={handleContact}
            >
              Contact Us
            </Button>
          </HStack>
        </Flex>
      </Flex>

      {isOpen && (
        <Box
          pb={4}
          display={{ md: "none" }}
          bg="white"
          borderTop="1px"
          borderColor="gray.200"
        >
          <Sidebar onClose={onClose} city={location} /> 
          </Box>
      )}
    </Box>
  );
};

export default Header;

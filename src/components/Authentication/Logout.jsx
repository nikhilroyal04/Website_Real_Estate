import React, { useEffect } from "react";
import { Box, Text, Button, VStack } from "@chakra-ui/react";
import Lottie from "react-lottie-player";
import loaderAnimation from "../../assets/200-logout.json";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../app/Slices/authSlice";

export default function Logout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(logout()); 
  }, [dispatch]);

  const handleClick = () => {
    navigate("/");
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      height="80vh"
      bg="gray.50"
      px={4}
    >
      <VStack spacing={4} align="center">
        {/* Lottie Animation */}
        <Lottie
          loop
          animationData={loaderAnimation}
          play
          style={{ width: 300, height: "auto" }}
        />

        {/* Text Message */}
        <Text
          fontSize="3xl"
          fontWeight="bold"
          color="gray.700"
          textAlign="center"
        >
          You have been successfully logged out.
        </Text>

        {/* Go to Home Button */}
        <Button color="blue.500" size="lg" onClick={handleClick}>
          Go to Home
        </Button>
      </VStack>
    </Box>
  );
}

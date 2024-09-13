import React from "react";
import { Box, Button, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Lottie from "react-lottie-player";
import animationData from "../../assets/502-network.json"; // Update the path if necessary

const Error502 = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      height="auto"
      marginBottom= "50px"
    >
      {/* Lottie Animation */}
      <Lottie
        loop
        animationData={animationData}
        play
        style={{ width: "60%", maxWidth: "650px", height: "auto" }}
      />

      <VStack mt={4}>
        <Button
          size="lg"
          onClick={handleGoHome}
          px={10}
          py={6}
          fontSize="lg"
          borderRadius="lg"
          bg="teal.400"
          color="white"
          _hover={{
            bg: "teal.300",
            transform: "scale(1.1)",
            transition: "all 0.3s ease-in-out",
          }}
          _active={{
            bg: "teal.500",
            transform: "scale(0.9)",
          }}
          _focus={{
            boxShadow: "outline",
          }}
          transition="all 0.2s ease-in-out"
        >
          Go Back Home
        </Button>
      </VStack>
    </Box>
  );
};

export default Error502;

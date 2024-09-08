import React from "react";
import { Box, Button, Container, FormControl, FormLabel, Input, Stack, Heading, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const pageTransition = {
  initial: { opacity: 0, x: -200 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 200 },
  transition: { duration: 0.6 },
};

const LoginPage = () => {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here
  };

  const handleClick = () => {
    navigate("/signup");
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageTransition.transition}
      variants={pageTransition}
      style={{ width: "100%" }}
    >
      <Container
        maxW="100vw"
        h="100vh"
        p={0}
        margin={0}
        display="flex"
        flexDirection={{ base: "column", lg: "row" }}
      >
        {/* Teal Background Section */}
        <Box
          flexBasis={{ base: "0%", lg: "50%" }}
          bg="teal.500"
          display={{ base: "none", lg: "flex" }}
          alignItems="center"
          justifyContent="center"
          color="white"
          fontSize="5xl"
          fontWeight="bold"
          textAlign="center"
          borderRadius="0% 0% 100% 0%"
        >
          <Stack spacing={4}>
            <Text fontSize="50px">Welcome Back!</Text>
            <Text fontSize="30px">We’re glad to see you again.</Text>
          </Stack>
        </Box>

        {/* Login Box Section */}
        <Box
          p={6}
          maxW="md"
          borderWidth={1}
          borderRadius="3xl"
          bg="white"
          width={{ base: "90%", lg: "550px" }}
          boxShadow="lg"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          height="md"
          my="auto"
          ml={{ base: "auto", lg: "25vh" }}
          mr={{ base: "auto", lg: "0" }}
        >
          <Heading mb={4} textAlign="center" fontSize="3xl" color="teal.600">
            Login
          </Heading>
          <form onSubmit={handleSubmit}>
            <Stack spacing={5}>
              <FormControl id="email" isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  bg="gray.50"
                  borderRadius="lg"
                  boxShadow="sm"
                  width={{ base: "100%", lg: 350 }}
                />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  bg="gray.50"
                  borderRadius="lg"
                  boxShadow="sm"
                  width={{ base: "100%", lg: 350 }}
                />
              </FormControl>
              <Button
                type="submit"
                colorScheme="teal"
                size="md"
                width="full"
                borderRadius="md"
                boxShadow="md"
                sx={{ width: 250, mx: "auto" }}
              >
                Login
              </Button>
            </Stack>
          </form>
          <Text mt={4} textAlign="center">
            <Button variant="link" colorScheme="teal">
              Forgot Password?
            </Button>
          </Text>
          <Text mt={4} textAlign="center">
            Don't have an account?{" "}
            <Button variant="link" onClick={handleClick} colorScheme="teal">
              Sign Up
            </Button>
          </Text>
        </Box>
      </Container>
    </motion.div>
  );
};

export default LoginPage;
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Container, FormControl, FormLabel, Input, Stack, Heading, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { loginUser } from '../../app/Slices/authSlice';

const pageTransition = {
  initial: { opacity: 0, x: -200 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 200 },
  transition: { duration: 0.6 },
};

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoading, error } = useSelector((state) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(loginUser(email, password));
  };

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleClick = () => {
    navigate('/signup');
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageTransition.transition}
      variants={pageTransition}
      style={{ width: '100%' }}
    >
      <Container
        maxW="100vw"
        h="100vh"
        p={0}
        margin={0}
        display="flex"
        flexDirection={{ base: 'column', lg: 'row' }}
      >
        <Box
          flexBasis={{ base: '0%', lg: '50%' }}
          bg="teal.500"
          display={{ base: 'none', lg: 'flex' }}
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

        <Box
          p={6}
          maxW="md"
          borderWidth={1}
          borderRadius="3xl"
          bg="white"
          width={{ base: '90%', lg: '550px' }}
          boxShadow="lg"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          height="md"
          my="auto"
          ml={{ base: 'auto', lg: '25vh' }}
          mr={{ base: 'auto', lg: '0' }}
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
                  width={{ base: '100%', lg: 350 }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  width={{ base: '100%', lg: 350 }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormControl>
              <Button
                type="submit"
                colorScheme="teal"
                size="md"
                width="full"
                borderRadius="md"
                boxShadow="md"
                sx={{ width: 250, mx: 'auto' }}
                isLoading={isLoading}
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
            Don't have an account?{' '}
            <Button variant="link" onClick={handleClick} colorScheme="teal">
              Sign Up
            </Button>
          </Text>
          {error && (
            <Text mt={4} color="red.500" textAlign="center">
              {error.message || 'Login failed'}
            </Text>
          )}
        </Box>
      </Container>
    </motion.div>
  );
};

export default LoginPage;

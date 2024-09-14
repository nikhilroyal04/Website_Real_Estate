import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  Button,
  Grid,
  Text,
  useDisclosure,
  Fade,
  Slide,
  FormErrorMessage,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { AddcontactData } from "../../app/Slices/contactSlice";

const MotionBox = motion(Box);

const Contact = () => {
  // State variables for form fields
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [preferredTime, setPreferredTime] = useState("");
  const [message, setMessage] = useState("");

  // Error state variables
  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");
  const dispatch = useDispatch();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const validatePhoneNumber = (number) => {
    // Validate that phone number contains exactly 10 digits
    return /^\d{10}$/.test(number);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let valid = true;

    // Reset errors
    setPhoneError("");
    setEmailError("");

    if (!validatePhoneNumber(phone)) {
      setPhoneError("Phone number must contain exactly 10 digits.");
      valid = false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setEmailError("Please enter a valid email address.");
      valid = false;
    }

    if (valid) {
      try {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("phoneNumber", phone);
        formData.append("email", email);
        formData.append("preferredAvailableTime", preferredTime);
        formData.append("message", message);

        // Simulate form submission
        await dispatch(AddcontactData(formData));

        onOpen();

        // Automatically close the slide message after 2 seconds
        setTimeout(() => {
          onClose();
          // Clear all fields after successful submission
          setName("");
          setPhone("");
          setEmail("");
          setPreferredTime("");
          setMessage("");
        }, 2000);
      } catch (error) {
        console.error("Failed to submit form data:", error);
      }
    }
  };

  // Generate time options every 2 hours from 10 AM to 9 PM
  const timeOptions = [];
  for (let hour = 10; hour <= 21; hour += 2) {
    const timeLabel = `${hour % 12 || 12} ${hour < 12 ? "AM" : "PM"} - ${
      hour + 2 > 12 ? (hour + 2) % 12 || 12 : hour + 2
    } ${hour + 2 < 12 ? "AM" : "PM"}`;
    const timeValue = `${hour}:00-${hour + 2}:00`;
    timeOptions.push(
      <option key={timeValue} value={timeValue}>
        {timeLabel}
      </option>
    );
  }

  return (
    <Box
      py={8}
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Container maxW="container.xl">
        {/* Common Heading */}
        <Text fontSize="3xl" fontWeight="bold" mb={8} textAlign="center">
          Get in Touch
        </Text>

        {/* Single Card containing both Get in Touch and Contact Form */}
        <MotionBox
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          bg="white"
          borderRadius="lg"
          boxShadow="lg"
          p={8}
          mb={6}
          mx={{ base: 4, md: 8 }}
          maxW="100%"
        >
          <Grid
            templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
            gap={20}
            mb={6}
          >
            {/* Left Column: Contact Information */}
            <Box>
              <Text fontSize="2xl" fontWeight="bold" mb={4}>
                Contact Us
              </Text>
              <Text fontSize="md" color="gray.600" mb={4}>
                Address: 123 Main Street, City, Country
              </Text>
              <Text fontSize="md" color="gray.600" mb={4}>
                Phone: +123 456 7890
              </Text>
              <Text fontSize="md" color="gray.600">
                If you have any questions, feel free to reach out to us. Our
                team is available to help you with any inquiries you may have
                about our services or anything else.
              </Text>
              <Text mt={4} color="gray.600">
                We look forward to hearing from you and will respond as quickly
                as possible.
              </Text>
            </Box>

            {/* Right Column: Contact Form */}
            <Box>
              <form onSubmit={handleSubmit}>
                <Grid
                  templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
                  gap={6}
                  mb={6}
                >
                  {/* Name */}
                  <FormControl isRequired>
                    <FormLabel htmlFor="name">Name</FormLabel>
                    <Input
                      id="name"
                      placeholder="Your Name"
                      borderColor="teal.500"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      _focus={{
                        borderColor: "teal.300",
                        boxShadow: "0 0 0 1px teal.300",
                      }}
                      transition="all 0.2s"
                    />
                  </FormControl>

                  {/* Email */}
                  <FormControl isRequired isInvalid={!!emailError}>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <Input
                      type="email"
                      id="email"
                      placeholder="Your Email"
                      borderColor="teal.500"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      _focus={{
                        borderColor: "teal.300",
                        boxShadow: "0 0 0 1px teal.300",
                      }}
                      transition="all 0.2s"
                    />
                    {emailError && (
                      <FormErrorMessage>{emailError}</FormErrorMessage>
                    )}
                  </FormControl>

                  {/* Phone Number */}
                  <FormControl isRequired isInvalid={!!phoneError}>
                    <FormLabel htmlFor="phone">Phone Number</FormLabel>
                    <Input
                      type="number"
                      id="phone"
                      placeholder="Your Phone Number"
                      borderColor="teal.500"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      _focus={{
                        borderColor: "teal.300",
                        boxShadow: "0 0 0 1px teal.300",
                      }}
                      transition="all 0.2s"
                    />
                    {phoneError && (
                      <FormErrorMessage>{phoneError}</FormErrorMessage>
                    )}
                  </FormControl>

                  {/* Preferred Time to Talk */}
                  <FormControl isRequired>
                    <FormLabel htmlFor="preferred-time">
                      Preferred Time to Talk
                    </FormLabel>
                    <Select
                      id="preferred-time"
                      placeholder="Select a time"
                      borderColor="teal.500"
                      value={preferredTime}
                      onChange={(e) => setPreferredTime(e.target.value)}
                      _focus={{
                        borderColor: "teal.300",
                        boxShadow: "0 0 0 1px teal.300",
                      }}
                      transition="all 0.2s"
                    >
                      {timeOptions}
                    </Select>
                  </FormControl>

                  {/* Message */}
                  <FormControl
                    isRequired
                    gridColumn={{ base: "1 / span 1", md: "1 / span 2" }}
                  >
                    <FormLabel htmlFor="message">Message</FormLabel>
                    <Textarea
                      id="message"
                      placeholder="Your Message"
                      borderColor="teal.500"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      _focus={{
                        borderColor: "teal.300",
                        boxShadow: "0 0 0 1px teal.300",
                      }}
                      transition="all 0.2s"
                    />
                  </FormControl>
                </Grid>

                {/* Submit Button */}
                <Button
                  colorScheme="teal"
                  type="submit"
                  variant="solid"
                  size="lg"
                  _hover={{
                    transform: "scale(1.05)",
                    boxShadow: "lg",
                  }}
                  transition="all 0.2s"
                  width="full"
                >
                  Submit
                </Button>
              </form>
            </Box>
          </Grid>
        </MotionBox>

        {/* Animated Success Message */}
        <Slide direction="top" in={isOpen} style={{ zIndex: 10 }}>
          <Box
            bg="teal.500"
            color="white"
            p={4}
            borderRadius="md"
            boxShadow="md"
            textAlign="center"
            mb={6}
            mx={{ base: 4, md: 8 }}
            maxW="100%"
          >
            <Fade in={isOpen}>
              <Box>
                Thank you for contacting us. We will get back to you soon.
              </Box>
            </Fade>
          </Box>
        </Slide>
      </Container>
    </Box>
  );
};

export default Contact;

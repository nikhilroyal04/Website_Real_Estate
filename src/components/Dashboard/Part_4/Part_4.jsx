import React from "react";
import {
  Box,
  Container,
  Grid,
  Heading,
  Text,
  Image,
  Stack,
  HStack,
  Link,
  Icon,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

// Sample city data with images from Unsplash
const cityData = [
  {
    id: 1,
    name: "Noida",
    imageUrl:
      "https://images.pexels.com/photos/257360/pexels-photo-257360.jpeg",
  },
  {
    id: 2,
    name: "Delhi",
    imageUrl:
      "https://images.pexels.com/photos/206253/pexels-photo-206253.jpeg",
  },
  {
    id: 3,
    name: "Gurgaon",
    imageUrl:
      "https://media.istockphoto.com/id/623379656/photo/destruction-of-nature-and-construction-of-new-urban-landscape.jpg?s=1024x1024&w=is&k=20&c=9uZwzJM51MxE1bZ5qSCA5SS_ldckX2GrRa8BEER5Viw=",
  },
  {
    id: 4,
    name: "NCR",
    imageUrl:
      "https://images.pexels.com/photos/904272/pexels-photo-904272.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 5,
    name: "Mumbai",
    imageUrl:
      "https://images.pexels.com/photos/574324/pexels-photo-574324.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 6,
    name: "Bangalore",
    imageUrl:
      "https://images.pexels.com/photos/23973679/pexels-photo-23973679/free-photo-of-front-of-bangalore-palace-in-bangalore-in-india.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
];

const Part_4 = () => {
  return (
    <Box w="90vw" mx="auto" py={10}>
      <Container maxW="container.xl">
        {/* Section Heading */}
        <Heading
          as="h2"
          size="xl"
          mb={6}
          textAlign="center"
          borderBottom="2px solid"
          pb={2}
        >
          Featured by Cities
        </Heading>

        {/* Grid of City Cards */}
        <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={8}>
          {cityData.map((city, index) => (
            <Box
              key={city.id}
              position="relative"
              overflow="hidden"
              borderRadius="lg"
              transform={index % 2 === 0 ? "rotate(-3deg)" : "rotate(3deg)"} // Shifted angles for effect
              _hover={{ transform: "scale(1.05) rotate(0deg)" }} // Hover effect with scale and reset angle
              transition="all 0.3s ease"
            >
              <Image
                src={city.imageUrl}
                alt={city.name}
                w="100%"
                h="250px"
                objectFit="cover"
                borderRadius="lg"
              />
              <Stack
                position="absolute"
                bottom={0}
                left={0}
                right={0}
                bg="rgba(0, 0, 0, 0.5)"
                color="white"
                p={4}
                textAlign="center"
              >
                <Text fontSize="2xl" fontWeight="bold">
                  {city.name}
                </Text>
              </Stack>
            </Box>
          ))}
        </Grid>        
      </Container>
    </Box>
  );
};

export default Part_4;

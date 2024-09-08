import React from "react";
import {
  Box,
  Container,
  Grid,
  Text,
  Image,
  VStack,
  HStack,
  useBreakpointValue,
} from "@chakra-ui/react";

const agents = [
  {
    id: 1,
    name: "Alice Johnson",
    banner: "Top Performer",
    companySold: "50+",
    priceRange: "$500K - $1M",
    imageUrl: 'https://images.pexels.com/photos/39866/entrepreneur-startup-start-up-man-39866.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: 2,
    name: "Bob Smith",
    banner: "Leading Agent",
    companySold: "45+",
    priceRange: "$400K - $900K",
    imageUrl: 'https://images.pexels.com/photos/39866/entrepreneur-startup-start-up-man-39866.jpeg?auto=compress&cs=tinysrgb&w=600'

  },
  {
    id: 3,
    name: "Carol Brown",
    banner: "Elite Agent",
    companySold: "60+",
    priceRange: "$600K - $1.2M",
    imageUrl: 'https://images.pexels.com/photos/39866/entrepreneur-startup-start-up-man-39866.jpeg?auto=compress&cs=tinysrgb&w=600'

  },
  {
    id: 4,
    name: "David Wilson",
    banner: "Top Seller",
    companySold: "55+",
    priceRange: "$550K - $1.1M",
    imageUrl: 'https://images.pexels.com/photos/39866/entrepreneur-startup-start-up-man-39866.jpeg?auto=compress&cs=tinysrgb&w=600'

  },
  {
    id: 5,
    name: "Eve Davis",
    banner: "Premier Agent",
    companySold: "50+",
    priceRange: "$500K - $1M",
    imageUrl: 'https://images.pexels.com/photos/39866/entrepreneur-startup-start-up-man-39866.jpeg?auto=compress&cs=tinysrgb&w=600'

  },
  {
    id: 6,
    name: "Frank Miller",
    banner: "Market Leader",
    companySold: "65+",
    priceRange: "$650K - $1.3M",
    imageUrl: 'https://images.pexels.com/photos/39866/entrepreneur-startup-start-up-man-39866.jpeg?auto=compress&cs=tinysrgb&w=600'

  },
];

const Part_6 = () => {
  // Responsive settings
  const gridTemplateColumns = useBreakpointValue({
    base: "1fr",
    md: "repeat(2, 1fr)",
    lg: "repeat(3, 1fr)",
  });

  return (
    <Box w="98vw" py={10} mx="auto" bg="gray.50">
      <Container maxW="container.xl">
        {/* Section Heading */}
        <Text
          as="h2"
          fontSize="2xl"
          fontWeight="bold"
          mb={8}
          textAlign="center"
          color="blue.500"
        >
          Top Agents
        </Text>

        {/* Grid of Agents */}
        <Grid templateColumns={gridTemplateColumns} gap={8}>
          {agents.map((agent) => (
            <Box
              key={agent.id}
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              bg="white"
              boxShadow="md"
            >
              <HStack spacing={4} align="center" p={4}>
                <Box flexShrink={0}>
                  <Image
                    src={agent.imageUrl}
                    alt={agent.name}
                    objectFit="cover"
                    boxSize="150px"
                    borderRadius="md"
                  />
                </Box>
                <VStack align="start" spacing={2}>
                  <Text fontSize="lg" fontWeight="bold">
                    {agent.name}
                  </Text>
                  <Text fontSize="md" color="gray.600">
                    {agent.banner}
                  </Text>
                  <Text fontSize="sm" color="gray.500">
                    Company Sold: {agent.companySold}
                  </Text>
                  <Text fontSize="sm" color="gray.500">
                    Price Range: {agent.priceRange}
                  </Text>
                </VStack>
              </HStack>
            </Box>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Part_6;

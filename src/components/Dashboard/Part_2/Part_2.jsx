import React from 'react';
import { Box, Container, Grid, Heading, Text, Button, useBreakpointValue, Image, Stack } from '@chakra-ui/react';

const projectData = [
    { id: 1, title: 'Luxury Villa', description: 'A beautiful villa with modern amenities.', imageUrl: 'https://via.placeholder.com/400x300?text=Luxury+Villa' },
    { id: 2, title: 'Urban Apartment', description: 'A stylish apartment in the heart of the city.', imageUrl: 'https://via.placeholder.com/400x300?text=Urban+Apartment' },
    { id: 3, title: 'Beachfront Condo', description: 'A serene condo with a stunning ocean view.', imageUrl: 'https://via.placeholder.com/400x300?text=Beachfront+Condo' },
    { id: 4, title: 'Suburban Home', description: 'A spacious home in a quiet neighborhood.', imageUrl: 'https://via.placeholder.com/400x300?text=Suburban+Home' },
    { id: 5, title: 'Penthouse Suite', description: 'An exclusive penthouse with luxury features.', imageUrl: 'https://via.placeholder.com/400x300?text=Penthouse+Suite' },
    { id: 6, title: 'Country Cottage', description: 'A charming cottage surrounded by nature.', imageUrl: 'https://via.placeholder.com/400x300?text=Country+Cottage' },
  ];

const Part_2 = () => {
  const columns = useBreakpointValue({ base: 1, md: 2, lg: 3 });

  return (
    <Box w="80vw" mx="auto" p={5} mt={5}>
      <Container maxW="container.xl">
        {/* Heading */}
        <Box mb={6}>
          <Heading
            as="h2"
            size="2xl"
            textAlign="center"
            color="purple.600"
            position="relative"
           
          >
            Featured Projects
          </Heading>
          <Text
            fontSize="xl"
            textAlign="center"
            color="gray.500"
            mt={2}
            mb={10}
            position="relative"
            _after={{
                content: '""',
                position: "absolute",
                width: "300px",
                height: "4px",
                backgroundColor: "purple.600",
                bottom: "-8px",
                left: "50%",
                transform: "translateX(-50%)",
              }}
          >
            Book Your Home
          </Text>
        </Box>

        {/* Grid of Cards */}
        <Grid templateColumns={`repeat(${columns}, 1fr)`} gap={8}>
          {projectData.map((project) => (
            <Box
              key={project.id}
              position="relative"
              overflow="hidden"
              borderRadius="lg"
              boxShadow="lg"
              bg="gray.100"
              transition="transform 0.3s ease"
              _hover={{ transform: 'scale(1.05)' }}
            >
              <Image
                src={project.imageUrl}
                alt={project.title}
                objectFit="cover"
                w="100%"
                h="200px"
                transition="opacity 0.3s ease"
                _hover={{ opacity: 0.8 }}
              />
              <Stack p={4} textAlign="center" bg="white">
                <Heading as="h3" size="md" color="purple.600">
                  {project.title}
                </Heading>
                <Text fontSize="sm" color="gray.600">
                  {project.description}
                </Text>
              </Stack>
              <Box
                position="absolute"
                top="0"
                right="0"
                bottom="0"
                left="0"
                display="flex"
                alignItems="center"
                justifyContent="center"
                opacity={0}
                transition="opacity 1s ease"
                bg="rgba(173, 216, 230, 0.4)"  
                _hover={{ opacity: 1 }}
              >
                <Button colorScheme="purple" size="md">
                  Explore More
                </Button>
              </Box>
            </Box>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Part_2;

import React from 'react';
import { Box, Grid, Text, VStack, Image } from '@chakra-ui/react';

// Example data array with 12 properties
const properties = Array.from({ length: 6 }, (_, index) => ({
  id: index + 1,
  title: `Property ${index + 1}`,
  location: `Location ${index + 1}`,
  price: `$${(index + 1) * 100000}`,
  imageUrl: 'https://via.placeholder.com/150', 
}));

const Part_2 = () => {
  return (
    <Box p={4}>
      <Text fontSize="2xl" mb={4} fontWeight="bold">
        Similar Properties
      </Text>
      <Grid 
        templateColumns="repeat(auto-fill, minmax(250px, 1fr))" 
        gap={4} 
        autoRows="max-content"
      >
        {properties.map((property) => (
          <Box
            key={property.id}
            borderWidth="1px"
            borderRadius="md"
            overflow="hidden"
            p={4}
            boxShadow="md"
          >
            <Image src={property.imageUrl} alt={property.title} w="full" h="150px" objectFit="cover" />
            <VStack align="start" mt={2}>
              <Text fontWeight="bold">{property.title}</Text>
              <Text color="gray.600">{property.location}</Text>
              <Text fontSize="lg" fontWeight="semibold">{property.price}</Text>
            </VStack>
          </Box>
        ))}
      </Grid>
    </Box>
  );
};

export default Part_2;

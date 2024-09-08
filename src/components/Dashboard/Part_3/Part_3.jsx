import React from 'react';
import { Box, Container, Grid, Heading, Text, Image, Link, Stack, Divider } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';

const propertyData = [
  { id: 1, title: 'Luxury Villa', description: 'A beautiful luxury villa with modern amenities and a spacious garden.', imageUrl: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994' },
  { id: 2, title: 'Cozy Cottage', description: 'A charming cottage perfect for a quiet getaway, surrounded by nature.', imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c' },
];

const Part_3 = () => {
  return (
    <Box w="80vw" mx="auto" p={5} mt={5}>
      <Container maxW="container.xl">
        {/* Attractive Heading */}
        <Heading as="h2" size="2xl" mb={10} textAlign="center" color="blue.600" textTransform="uppercase" letterSpacing="widest">
          Discover Your Dream Home
        </Heading>

        {propertyData.map((property, index) => (
          <React.Fragment key={property.id}>
            <Grid
              templateColumns={{ base: '1fr', md: index % 2 === 0 ? '1fr 1fr' : '1fr 1fr' }}
              gap={6}
              alignItems="center"
              mb={8}
            >
              {index % 2 === 0 ? (
                <>
                  <Image
                    src={property.imageUrl}
                    alt={property.title}
                    borderRadius="lg"
                    boxShadow="md"
                    height="400px"
                    width="100%"
                    objectFit="cover"
                  />
                  <Stack spacing={4}>
                    <Heading as="h3" size="lg" color="blue.700">{property.title}</Heading>
                    <Text fontSize="md" color="gray.700">{property.description}</Text>
                  </Stack>
                </>
              ) : (
                <>
                  <Stack spacing={4}>
                    <Heading as="h3" size="lg" color="blue.700">{property.title}</Heading>
                    <Text fontSize="md" color="gray.700">{property.description}</Text>
                  </Stack>
                  <Image
                    src={property.imageUrl}
                    alt={property.title}
                    borderRadius="lg"
                    boxShadow="md"
                    height="400px"
                    width="100%"
                    objectFit="cover"
                  />
                </>
              )}
            </Grid>
            
            {/* Separation Line */}
            <Box textAlign="center" my={2} position="relative">
              <Divider borderColor="gray.300" />
            </Box>
          </React.Fragment>
        ))}
        
        {/* Single Explore More Link at the End */}
        <Box textAlign="center" mt={1}>
          <Link href="/" color="blue.500" fontSize="lg" textDecoration="none" display="flex" alignItems="center" justifyContent="center">
            Explore More <ChevronDownIcon ml={2} />
          </Link>
        </Box>
      </Container>
    </Box>
  );
};

export default Part_3;

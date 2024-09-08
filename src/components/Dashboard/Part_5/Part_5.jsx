import React from 'react';
import { Box, Container, Heading, Text, Image, useBreakpointValue } from '@chakra-ui/react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Testimonial data
const testimonials = [
    { id: 1, name: 'John Doe', text: 'Great service, highly recommend!', imageUrl: 'https://images.pexels.com/photos/39866/entrepreneur-startup-start-up-man-39866.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { id: 2, name: 'Jane Smith', text: 'Amazing experience, very professional.', imageUrl: 'https://images.pexels.com/photos/762080/pexels-photo-762080.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { id: 3, name: 'Emily Johnson', text: 'The best company to work with.', imageUrl: 'https://images.pexels.com/photos/886285/pexels-photo-886285.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { id: 4, name: 'Michael Brown', text: 'Exceptional quality and service.', imageUrl: 'https://images.pexels.com/photos/713520/pexels-photo-713520.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { id: 5, name: 'Sarah Davis', text: 'I’m extremely satisfied with their work.', imageUrl: 'https://images.pexels.com/photos/774866/pexels-photo-774866.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { id: 6, name: 'David Wilson', text: 'A+ experience from start to finish.', imageUrl: 'https://images.pexels.com/photos/813940/pexels-photo-813940.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { id: 7, name: 'Jessica Martinez', text: 'Reliable and trustworthy company.', imageUrl: 'https://images.pexels.com/photos/39866/entrepreneur-startup-start-up-man-39866.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { id: 8, name: 'Daniel Garcia', text: 'High quality and timely delivery.', imageUrl: 'https://images.pexels.com/photos/762080/pexels-photo-762080.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { id: 9, name: 'Laura Lee', text: 'I would definitely use them again.', imageUrl: 'https://images.pexels.com/photos/886285/pexels-photo-886285.jpeg?auto=compress&cs=tinysrgb&w=600' },
];

const Part_5 = () => {
  // Responsive settings
  const slidesToShow = useBreakpointValue({ base: 1, md: 2, lg: 3 });

  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
    centerMode: true,
    centerPadding: '0', 
  };

  return (
    <Box w="98.6vw" py={10} bg="gray.50" mx="auto" overflow="hidden">
      <Container maxW="container.xl">
        {/* Section Heading */}
        <Heading
          as="h2"
          size="xl"
          mb={6}
          textAlign="center"
          color="blue.500"
        >
          What Our Customers Say
        </Heading>

        {/* Slider */}
        <Slider {...settings}>
          {testimonials.map((testimonial) => (
            <Box
              key={testimonial.id}
              p={6}
              bg="white"
              borderRadius="lg"
              boxShadow="lg"
              textAlign="center"
              mx={4} 
              my={4} 
              border="1px solid"
              borderColor="gray.200"
              overflow="hidden"
              maxW="400px"
              transition="transform 0.3s ease"
              className="testimonial-card"
            >
              <Image
                src={testimonial.imageUrl}
                alt={testimonial.name}
                borderRadius="full"
                boxSize="120px"
                mx="auto"
                mb={4}
                objectFit="cover"
              />
              <Text fontSize="lg" mb={2} fontWeight="bold">
                {testimonial.name}
              </Text>
              <Text fontSize="md" color="gray.600">
                "{testimonial.text}"
              </Text>
            </Box>
          ))}
        </Slider>

        {/* Add custom CSS for center card */}
        <style jsx>{`
          .slick-slide {
            transition: transform 0.3s ease;
          }

          .slick-center .testimonial-card {
            max-width: 400px; // Larger width for the center card
          }

          .slick-slide:not(.slick-center) .testimonial-card {
            transform: scale(0.8); 
          }
        `}</style>
      </Container>
    </Box>
  );
};

export default Part_5;

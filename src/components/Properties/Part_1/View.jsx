import React from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  Image,
  Stack,
  Button,
  HStack,
  Flex,
} from "@chakra-ui/react";
import Slider from "react-slick";
import { MdLocationOn, MdHome, MdAspectRatio } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <Button
      className={className}
      style={{
        ...style,
        background: "rgba(0, 0, 0, 0.1)",
        width: "40px",
        height: "98%",
        zIndex: 2,
        top: "49.1%",
        right: "1px",
        transform: "translateY(-50%)",
        position: "absolute",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      onClick={onClick}
    ></Button>
  );
};

const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <Button
      className={className}
      style={{
        ...style,
        background: "rgba(0, 0, 0, 0.1)",
        width: "40px",
        height: "98%",
        zIndex: 2,
        top: "49.1%",
        left: "1px",
        transform: "translateY(-50%)",
        position: "absolute",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      onClick={onClick}
    ></Button>
  );
};

const View = ({ propertyData, totalPages, currentPage, onPageChange }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  const navigate = useNavigate();

  const handleFirstPage = () => onPageChange(1);
  const handleLastPage = () => onPageChange(totalPages);
  const handleNextPage = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };
  const handlePrevPage = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const renderPaginationButtons = () => {
    const pages = [];

    if (currentPage > 2) {
      pages.push(
        <Button key="first" onClick={handleFirstPage}>
          First
        </Button>
      );
    }

    if (currentPage > 1) {
      pages.push(
        <Button key="prev" onClick={handlePrevPage}>
          Previous
        </Button>
      );
    }

    const pageRange = 3;
    let startPage = Math.max(1, currentPage - pageRange);
    let endPage = Math.min(totalPages, currentPage + pageRange);

    if (startPage > 1) {
      pages.push(
        <Button key="1" onClick={() => onPageChange(1)}>
          1
        </Button>
      );
      if (startPage > 2) {
        pages.push(<Text key="dots1">...</Text>);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <Button
          key={i}
          onClick={() => onPageChange(i)}
          colorScheme={i === currentPage ? "teal" : undefined}
          disabled={i === currentPage}
        >
          {i}
        </Button>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(<Text key="dots2">...</Text>);
      }
      pages.push(
        <Button key={totalPages} onClick={() => onPageChange(totalPages)}>
          {totalPages}
        </Button>
      );
    }

    if (currentPage < totalPages) {
      pages.push(
        <Button key="next" onClick={handleNextPage}>
          Next
        </Button>
      );
    }

    if (totalPages > 2) {
      pages.push(
        <Button key="last" onClick={handleLastPage}>
          Last
        </Button>
      );
    }

    return pages;
  };

  const handleViewDetails = (propertyId) => {
    navigate(`/property/${propertyId}`);
  };

  return (
    <Container maxW="80vw" py={5}>
      {propertyData.map((property) => (
        <Box
          key={property._id}
          borderRadius="lg"
          overflow="hidden"
          mb={6}
          bg="white"
          boxShadow="lg"
          width="100%"
          mx="auto"
          p={6}
          position="relative"
        >
          <Flex
            direction={{ base: "column", md: "row" }}
            align="stretch"
            gap={6}
          >
            <Box
              flex="1"
              mb={{ base: 4, md: 0 }}
              width={{ base: "100%", md: "50%" }}
            >
              <Slider {...settings}>
                {property.media.length > 0 ? (
                  property.media.map((image, index) => (
                    <Box
                      key={index}
                      height="auto"
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Image
                        src={image}
                        alt={`Property ${property._id} image ${index + 1}`}
                        width="100%"
                        height="auto"
                        objectFit="cover"
                        objectPosition="center"
                      />
                    </Box>
                  ))
                ) : (
                  <Text>No images available</Text>
                )}
              </Slider>
            </Box>

            <Box
              flex="1"
              px={{ base: 4, md: 10 }}
              py={4}
              display="flex"
              flexDirection="column"
              justifyContent="center"
              width={{ base: "100%", md: "50%" }}
            >
              <Stack spacing={4}>
                <Heading fontSize="2xl" fontWeight="bold" color="teal.500">
                  {property.projectName}
                </Heading>
                <Text fontSize="lg" fontWeight="medium">
                  <MdHome color="teal.600" mr={2} fontSize={25} />
                  {property.property}
                </Text>
                <Text fontSize="lg" color="gray.700">
                  <MdLocationOn color="teal.600" mr={2} fontSize={25} />
                  {property.address}
                </Text>
                <Text fontSize="lg" color="gray.700">
                  <MdAspectRatio color="teal.600" mr={2} fontSize={25} />
                  Size: {property.size}
                </Text>
                <Text fontSize="lg" fontWeight="bold" color="teal.600">
                  Property Type: {property.propertyType}
                </Text>
              </Stack>
              <Button
                mt={5}
                bg="blue.400"
                maxW="200px"
                color="white"
                cursor="pointer"
                _hover={{ transform: "scale(1.05)" }}
                onClick={() => handleViewDetails(property._id)}
              >
                View More Details
              </Button>
            </Box>
          </Flex>
        </Box>
      ))}

      <HStack spacing={4} justifyContent="center" mt={6}>
        {renderPaginationButtons()}
      </HStack>
    </Container>
  );
};

export default View;

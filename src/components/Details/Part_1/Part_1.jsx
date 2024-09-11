import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  Image,
  Stack,
  Button,
  useBreakpointValue,
  Icon,
  HStack,
} from "@chakra-ui/react";
import { MdLocationOn, MdHome, MdAspectRatio } from "react-icons/md";
import Slider from "react-slick";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAllpropertyData,
  selectpropertyData,
  selectpropertyError,
  selectpropertyLoading,
  selectTotalPages,
  selectCurrentPage,
} from "../../../app/Slices/propertiesSlice";
import { useNavigate } from "react-router-dom";
import Loader from "../../Not_Found/Loader";
import Error502 from "../../Not_Found/Error502";
import NoData from "../../Not_Found/NoData";

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

const Part_1 = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const isSmallScreen = useBreakpointValue({ base: true, md: false });

  const propertyData = useSelector(selectpropertyData);
  const propertyError = useSelector(selectpropertyError);
  const propertyLoading = useSelector(selectpropertyLoading);
  const totalPages = useSelector(selectTotalPages);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchAllpropertyData(currentPage));
  }, [dispatch, currentPage]);

  if (propertyError) {
    return <Error502 />;
  }

  if (propertyLoading) {
    return <Loader />;
  }

  if (propertyData.length == 0) {
    return <NoData />;
  }

  const handleFirstPage = () => setCurrentPage(1);
  const handleLastPage = () => setCurrentPage(totalPages);
  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };
  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
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
        <Button key="1" onClick={() => setCurrentPage(1)}>
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
          onClick={() => setCurrentPage(i)}
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
        <Button key={totalPages} onClick={() => setCurrentPage(totalPages)}>
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

  return (
    <Container maxW="100vw" py={5}>
      {propertyData.map((property) => (
        <Box
          key={property._id}
          borderRadius="lg"
          overflow="hidden"
          mb={6}
          bg="white"
          boxShadow="lg"
          maxW="80vw"
          mx="auto"
          p={6}
          display="flex"
          flexDirection={isSmallScreen ? "column" : "row"}
          alignItems="stretch"
          position="relative"
          justifyContent="space-between"
        >
          <Box
            flex="1"
            maxW={isSmallScreen ? "100%" : "50%"}
            mb={isSmallScreen ? 4 : 0}
            position="relative"
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
            px={10}
            py={4}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            maxW={isSmallScreen ? "100%" : "50%"}
            borderRadius="md"
          >
            <Stack spacing={4}>
              <Heading fontSize="2xl" fontWeight="bold" color="teal.500">
                {property.projectName}
              </Heading>
              <Text fontSize="lg" fontWeight="medium">
                <Icon as={MdHome} color="teal.600" mr={2} fontSize={25} />
                {property.property}
              </Text>
              <Text fontSize="lg" color="gray.700">
                <Icon as={MdLocationOn} color="teal.600" mr={2} fontSize={25} />
                {property.address}
              </Text>
              <Text fontSize="lg" color="gray.700">
                <Icon
                  as={MdAspectRatio}
                  color="teal.600"
                  mr={2}
                  fontSize={25}
                />
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
              onClick={() => navigate(`/property/${property._id}`)} // Updated navigation
            >
              View More Details
            </Button>
          </Box>
        </Box>
      ))}

      <HStack spacing={4} justifyContent="center" mt={6}>
        {renderPaginationButtons()}
      </HStack>
    </Container>
  );
};

export default Part_1;

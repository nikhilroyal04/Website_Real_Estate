import React, { useEffect } from "react";
import {
  Box,
  Container,
  Text,
  Image,
  Stack,
  Button,
  useBreakpointValue,
} from "@chakra-ui/react";
import Slider from "react-slick";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAllpropertyData,
  selectpropertyData,
  selectpropertyError,
  selectpropertyLoading,
} from "../../../app/Slices/propertiesSlice";
import Loader from "../../Not_Found/Loader";
import Error502 from "../../Not_Found/Error502";

const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <Button
      className={className}
      style={{
        ...style,
        background: "rgba(0, 0, 0, 0.1)", // Semi-transparent background
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
    >
      {/* <span style={{ color: '#fff', fontSize: '20px' }}>&#x276F;</span> Right arrow character */}
    </Button>
  );
};

const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <Button
      className={className}
      style={{
        ...style,
        background: "rgba(0, 0, 0, 0.1)", // Semi-transparent background
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
    >
      {/* <span style={{ color: '#fff', fontSize: '20px' }}>&#x276E;</span> Left arrow character */}
    </Button>
  );
};

const Part_1 = () => {
  const isSmallScreen = useBreakpointValue({ base: true, md: false });

  const propertyData = useSelector(selectpropertyData);
  const propertyError = useSelector(selectpropertyError);
  const propertyLoading = useSelector(selectpropertyLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllpropertyData());
  }, [dispatch]);

  if (propertyError) {
    return <Error502 />;
  }

  if (propertyLoading) {
    return <Loader />;
  }

  // Carousel settings
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
    <Container maxW="container.xl" py={8}>
      {propertyData.map((property) => {
        // Convert JSON string to array
        const usps = JSON.parse(property.usp || "[]");
        const facilities = JSON.parse(property.facility || "[]");

        return (
          <Box
            key={property.id}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            mb={6}
            bg="white"
            boxShadow="md"
            p={4}
            display="flex"
            flexDirection={isSmallScreen ? "column" : "row"}
            alignItems="stretch"
            position="relative"
          >
            {/* Images Section */}
            <Box
              flex="1"
              maxW={isSmallScreen ? "100%" : "50%"}
              height={isSmallScreen ? "auto" : "auto"}
              mb={isSmallScreen ? 4 : 0}
              position="relative"
            >
              <Slider {...settings}>
                {property.media.map((image, index) => (
                  <Box
                    key={index}
                    height="auto"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Image
                      src={image}
                      alt={`Property ${property.id} image ${index + 1}`}
                      width="100%"
                      height="auto"
                      objectFit="cover"
                      objectPosition="center"
                    />
                  </Box>
                ))}
              </Slider>
            </Box>

            {/* Details Section */}
            <Box
              flex="1"
              px={4}
              display="flex"
              flexDirection="column"
              justifyContent="center"
              height={isSmallScreen ? "auto" : "auto"}
            >
              <Stack spacing={3}>
                <Text fontSize="xl" fontWeight="bold">
                  {property.projectName}
                </Text>
                <Text fontSize="md" color="gray.600">
                  {property.property}
                </Text>
                <Text fontSize="md" color="gray.600">
                  {property.location}
                </Text>
                <Text fontSize="md" color="gray.600">
                  {property.address}
                </Text>
                <Text fontSize="lg" color="teal.600" fontWeight="bold">
                  {property.price}{" "}
                  {/* Assuming price is part of property data */}
                </Text>
                {/* USPs Section */}
                {usps.length > 0 && (
                  <Stack spacing={2} mt={4}>
                    <Text fontSize="xl" fontWeight="bold">
                      Features
                    </Text>
                    {usps.map((usp, index) => (
                      <Text key={index} fontSize="md" color="gray.800">
                        - {usp}
                      </Text>
                    ))}
                  </Stack>
                )}
                {facilities.length > 0 && (
                  <Stack spacing={2} mt={4}>
                    <Text fontSize="xl" fontWeight="bold">
                      Facility
                    </Text>
                    {facilities.map((facility, index) => (
                      <Text key={index} fontSize="md" color="gray.800">
                        - {facility}
                      </Text>
                    ))}
                  </Stack>
                )}
              </Stack>
            </Box>
          </Box>
        );
      })}
    </Container>
  );
};

export default Part_1;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchPropertyById,
  selectPropertyById,
  selectpropertyError,
  selectpropertyLoading,
} from "../../../app/Slices/propertiesSlice";
import Loader from "../../Not_Found/Loader";
import Error502 from "../../Not_Found/Error502";
import NoData from "../../Not_Found/NoData";
import {
  Box,
  Container,
  Heading,
  Text,
  Stack,
  Icon,
  SimpleGrid,
  List,
  ListItem,
  Button,
} from "@chakra-ui/react";
import {
  MdLocationOn,
  MdHome,
  MdAspectRatio,
  MdAttachMoney,
} from "react-icons/md";
import Slider from "react-slick";

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

const PropertyDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const property = useSelector(selectPropertyById);
  const isLoading = useSelector(selectpropertyLoading);
  const error = useSelector(selectpropertyError);

  useEffect(() => {
    if (id) {
      dispatch(fetchPropertyById(id));
    }
  }, [dispatch, id]);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <Error502 />;
  }

  if (!property) {
    return <NoData />;
  }

  const sliderSettings = {
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

  const parseJSON = (str) => {
    try {
      return JSON.parse(str);
    } catch (error) {
      return [];
    }
  };

  return (
    <Container maxW="80vw" py={8}>
      <Box
        borderRadius="lg"
        overflow="hidden"
        mb={8}
        bg="white"
        boxShadow="lg"
        p={8}
        display="flex"
        flexDirection="column"
        alignItems="stretch"
        mx="auto"
      >
        {/* Image Slider */}
        <Box maxW="100%">
          <Slider {...sliderSettings}>
            {property.media.length > 0 ? (
              property.media.map((image, index) => (
                <Box
                  key={index}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <img
                    src={image}
                    alt={`Property ${property._id} image ${index + 1}`}
                    style={{
                      width: "100%",
                      height: "70vh",
                      objectFit: "cover",
                    }}
                  />
                </Box>
              ))
            ) : (
              <Text>No images available</Text>
            )}
          </Slider>
        </Box>

        {/* Property Information */}
        <Stack spacing={6} mt={8}>
          <Heading fontSize="3xl" fontWeight="bold" color="teal.600">
            {property.projectName}
          </Heading>
          <SimpleGrid columns={[1, null, 2]} spacing={6}>
            <Box>
              <Text fontSize="xl" fontWeight="medium">
                <Icon as={MdHome} color="teal.600" mr={3} fontSize={28} />
                {property.propertySubtype} for {property.propertyFor}
              </Text>
              <Text fontSize="xl" color="gray.700">
                <Icon as={MdLocationOn} color="teal.600" mr={3} fontSize={28} />
                {property.address}, {property.location}
              </Text>
              <Text fontSize="xl" color="gray.700">
                <Icon
                  as={MdAspectRatio}
                  color="teal.600"
                  mr={3}
                  fontSize={28}
                />
                Size: {property.size}
              </Text>
            </Box>
            <Box>
              <Text fontSize="xl" fontWeight="bold" color="teal.600">
                Price: {property.offeredCost}
              </Text>
              <Text fontSize="xl" fontWeight="bold" color="teal.600">
                RERA Approved: {property.reraApproved ? "Yes" : "No"} (
                {property.reraNo})
              </Text>
            </Box>
          </SimpleGrid>

           {/* Unique Selling Points */}
           <Box>
            <Heading fontSize="2xl" fontWeight="bold" color="teal.500" mb={4}>
              Why choose this ?
            </Heading>
            <List spacing={2}>
              {parseJSON(property.usp).map((usp, idx) => (
                <ListItem key={idx}>- {usp}</ListItem>
              ))}
            </List>
          </Box>

          {/* Facility and Connectivity */}
          <Box>
           
            <SimpleGrid columns={[1, 2, 2]} spacing={5}>
              <Box>
                <Heading fontSize="lg" color="teal.500" mb={2}>
                  Facility
                </Heading>
                <List spacing={2}>
                  {parseJSON(property.facility).map((item, idx) => (
                    <ListItem key={idx}>- {item}</ListItem>
                  ))}
                </List>
              </Box>
              <Box>
                <Heading fontSize="lg" color="teal.500" mb={2}>
                  Connectivity
                </Heading>
                <List spacing={2}>
                  {parseJSON(property.connectivity).map((item, idx) => (
                    <ListItem key={idx}>- {item}</ListItem>
                  ))}
                </List>
              </Box>
            </SimpleGrid>
          </Box>

        </Stack>
      </Box>
    </Container>
  );
};

export default PropertyDetails;

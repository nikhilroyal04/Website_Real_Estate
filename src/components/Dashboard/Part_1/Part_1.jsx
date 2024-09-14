import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Flex,
  HStack,
  Input,
  Button,
  Select,
  Tabs,
  TabList,
  Tab,
  useBreakpointValue,
  Text,
  VStack,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { FaMapLocationDot } from "react-icons/fa6";
import Part_1_Image from "../../../assets/images/Part_1.jpg";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAllpropertyData,
  selectpropertyData,
  selectpropertyError,
  selectpropertyLoading,
} from "../../../app/Slices/propertiesSlice";
import { MdArrowOutward } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Fetch201 from "../../Not_Found/Fetch201";

const Part_1 = () => {
  const isSmallScreen = useBreakpointValue({ base: true, md: false });
  const [searchTerm, setSearchTerm] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [selectedTab, setSelectedTab] = useState("Buy");
  const [filteredProperties, setFilteredProperties] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const propertyData = useSelector(selectpropertyData);
  const propertyError = useSelector(selectpropertyError);
  const propertyLoading = useSelector(selectpropertyLoading);

  useEffect(() => {
    if (searchTerm.trim()) {
      dispatch(
        fetchAllpropertyData(1, "", searchTerm, propertyType, selectedTab)
      );
    }
  }, [dispatch, searchTerm, propertyType, selectedTab]);

  useEffect(() => {
    if (!propertyLoading && !propertyError) {
      setFilteredProperties(propertyData);
    }
  }, [propertyData, propertyLoading, propertyError]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleTypeChange = (event) => {
    setPropertyType(event.target.value);
  };

  const handleTabChange = (index) => {
    const tabNames = ["Buy", "Rent", "PG/Co-Living"];
    setSelectedTab(tabNames[index]);
  };

  const showError = propertyError;
  const isLoading = propertyLoading;

  const topProperties = filteredProperties.slice(0, 4);

  // Construct URL with query parameters
  const createQueryString = (filters) => {
    const params = new URLSearchParams(filters);
    return params.toString();
  };

  const handlePropertyClick = (property) => {
    const filters = {
      location: searchTerm,
      propertyFor: selectedTab,
      propertyType,
    };
    const queryString = createQueryString(filters);

    // Pass property details as state
    navigate(`/property/?${queryString}`, {
      state: {
        searchTerm,
        propertyType,
        selectedTab,
      },
    });
  };

  return (
    <Box position="relative" w="100%" h="89vh">
      <Box
        as="img"
        src={Part_1_Image}
        alt="Background"
        objectFit="cover"
        w="100%"
        h="100%"
        position="absolute"
        top={0}
        left={0}
        zIndex={-1}
      />
      <Container
        maxW="container.xl"
        h="100%"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        p={4}
      >
        <Box
          bg="rgba(255, 255, 255, 0.8)"
          borderRadius="lg"
          boxShadow="lg"
          p={4}
          maxW={isSmallScreen ? "90%" : "100%"}
          display="flex"
          flexDirection="column"
          alignItems="center"
          _hover={{ transform: "scale(1.02)" }}
          transition="transform 0.3s ease"
        >
          <HStack spacing={4} mb={4} width="100%">
            <Tabs
              variant="enclosed"
              colorScheme="teal"
              onChange={handleTabChange}
            >
              <TabList>
                <Tab fontWeight="bold">Buy</Tab>
                <Tab fontWeight="bold">Rent</Tab>
                <Tab fontWeight="bold">PG/Co-Living</Tab>
              </TabList>
            </Tabs>
          </HStack>
          <Flex width="100%" alignItems="center" direction="row">
            <Select
              placeholder="Type"
              width="150px"
              mr={4}
              display={isSmallScreen ? "none" : "block"}
              border="2px solid #b8b8b8"
              borderRadius="md"
              fontWeight="bold"
              onChange={handleTypeChange}
            >
              <option value="">All Types</option>
              <option value="Commercial">Commercial</option>
              <option value="Residential">Residential</option>
              <option value="Other">Other</option>
            </Select>
            <Input
              placeholder="Search for the details..."
              flex="1"
              border="2px solid #b8b8b8"
              mr={4}
              width={{ base: "100%", md: "600px" }}
              borderRadius="md"
              value={searchTerm}
              onChange={handleSearch}
            />
            <Button
              colorScheme="teal"
              rightIcon={<SearchIcon />}
              border="1px solid #d1d1d1"
              borderRadius="md"
            >
              Search
            </Button>
          </Flex>
          {isLoading && (
            <Flex
              direction="column"
              justify="center"
              alignItems="center"
              mt={4}
              width="100%"
            >
              <Fetch201 />
            </Flex>
          )}
          {showError && !isLoading && (
            <Text mt={4} color="red.500" fontWeight="bold">
              Unable to fetch data. Please try again later.
            </Text>
          )}
        </Box>

        <Box
          borderRadius="lg"
          boxShadow="md"
          p={2}
          maxW={isSmallScreen ? "90%" : "100%"}
          display="flex"
          flexDirection="column"
          alignItems="center"
          width={900}
        >
          {isLoading ? null : searchTerm.trim() === "" ? (
            <Text fontSize="lg" fontWeight="bold" color="gray.700"></Text>
          ) : filteredProperties.length === 0 ? (
            <Flex
              direction="column"
              justify="center"
              alignItems="center"
              height="100%"
              width="100%"
            >
              <Text fontSize="xl" fontWeight="bold" color="red">
                No properties found
              </Text>
            </Flex>
          ) : (
            <VStack spacing={4} mt={6} align="center" w="100%" maxH="55vh">
              {topProperties.length > 0 ? (
                topProperties.map((property) => (
                  <Box
                    key={property._id}
                    borderWidth="1px"
                    borderRadius="xl"
                    p={3}
                    bg="rgba(255, 255, 255, 0.5)"
                    shadow="md"
                    width="90%"
                    display="flex"
                    alignItems="center"
                    onClick={() => handlePropertyClick(property)}
                    _hover={{
                      transform: "scale(1.02)",
                      transition: "transform 0.3s ease",
                      cursor: "pointer",
                    }}
                  >
                    <FaMapLocationDot
                      fontSize="24px"
                      style={{ marginRight: 20 }}
                    />
                    <Flex
                      width="90%"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Box>
                        <Text fontWeight="bold">
                          {property.propertySubtype} in {property.location}
                        </Text>
                        <Text>{property.subLocation}</Text>
                      </Box>
                      <Box>
                        <MdArrowOutward fontSize={25} />
                      </Box>
                    </Flex>
                  </Box>
                ))
              ) : (
                <Text fontSize="lg" fontWeight="bold" color="gray.700">
                  No properties found
                </Text>
              )}
            </VStack>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default Part_1;

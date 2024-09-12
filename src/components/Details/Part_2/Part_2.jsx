import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Input,
  Grid,
  Button,
  useBreakpointValue,
  Stack,
} from "@chakra-ui/react";
import Select from "react-select";
import { useDispatch } from "react-redux";
import { fetchAllpropertyData } from "../../../app/Slices/propertiesSlice";
import { RxCross2 } from "react-icons/rx";
import { CiFilter } from "react-icons/ci";

export default function Part_2() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  // Extract query parameters from URL
  const params = new URLSearchParams(location.search);
  const [locationFilter, setLocation] = useState(params.get('location') || "");
  const [subLocation, setSubLocation] = useState(params.get('subLocation') || "");
  const [propertyFor, setPropertyFor] = useState(params.get('propertyFor') || "");
  const [propertyType, setPropertyType] = useState(params.get('propertyType') || "");
  const [propertySubtype, setPropertySubtype] = useState(params.get('propertySubtype') || "");

  // Custom styles for react-select
  const customStyles = {
    control: (base) => ({
      ...base,
      borderRadius: "30px",
      padding: "2px",
      borderColor: "#CBD5E0",
      boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
      "&:hover": {
        borderColor: "#319795",
      },
    }),
    menu: (base) => ({
      ...base,
      borderRadius: "15px",
      overflow: "hidden",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      zIndex: 2000,
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#E6FFFA" : "white",
      color: "black",
      padding: "10px",
      "&:hover": {
        backgroundColor: "#B2F5EA",
      },
    }),
  };

  // Fetch property data based on filters
  useEffect(() => {
    dispatch(
      fetchAllpropertyData(
        1,
        "",
        locationFilter,
        subLocation,
        propertyFor,
        propertyType,
        propertySubtype
      )
    );
  }, [dispatch, locationFilter, subLocation, propertyFor, propertyType, propertySubtype]);

  // Handle filter change
  const handleFilterChange = (filterName, value) => {
    switch (filterName) {
      case "location":
        setLocation(value);
        break;
      case "subLocation":
        setSubLocation(value);
        break;
      case "propertyFor":
        setPropertyFor(value);
        break;
      case "propertyType":
        setPropertyType(value);
        break;
      case "propertySubtype":
        setPropertySubtype(value);
        break;
      default:
        break;
    }
  };

  // Reset all filters
  const handleResetFilters = () => {
    setLocation("");
    setSubLocation("");
    setPropertyFor("");
    setPropertyType("");
    setPropertySubtype("");
    // Update URL to remove filters
    navigate({ search: "" });
  };

  // Apply filters and update URL
  const handleApplyFilters = () => {
    const query = new URLSearchParams({
      location: locationFilter,
      subLocation: subLocation,
      propertyFor: propertyFor,
      propertyType: propertyType,
      propertySubtype: propertySubtype,
    }).toString();

    // Update URL with the new filters
    navigate({ search: `?${query}` });

    // Fetch data based on new filters
    dispatch(
      fetchAllpropertyData(
        1,
        "",
        locationFilter,
        subLocation,
        propertyFor,
        propertyType,
        propertySubtype
      )
    );
  };

  const isSmallScreen = useBreakpointValue({ base: true, md: false });

  return (
    <Box p={5} borderRadius="md" maxWidth="100vw" mx="auto" position="relative">
      {isSmallScreen ? (
        <>
          <Stack spacing={2} direction="row" align="center" mb={4}>
            <Input
              placeholder="Enter Location"
              borderRadius="full"
              bg="white"
              boxShadow="sm"
              _hover={{ boxShadow: "md" }}
              value={locationFilter}
              onChange={(e) => handleFilterChange("location", e.target.value)}
            />
            <Button
              bg="blue.100"
              onClick={handleApplyFilters}
              leftIcon={<CiFilter />}
              maxW="100%"
              width="130px"
            >
              Filters
            </Button>
          </Stack>
        </>
      ) : (
        <Grid
          templateColumns={{
            base: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(4, 1fr)",
            xl: "repeat(6, 1fr)",
          }}
          gap={6}
          maxW="90vw"
          mx="auto"
        >
          <Input
            placeholder="Enter Location"
            borderRadius="full"
            bg="white"
            boxShadow="sm"
            _hover={{ boxShadow: "md" }}
            value={locationFilter}
            onChange={(e) => handleFilterChange("location", e.target.value)}
          />
          <Input
            placeholder="Enter Sub-location"
            borderRadius="full"
            bg="white"
            boxShadow="sm"
            _hover={{ boxShadow: "md" }}
            value={subLocation}
            onChange={(e) => handleFilterChange("subLocation", e.target.value)}
          />
          <Select
            placeholder="Property For"
            options={[
              { value: "Buy", label: "Buy" },
              { value: "Rent", label: "Rent" },
              { value: "PG/Co-Living", label: "PG/Co-Living" },
              { value: "Other", label: "Other" },
            ]}
            styles={customStyles}
            value={propertyFor ? { value: propertyFor, label: propertyFor } : null}
            onChange={(option) =>
              handleFilterChange("propertyFor", option ? option.value : "")
            }
          />
          <Select
            placeholder="Property Type"
            options={[
              { value: "Commercial", label: "Commercial" },
              { value: "Residential", label: "Residential" },
              { value: "Other", label: "Other" },
            ]}
            styles={customStyles}
            value={propertyType ? { value: propertyType, label: propertyType } : null}
            onChange={(option) =>
              handleFilterChange("propertyType", option ? option.value : "")
            }
          />
          <Select
            placeholder="Property Subtype"
            options={[
              { value: "Mall", label: "Mall" },
              { value: "High Street Market", label: "High Street Market" },
              { value: "Shop", label: "Shop" },
              { value: "Farm House", label: "Farm House" },
              { value: "Flat", label: "Flat" },
              { value: "Other", label: "Other" },
            ]}
            styles={customStyles}
            value={propertySubtype ? { value: propertySubtype, label: propertySubtype } : null}
            onChange={(option) =>
              handleFilterChange("propertySubtype", option ? option.value : "")
            }
          />
          {!isSmallScreen && (
            <Button
              variant="ghost"
              bg="blue.50"
              border="2px solid gray"
              maxW="170px"
              onClick={handleResetFilters}
            >
              Reset all filters
            </Button>
          )}
        </Grid>
      )}
      <Box height="3px" bg="gray.300" my={4} />
    </Box>
  );
}

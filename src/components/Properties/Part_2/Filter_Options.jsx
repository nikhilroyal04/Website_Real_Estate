import React from "react";
import {
  Box,
  Input,
  Grid,
  Button,
  useBreakpointValue,
  Stack,
  useDisclosure,
  Menu,
  MenuList,
} from "@chakra-ui/react";
import Select from "react-select";
import { CiFilter } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";

const Filter_Options = ({ filters, setFilters }) => {
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

  const { isOpen, onOpen, onClose } = useDisclosure();

  const isSmallScreen = useBreakpointValue({ base: true, md: false });

  const handleFilterChange = (filterName, value) => {
    setFilters(filterName, value);
  };

  const handleResetFilters = () => {
    for (const key of Object.keys(filters)) {
      handleFilterChange(key, "");
    }
  };

  const handleApplyFilters = () => {
    onClose();
  };

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
              value={filters.location}
              onChange={(e) => handleFilterChange("location", e.target.value)}
            />
            <Button
              bg="blue.100"
              onClick={isOpen ? onClose : onOpen}
              leftIcon={<CiFilter />}
              maxW="100%"
              width="130px"
            >
              Filters
            </Button>
          </Stack>
          {isOpen && (
            <Menu isOpen={isOpen} onClose={onClose}>
              <MenuList
                position="absolute"
                top="100%"
                left="0"
                width="100vw"
                height="auto"
                maxWidth="100vw"
                bg="white"
                boxShadow="md"
                borderRadius="md"
                zIndex={2000}
              >
                <Box textAlign="right" mb={4} width="98vw">
                  <Button onClick={onClose} variant="ghost">
                    <RxCross2 fontSize={25} />
                  </Button>
                </Box>
                <Stack spacing={4} p={4}>
                  <Input
                    placeholder="Enter Location"
                    borderRadius="full"
                    bg="white"
                    boxShadow="sm"
                    _hover={{ boxShadow: "md" }}
                    value={filters.location}
                    onChange={(e) => handleFilterChange("location", e.target.value)}
                  />
                  <Input
                    placeholder="Enter Sub-location"
                    borderRadius="full"
                    bg="white"
                    boxShadow="sm"
                    _hover={{ boxShadow: "md" }}
                    value={filters.subLocation}
                    onChange={(e) => handleFilterChange("subLocation", e.target.value)}
                  />
                  <Select
                    placeholder="Property For"
                    options={[
                      { value: "Buy", label: "Buy" },
                      { value: "Rent", label: "Rent" },
                      { value: "PG/Co-Living", label: "PG/Co-living" },
                      { value: "Other", label: "Others" },
                    ]}
                    styles={customStyles}
                    value={
                      filters.propertyFor
                        ? { value: filters.propertyFor, label: filters.propertyFor }
                        : null
                    }
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
                    value={
                      filters.propertyType
                        ? { value: filters.propertyType, label: filters.propertyType }
                        : null
                    }
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
                    value={
                      filters.propertySubtype
                        ? { value: filters.propertySubtype, label: filters.propertySubtype }
                        : null
                    }
                    onChange={(option) =>
                      handleFilterChange("propertySubtype", option ? option.value : "")
                    }
                  />
                  <Stack direction="row" spacing={4}>
                    <Button colorScheme="teal" onClick={handleApplyFilters}>
                      Apply
                    </Button>
                    <Button colorScheme="gray" onClick={handleResetFilters}>
                      Reset
                    </Button>
                  </Stack>
                </Stack>
              </MenuList>
            </Menu>
          )}
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
            value={filters.location}
            onChange={(e) => handleFilterChange("location", e.target.value)}
          />
          <Input
            placeholder="Enter Sub-location"
            borderRadius="full"
            bg="white"
            boxShadow="sm"
            _hover={{ boxShadow: "md" }}
            value={filters.subLocation}
            onChange={(e) => handleFilterChange("subLocation", e.target.value)}
          />
          <Select
            placeholder="Property For"
            options={[
              { value: "Buy", label: "Buy" },
              { value: "Rent", label: "Rent" },
              { value: "PG/Co-Living", label: "PG/Co-living" },
              { value: "Other", label: "Others" },
            ]}
            styles={customStyles}
            value={
              filters.propertyFor
                ? { value: filters.propertyFor, label: filters.propertyFor }
                : null
            }
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
            value={
              filters.propertyType
                ? { value: filters.propertyType, label: filters.propertyType }
                : null
            }
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
            value={
              filters.propertySubtype
                ? { value: filters.propertySubtype, label: filters.propertySubtype }
                : null
            }
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
};

export default Filter_Options;

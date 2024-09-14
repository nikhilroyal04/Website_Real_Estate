import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Filter_Options from "./Part_2/Filter_Options";
import View from "./Part_1/View";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllpropertyData,
  selectpropertyData,
  selectTotalPages,
  selectpropertyLoading,
  selectpropertyError,
} from "../../app/Slices/propertiesSlice";
import Nodata from "../Not_Found/NoData";
import Loader from "../Not_Found/Loader";
import Error502 from "../Not_Found/Error502";

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Initialize filters with default values
  const [filters, setFilters] = useState({
    location: searchParams.get("location") || "",
    subLocation: searchParams.get("subLocation") || "",
    propertyFor: searchParams.get("propertyFor") || "",
    propertyType: searchParams.get("propertyType") || "",
    propertySubtype: searchParams.get("propertySubtype") || "",
  });

  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useDispatch();
  const propertyData = useSelector(selectpropertyData);
  const propertyError = useSelector(selectpropertyError);
  const propertyLoading = useSelector(selectpropertyLoading);
  const totalPages = useSelector(selectTotalPages);

  useEffect(() => {
    // Fetch data with current filters and page
    dispatch(
      fetchAllpropertyData(
        currentPage,
        "",
        filters.location,
        filters.subLocation,
        filters.propertyFor,
        filters.propertyType,
        filters.propertySubtype
      )
    );
  }, [dispatch, filters, currentPage]); 

  useEffect(() => {
    // Update URL parameters when filters or page change
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(filters)) {
      if (value) {
        params.set(key, value);
      }
    }
    params.set("page", currentPage);
    setSearchParams(params);
  }, [filters, currentPage, setSearchParams]);

  // Function to handle page changes
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    
    window.scrollTo({ top: 0, behavior: "smooth" });

  };

  const handleFilterChange = (filterName, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
    }));
    setCurrentPage(1); 
  };

  return (
    <div>
      {/* Always visible filters */}
      <Filter_Options filters={filters} setFilters={handleFilterChange} />
      
      {/* Conditional rendering for data states */}
      {propertyLoading && <Loader />}
      {propertyError && !propertyLoading && <Error502 />}
      {propertyData.length === 0 && !propertyLoading && !propertyError && <Nodata />}
      {propertyData.length > 0 && !propertyLoading && !propertyError && (
        <View
          propertyData={propertyData}
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange} 
        />
      )}
    </div>
  );
}

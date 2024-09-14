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

  const dispatch = useDispatch();
  const propertyData = useSelector(selectpropertyData);
  const propertyError = useSelector(selectpropertyError);
  const propertyLoading = useSelector(selectpropertyLoading);
  const totalPages = useSelector(selectTotalPages);

  useEffect(() => {
    // Fetch data for page 1 with current filters
    dispatch(
      fetchAllpropertyData(
        1,
        "",
        filters.location,
        filters.subLocation,
        filters.propertyFor,
        filters.propertyType,
        filters.propertySubtype
      )
    );
  }, [dispatch, filters]);

  useEffect(() => {
    // Update URL parameters when filters change
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(filters)) {
      if (value) {
        params.set(key, value);
      }
    }
    setSearchParams(params);
  }, [filters, setSearchParams]);

  const handleFilterChange = (filterName, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
    }));
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
          currentPage={1}
          onPageChange={() => {}}
        />
      )}
    </div>
  );
}

"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Map from ".././utils/map";

const LocationSelector = () => {
  const [selectedLocation, setSelectedLocation] = useState({
    latitude: 0,
    longitude: 0,
  });
  const router = useRouter();

  const handleLocationClick = () => {
    router.push(
      `http://www.google.com/maps/place/49.46800006494457,17.11514008755796`
    );
  };

  return (
    <div>
      <h1>Select a Location</h1>
      <button onClick={handleLocationClick}>Show on Map</button>
      <Map {...selectedLocation} />
    </div>
  );
};

export default LocationSelector;

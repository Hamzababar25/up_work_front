import React, { useState } from "react";
import { useRouter } from "next/router";
import Map from "../map";

const MapPage = () => {
  const router = useRouter();
  const { lat, lng } = router.query;

  return <Map latitude={parseFloat(lat)} longitude={parseFloat(lng)} />;
};

export default MapPage;

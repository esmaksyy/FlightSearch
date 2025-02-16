import React, { useState } from "react";

const FlightSearch = () => {
  const [flights, setFlights] = useState([]);
  const [searchParams, setSearchParams] = useState({ from: "", to: "", date: "" });

  return (
    <div>
      <h2>Flight Search</h2>
    </div>
  );
};

export default FlightSearch;

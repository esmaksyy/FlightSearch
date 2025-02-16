import React, { useState } from "react";

const FlightSearch = () => {
  const [flights, setFlights] = useState([]);
  const [searchParams, setSearchParams] = useState({ from: "", to: "", date: "" });

  return (
    <div>
      <h2>Flight Search</h2>
      <input
        type="text"
        placeholder="From"
        value={searchParams.from}
        onChange={(e) => setSearchParams({ ...searchParams, from: e.target.value })}
      />
      <input
        type="text"
        placeholder="To"
        value={searchParams.to}
        onChange={(e) => setSearchParams({ ...searchParams, to: e.target.value })}
      />
      <input
        type="date"
        value={searchParams.date}
        onChange={(e) => setSearchParams({ ...searchParams, date: e.target.value })}
      />
    </div>
  );
};

export default FlightSearch;

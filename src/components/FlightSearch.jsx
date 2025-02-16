import React, { useState } from "react";
import axios from "axios";

const FlightSearch = () => {
  const [flights, setFlights] = useState([]);
  const [searchParams, setSearchParams] = useState({ from: "", to: "", date: "" });

  const fetchFlights = async () => {
    try {
      const response = await axios.get("https://sky-scrapper.p.rapidapi.com/api/flights/search", {
        params: {
          departure: searchParams.from,
          arrival: searchParams.to,
          date: searchParams.date,
        },
        headers: {
          "X-RapidAPI-Key": "096d9014e4msh5ad29341ba07b3cp10e09djsn50f7481ea75c",
          "X-RapidAPI-Host": "sky-scrapper.p.rapidapi.com",
        },
      });

      setFlights(response.data.flights || []);
    } catch (error) {
      console.error("Error fetching flights:", error);
    }
  };

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
    <button onClick={fetchFlights}>Search Flights</button>

    <div>
      {flights.length > 0 ? (
        flights.map((flight, index) => (
          <div key={index}>
            <p><strong>Airline:</strong> {flight.airline}</p>
            <p><strong>Departure:</strong> {flight.departureTime}</p>
            <p><strong>Arrival:</strong> {flight.arrivalTime}</p>
            <p><strong>Price:</strong> {flight.price}</p>
          </div>
        ))
      ) : (
        <p>No flights found.</p>
      )}
    </div>
  </div>
);
};

export default FlightSearch;

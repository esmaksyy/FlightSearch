import React, { useState } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const FlightSearch = () => {
  const [flights, setFlights] = useState([]);
  const [searchParams, setSearchParams] = useState({ from: "", to: "", date: "" });
  const [loading, setLoading] = useState(false);

  const fetchFlights = async () => {
    setLoading(true);
    try {
      const options = {
        method: "GET",
        url: "https://sky-scrapper.p.rapidapi.com/api/flights/search",
        params: {
          departure: searchParams.from,
          arrival: searchParams.to,
          date: searchParams.date,
        },
        headers: {
          "X-RapidAPI-Key": "096d9014e4msh5ad29341ba07b3cp10e09djsn50f7481ea75c",
          "X-RapidAPI-Host": "sky-scrapper.p.rapidapi.com",
        },
      };
      const response = await axios.request(options);
      setFlights(response.data.flights || []);
    } catch (error) {
      console.error("Error fetching flights:", error);
    }
    setLoading(false);
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-4">Flight Search</h2>
      <div className="flex flex-col gap-2">
        <Input
          placeholder="From"
          value={searchParams.from}
          onChange={(e) => setSearchParams({ ...searchParams, from: e.target.value })}
        />
        <Input
          placeholder="To"
          value={searchParams.to}
          onChange={(e) => setSearchParams({ ...searchParams, to: e.target.value })}
        />
        <Input
          type="date"
          value={searchParams.date}
          onChange={(e) => setSearchParams({ ...searchParams, date: e.target.value })}
        />
        <Button onClick={fetchFlights} disabled={loading}>{loading ? "Searching..." : "Search Flights"}</Button>
      </div>
      <div className="mt-4">
        {flights.length > 0 ? (
          flights.map((flight, index) => (
            <Card key={index} className="p-4 mb-2">
              <CardContent>
                <p><strong>Airline:</strong> {flight.airline}</p>
                <p><strong>Departure:</strong> {flight.departureTime}</p>
                <p><strong>Arrival:</strong> {flight.arrivalTime}</p>
                <p><strong>Price:</strong> {flight.price}</p>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-gray-500">No flights found.</p>
        )}
      </div>
    </div>
  );
};

export default FlightSearch;

import React, { useState } from "react";
import axios from "axios";
import { Card, CardContent } from "./ui/Card";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";

const FlightSearch = () => {
  const [flights, setFlights] = useState([]);
  const [searchParams, setSearchParams] = useState({ from: "", to: "", date: "" });
  const [loading, setLoading] = useState(false);

  const fetchFlights = async () => {
    setLoading(true);
    try {
      const options = {
        method: "GET",
        url: "https://sky-scrapper.p.rapidapi.com/api/v1/flights/searchFlights",
        params: {
          originSkyId: searchParams.from,
          destinationSkyId: searchParams.to,
          originEntityId: '27544008',
          destinationEntityId: '27537542',
          date: searchParams.date,
          cabinClass: "economy",
          adults: '1',
          sortBy: 'best',
          currency: 'USD',
          market: 'en-US',
          countryCode: 'US',
        },
        headers: {
          "X-RapidAPI-Key": "096d9014e4msh5ad29341ba07b3cp10e09djsn50f7481ea75c",
          "X-RapidAPI-Host": "sky-scrapper.p.rapidapi.com",
        },
      };
      const response = await axios.request(options);
      const flightData = response.data.data.itineraries || [];
      setFlights(flightData);
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
        <Button onClick={fetchFlights} disabled={loading}>
          {loading ? "Searching..." : "Search Flights"}
        </Button>
      </div>
      <div className="mt-4">
        {flights.length > 0 ? (
          flights.map((flight, index) => (
            <Card key={index} className="p-4 mb-2">
              <CardContent>
                <p><strong>Airline:</strong> {flight.legs[0].carriers.marketing[0].name}</p>
                <p><strong>Departure:</strong> {new Date(flight.legs[0].departure).toLocaleString()}</p>
                <p><strong>Arrival:</strong> {new Date(flight.legs[flight.legs.length - 1].arrival).toLocaleString()}</p>
                <p><strong>Price:</strong> {flight.price.formatted}</p>
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

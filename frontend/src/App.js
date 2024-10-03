import React, { useState, useEffect } from "react";
import Apod from "./components/Apod/Apod";
import SearchBar from "./components/SearchBar/SearchBar";
import Chatbot from "./components/ChatBot/Chatbot";

const App = () => {
  const [apodData, setApodData] = useState(null);
  const [loading, setLoading] = useState(true);
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const initialDate = yesterday.toISOString().split("T")[0];
  const [date, setDate] = useState(initialDate);

  const fetchApodData = async (date) => {
    setLoading(true); // Start loading
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/apod/${date}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setApodData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); // End loading
    }
  };

  useEffect(() => {
    fetchApodData(date);
  }, [date]);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center p-4">
      <h1 className="text-4xl font-bold mb-6 text-center">
        Explore Your Astronomy Picture of the Day
      </h1>
      <p className="mb-4 text-lg text-gray-200 text-center">
        Ever wondered what cosmic wonders were captured on your birthday?
      </p>
      <p className="mb-4 text-lg text-gray-200 text-center">
        Discover stunning astronomy images from that special day and chat with
        our intelligent bot for any questions!
      </p>
      <SearchBar onSearch={setDate} />
      {loading ? (
        <p className="text-yellow-400 font-semibold">Loading...</p>
      ) : apodData ? (
        <Apod data={apodData} />
      ) : (
        <p className="text-red-500">Error loading data. Please try again.</p>
      )}
      <Chatbot />
    </div>
  );
};

export default App;

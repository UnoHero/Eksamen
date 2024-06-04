import React, { useState, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

// geting the newest of both categories
export const useNewItem = () => {
  const { user } = useAuthContext();
  const [addError, setError] = useState(null);
  const [addIsLoading, setIsLoading] = useState(null);
  const [sweater, setSweater] = useState(null);
  const [tShirt, setTShirt] = useState(null);

  const URL = process.env.REACT_APP_URL;

  const newItem = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(URL + "/new", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error);
      } else {
        console.log("Get fetch successful!");
        const data = await response.json();
        setTShirt(data.tShirt);
        setSweater(data.sweater);
        console.log(data);
      }
    } catch (error) {
      setError("An error occurred while fetching data.");
    }

    setIsLoading(false);
  };

  return { newItem, addIsLoading, addError, tShirt, sweater };
};
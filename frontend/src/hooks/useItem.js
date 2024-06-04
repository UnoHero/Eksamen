import React, { useState, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

// geting the newest of both categories
export const useItem = () => {
  const { user } = useAuthContext();
  const [addError, setError] = useState(null);
  const [addIsLoading, setIsLoading] = useState(null);
  const [itemData, setItemData] = useState([]);


  const URL = process.env.REACT_APP_URL;

  const Item = async (id) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(URL + `/${id}`, {
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
        setItemData(data);
      }
    } catch (error) {
      setError("An error occurred while fetching data.");
    }

    setIsLoading(false);
  };

  return { Item, addIsLoading, addError, itemData };
};
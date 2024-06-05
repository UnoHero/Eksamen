import React, { useState, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

// getting the newest of both categories
export const useCategory = () => {
  const { user } = useAuthContext();
  const [addError, setError] = useState(null);
  const [addIsLoading, setIsLoading] = useState(null);
  const [categoryData, setCategoryData] = useState([]);

  const URL = process.env.REACT_APP_URL;

  const searchCategory = async (category) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(URL + `/item/${category}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error);
      } else {
        const data = await response.json();
        setCategoryData(data);
      }
    } catch (error) {
      setError("An error occurred while fetching data.");
    }

    setIsLoading(false);
  };

  return { searchCategory, addIsLoading, addError, categoryData };
};

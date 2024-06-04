import { useState } from "react"
import { useAuthContext } from "../hooks/useAuthContext";

// a hook for deleting posts

export const useDelete = () => {
  const { user } = useAuthContext();
  const [delError, setError] = useState(null)
  const [delIsLoading, setIsLoading] = useState(null)
  
  const URL = process.env.REACT_APP_URL;

  const del = async (id) => {
    setIsLoading(true)
    setError(null)
      
      const response = await fetch (URL + `/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.token}`
        }
      });

      if (!response.ok) {
        throw new Error("Failed to delete quote.")
      }

      if (response.ok) {
        setIsLoading(false)
      }
  };

  return { del, delIsLoading, delError};
}
 
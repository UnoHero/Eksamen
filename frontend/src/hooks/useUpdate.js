import { useState } from "react"
import { useAuthContext } from "../hooks/useAuthContext";

export const useUpdate = () => {
  const { user } = useAuthContext();
  const [updateError, setError] = useState(null)
  const [updateIsLoading, setIsLoading] = useState(null)

  const URL = process.env.REACT_APP_URL;

  const update = async (itemId, newItem) => {
    setIsLoading(true)
    setError(null)

      // a patch request to update a quote quoteId is the id of the quote that is beeing updated.
      const response = await fetch (URL + `/${itemId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.token}`
        },
        // the newQuote is the new/edited versin of the quote that is sendt in the body
        body: JSON.stringify({newItem})

      });

      if (!response.ok) {
        throw new Error("Failed to delete quote.")
      }

      if (response.ok) {
        setIsLoading(false)
      }
  };

  return { update, updateIsLoading, updateError};
}
 
// useUser hook
import React, {useState} from "react";

export const useUser = () => {
    const [userError, setUserError] = useState(null);
    const [userIsLoading, setUserIsLoading] = useState(null);
    const [userId, setUserId] = useState(null); // New state to store userID
    
    const URL = process.env.REACT_APP_URL;

    const getUserByID = async (userSearch) => {
        setUserIsLoading(true);
        setUserError(null);

        try {
            const response = await fetch(URL + `/user`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userSearch })
            });
        
            if (!response.ok) {
                throw new Error("Failed to get user.");
            }

            const data = await response.json();
            setUserId(data._id); // Set userID to the received _id
            setUserIsLoading(false);
            return data; // Return the entire response if needed
        } catch (error) {
            setUserIsLoading(false);
            setUserError(error.message);
            throw error;
        }
    };
    
    return { getUserByID, userIsLoading, userError, userId }; // Include userId in return
};

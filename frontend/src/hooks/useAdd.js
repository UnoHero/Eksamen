import React, { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useUser } from "./useUser";

// a hook for adding Apparels to the DB
export const useAdd = () => {
    const { user } = useAuthContext();
    const [addError, setError] = useState(null);
    const [addIsLoading, setIsLoading] = useState(null);
    const { getUserByID, error, isLoading, userId } = useUser();
    
    const URL = process.env.REACT_APP_URL;

    const add = async (apparelName, image, genre, description) => {
        setIsLoading(true);
        setError(null);
        
        const name = apparelName

        await getUserByID(user.userName);
        const response = await fetch(URL + "/item/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user.token}`
            },
            body: JSON.stringify({ name, image, genre, description, userId }) 
        });

        if (!response.ok) {
            const errorData = await response.json();
            setIsLoading(false);
            setError(errorData.error);
            return;
        } else {
            console.log("item saved sucsessfully!");
        }
        
        setIsLoading(false);
    };
    
    return { add, addIsLoading, addError };
};

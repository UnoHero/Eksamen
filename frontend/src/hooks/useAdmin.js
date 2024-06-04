import React, { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

// A hook for checking if the user is an admin
export const useAdmin = () => {
    const { user } = useAuthContext();
    const [adminError, setAdminError] = useState(null);
    const [adminIsLoading, setAdminIsLoading] = useState(null);
    const [answer, setAnswer] = useState(false);

    const URL = process.env.REACT_APP_URL;

    const admin = async () => {
        setAdminIsLoading(true);
        setAdminError(null);

        try {
            const userName = user?.userName;

            const response = await fetch(URL + "/admin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${user?.token}`
                },
                body: JSON.stringify({ userName })
            });

            if (!response.ok) {
                const errorData = await response.json();
                setAdminError(errorData.error);
            } else {
                console.log("Admin check successful");
                const data = await response.json();

                if (data.admin == "true") {
                    setAnswer(data.admin);
                    console.log(answer);
                }
            }
        } catch (error) {
            setAdminError("An error occurred while checking admin status.");
        } finally {
            setAdminIsLoading(false);
        }
    };

    return { admin, adminIsLoading, adminError, answer };
};

import { useState } from "react"
import { useAuthContext } from "./useAuthContext"

// a hook for login

export const useLogin = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()

  const URL = process.env.REACT_APP_URL

  const login = async (userName, password) => {
    setIsLoading(true)
    setError(null)
    
    // send login request to the backend
    const response = await fetch(URL+"/login", {
      method: "POST",
      headers: { "Content-Type" : "application/json"},
      // send the user name and password to the backend
      body: JSON.stringify({ userName, password })
    })
    const json = await response.json()

    if (!response.ok) {
      setIsLoading(false)
      setError(json.error)
    }
    if (response.ok) {
      // save the user to local storage
      localStorage.setItem("user", JSON.stringify(json))

      // update the auth context
      dispatch({type: "LOGIN", payload:json})

      // update loading state
      setIsLoading(false)
    }
  }

  return { login, isLoading, error}
} 
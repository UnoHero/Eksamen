import { useState } from "react"
import { useAuthContext } from "./useAuthContext"

// signup hook

export const useSignup = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()

  const URL = process.env.REACT_APP_URL

  const signup = async (userName, password) => {
    setIsLoading(true)
    setError(null)
    
    // fetch signup
    const response = await fetch (URL+"/signup", {

      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ userName, password }) 
    })
    const json = await response.json()

    if (!response.ok) {
      setIsLoading(false)
      setError(json.error)
    }
    if (response.ok) {
      //save the user to local storage
      localStorage.setItem("user", JSON.stringify(json))

      // update the auth context
      dispatch({type: "LOGIN", payload: json})

      // update loading state
      setIsLoading(false)
    }
  }

  return { signup, isLoading, error}
}
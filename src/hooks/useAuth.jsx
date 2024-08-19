import { useContext } from "react"
import { AuthenticationContext } from "../contexts/AuthenticationContext"

export default function useAuth(){
    return useContext(AuthenticationContext);
}
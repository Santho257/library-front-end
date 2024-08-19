import { useContext } from "react"
import { MessagesContext } from "../contexts/MessagesContext";

export default function useMessages(){
    return useContext(MessagesContext);
}
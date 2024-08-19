import { useContext } from "react";
import { StompContext } from "../contexts/StompClientContext";

export default function useStomp(){
    return useContext(StompContext);
}
import { useContext } from "react";
import { ReceiverContext } from "../contexts/ReceiverContext";

export default function useReceiver(){
    return useContext(ReceiverContext);
}
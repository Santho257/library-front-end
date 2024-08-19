import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

export default function Input({ name }) {
    const {user, updateUser} = useContext(UserContext);
    return (<div className="inputArea m-5 w-[60%] rounded-md">
        <label htmlFor={name}>{name}</label>
        <input className="w-[100%] px-2 text-lg outline-1 rounded-lg focus:outline-blue border-textblack border-2" type="text" name={name} id={name} onInput={(e) => {
            updateUser({...user, [name]: e.target.value});
        }}/>
    </div>);
}
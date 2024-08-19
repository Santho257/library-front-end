import { useContext } from "react";
import Input from "./Input"
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
export default function UserEnter() {
    const { user, saveUser } = useContext(UserContext);
    const navi = useNavigate();
    return <div className="m-auto w-[100%] h-[100vh] bg-notificationwhite relative">
        <div className="m-auto w-[50%] h-[100%] bg-white">
            <header className="h-[10%] bg-blue text-white flex justify-center items-center">
                <h2 className="font-sans font-bold text-2xl">Chat Application</h2>
            </header>
            <div id="userDetails" className="flex justify-center items-center flex-col h-[90vh]">
                <Input name="email" />
                <Input name="name" />
                <Input name="profile" />
                <button className="bg-blue rounded-md p-2" onClick={() => {saveUser(user); navi("/chat")}}> Enter Into Chat</button>
            </div>
        </div>
    </div>
        ;
}
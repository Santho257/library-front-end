import { useNavigate } from "react-router-dom";

export default function UserListItem({user}) {
    const navi = useNavigate();
    return <li className="border-lightwhite border-2 h-[10%] hover:cursor-pointer" id={user.email} onClick={()=>navi(`${user.email}`)}>
        <div id="userDetail" className="h-[100%] bg-white grid grid-cols-6 gap-1">
            <div className="profile w-[90%] h-[90%] m-1">
                <img src={user.profile} alt="" className="m-l-2 rounded-[50%] text-center bg-bggreen w-[90%] h-[90%]" />
            </div>
            <div className="flex items-center col-span-5">
                <h6 className="font-medium text-md align-middle col-span-5">{user.name}</h6>
            </div>
        </div>
    </li>;
}
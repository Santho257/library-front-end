import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import React from "react";

function TempRequireAuth({roles}){
    const auth = useAuth();
    if(auth.user.token == ''){
        return <Navigate to="/login" replace/>
    }
    else if(roles && auth.user.role != roles){
        return <Navigate to="/unauthorized" replace/>
    }

    return <Outlet/>;
}

const RequireAuth = React.memo(TempRequireAuth);

export default RequireAuth;
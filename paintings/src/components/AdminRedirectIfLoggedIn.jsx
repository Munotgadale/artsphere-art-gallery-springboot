import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../utils/TokenUtil";

export function AdminRedirectIfLoggedIn(props) {

    if (isAuthenticated()) {
        return <Navigate to={'/admin-dashboard'}></Navigate>; 
    }
    return props.children;
}

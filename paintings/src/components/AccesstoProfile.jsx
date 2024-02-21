import { Navigate } from "react-router-dom";
import { isArtist } from "../utils/TokenUtil";

export function AccessProfile(props) {
    if (!isArtist()) {
        return <Navigate to={'/user-profile'}></Navigate>; 
    }
    return <Navigate to={'/artist-profile'}></Navigate>; 
}
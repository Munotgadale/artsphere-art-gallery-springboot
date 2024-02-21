import axios from "axios";

export async function adminlogin(creditials){
    const response =await axios.post(`http://localhost:8080/admin-login`,creditials);
    return response.data;
}
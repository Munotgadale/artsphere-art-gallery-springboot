import axios from "axios";


//Artist Api
export async function register(creditials){
    const response = await axios.post(`http://localhost:8080/register-artist`,creditials);
    return response.data;
}

export async function artistlogin(creditials){

    try {
        const response = await axios.post(`http://localhost:8080/login-artist`, creditials);
        console.log("Response Data:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}


export async function getArtistDetails(id){
    try {
       const response = await axios.get(`http://localhost:8080/artist/fetch/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export async function getArtists(){
    try {
       const response = await axios.get("http://localhost:8080/all-artists");
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export async function deleteArtist(id){
    try {
        const response = await axios.delete(`http://localhost:8080/delete-artist/${id}`)
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export async function deleteArtistPermanently(id){
    try {
        const response = await axios.delete(`http://localhost:8080/permanently-delete/${id}`)
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export async function reactivateArtist(id){
    try {
        const response = await axios.post(`http://localhost:8080/reactive-artist/${id}`)
        return response.data;
    } catch (error) {
        console.log(error);
    }
}




//User Api
export async function login(creditials){
    const response =await axios.post(`http://localhost:8080/login-user`,creditials);
    return response.data;
}


export async function getUserDetails(id){
    try {
       const response = await axios.get(`http://localhost:8080/user/fetch/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export async function signup(creditials){
    const response = await axios.post(`http://localhost:8080/register-user`,creditials);
    return response;
}

export async function updateUser(creditials){
    const response = await axios.patch(`http://localhost:8080/user-update`,creditials);
    return response.data;
}

export async function updateArtist(creditials){
    const response = await axios.post(`http://localhost:8080/artist-update`,creditials);
    return response.data;
}

export async function getUsers(){
    try {
       const response = await axios.get("http://localhost:8080/all-users");
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export async function deleteUser(userId) {
    try {
        const response = await axios.delete(`http://localhost:8080/delete-user/${userId}`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function deleteUserPermanently(userId) {
    try {
        const response = await axios.delete(`http://localhost:8080/permanently-delete-user/${userId}`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function reactivateUser(userId) {
    try {
        const response = await axios.post(`http://localhost:8080/reactive-user/${userId}`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

//watch morning lecture from 19 mi


/////Forgot Password API USER


export async function forgotPass(email) {
    try {
        const response = await axios.post('http://localhost:8080/user/forgot-password', null, {
            params: {
                email: email,
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}



export async function sendEmail(email){
    try{
        const response = await axios.post('http://localhost:8080/user/send-email', null, {
            params: {
                email: email,
            },
        });
        return response;

    }catch(error){
        console.log(error);
        throw error;
    }
}

export async function deleteUserEmailSend(email){
    try{
        const response = await axios.post('http://localhost:8080/user/send-deletion-email', null, {
            params: {
                email: email,
            },
        });
        return response;
    }catch(error){
        console.log(error);
        throw error;
    }
}

export async function reactiveUserEmailSend(email){
    try{
        const response = await axios.post('http://localhost:8080/user/send-reactive-email', null, {
            params: {
                email: email,
            },
        });
        return response;
    }catch(error){
        console.log(error);
        throw error;
    }
}

export async function deactiveUserEmailSend(email){
    try{
        const response = await axios.post('http://localhost:8080/user/send-deactive-email', null, {
            params: {
                email: email,
            },
        });
        return response;
    }catch(error){
        console.log(error);
        throw error;
    }
}




//Artist Forgot API

/////Forgot Password API


export async function forgotArtistPass(email) {
    try {
        const response = await axios.post('http://localhost:8080/artist/forgot-password', null, {
            params: {
                email: email,
            },
        });

        return response.data;
    } catch (error) {
        throw error;
    }
}



export async function sendArtistEmail(email){
    try{
        const response = await axios.post('http://localhost:8080/artist/send-email', null, {
            params: {
                email: email,
            },
        });
        return response;

    }catch(error){
        console.log(error);
        throw error;
    }
}

export async function deleteArtistEmailSend(email){
    try{
        const response = await axios.post('http://localhost:8080/artist/send-deletion-email', null, {
            params: {
                email: email,
            },
        });
        return response;
    }catch(error){
        console.log(error);
        throw error;
    }
}

export async function reactiveArtistEmailSend(email){
    try{
        const response = await axios.post('http://localhost:8080/artist/send-reactive-email', null, {
            params: {
                email: email,
            },
        });
        return response;
    }catch(error){
        console.log(error);
        throw error;
    }
}

export async function deactiveArtistEmailSend(email){
    try{
        const response = await axios.post('http://localhost:8080/artist/send-deactive-email', null, {
            params: {
                email: email,
            },
        });
        return response;
    }catch(error){
        console.log(error);
        throw error;
    }
}
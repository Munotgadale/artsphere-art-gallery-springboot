import axios from "axios";

export async function messagesend(creditials){
    const response =await axios.post(`http://localhost:8080/api/messages/add`,creditials);
    return response.data;
}

export async function getMessages() {
    try {
        const response = await axios.get("http://localhost:8080/api/messages/get/messages");
        console.log(response);
        return response.data;
        
    } catch (error) {
        console.log(error);
    }
}
export async function deleteMessage(id) {
    try {
        const response = await axios.delete(`http://localhost:8080/api/messages/delete/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}


export async function fetchMessage(email) {
    try {
        const response = await axios.get(`http://127.0.0.1:5700/message/${email}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

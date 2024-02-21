export function isAuthenticated() {
    return getToken() ? true : false;
}

export function getToken() {
    return localStorage.getItem("token");
}

export function logout() {
    localStorage.clear();
    sessionStorage.clear();
}


export function isArtist() {
    return localStorage.getItem("artist") === "true";
}


export function isAdmin() {
    const data = sessionStorage.getItem("adminMessage")
    if (isAuthenticated() && data === "secret") {
        return true;
    } else {
        return false;
    }
}
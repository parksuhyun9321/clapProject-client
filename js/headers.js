function getHeaders(isAdmin, value){
    const headers = new Headers();

    headers.append("content-type","application/json")
    headers.append(isAdmin ? "auth" : "key", value);

    return headers
}

export default getHeaders
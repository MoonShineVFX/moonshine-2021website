export const requestOptions = {
    method : 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': process.env.REACT_APP_FULLBODY_TOKEN_KEY
    }
}
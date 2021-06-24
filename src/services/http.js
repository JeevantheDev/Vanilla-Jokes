class HttpClient {
    
    //http get request method
    async get(url) {
        const response = await fetch(url);
        const resData = await response.json();
        return resData;
    }

    //http post request method
    async post(url, data) {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const resData = await response.json();
        return resData;
    }

    //http put request method
    async put(url, data) {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const resData = await response.json();
        return resData;
    } 

    //http delete request method
    async delete(url) {
        const response = await fetch(url, {
            method: 'DELETE',
        });

        const resData = 'Resource Deleted...';
        return resData;
    } 
}

export const http = new HttpClient();
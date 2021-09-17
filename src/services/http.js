class HttpClient {
  //http get request method
  async get(url) {
    try {
      const response = await fetch(url);
      const resData = await response.json();
      return resData;
    } catch (error) {
      return error.message;
    }
  }

  //http post request method
  async post(url, data) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const resData = await response.json();
      return resData;
    } catch (error) {
      return error.message;
    }
  }

  //http put request method
  async put(url, data) {
    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const resData = await response.json();
      return resData;
    } catch (error) {
      return error.message;
    }
  }

  //http delete request method
  async delete(url) {
    try {
      const response = await fetch(url, {
        method: 'DELETE',
      });

      const resData = 'Resource Deleted...';
      return resData;
    } catch (error) {
      return error.message;
    }
  }
}

export const http = new HttpClient();

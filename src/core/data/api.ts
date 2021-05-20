const api = {
  baseUrl: 'http://10.0.2.2:8080/Run_connect_war/api',
  headersGet: {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  },
  headersPost: (data: Object) => {
    return {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
  },
};

export default api;

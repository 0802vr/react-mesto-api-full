 
class Auth {
  constructor({server,handleResponse}) {
    this._server = server;
    this._handleResponse = handleResponse;}

register  ({email, password})  {
  return fetch(`${this._server}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({"email": email, "password": password
    })
  })
    
  .then(this._handleResponse);
};
authorize  ({email, password}) {
  return fetch(`${this._server}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({"email": email, "password": password})
    })
  
  .then(this._handleResponse)
};
checkToken  (token) {
  
  return fetch(`${this._server}/users/me`, {
    method: 'GET',
    
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    
  })
   
  .then(this._handleResponse)
}
}
export default new Auth({server: "http://localhost:3000", handleResponse: (res) => {
  if (!res.ok) {return Promise.reject(`Ошибка: ${res.status}`);}
   
  return res.json()
  
}});
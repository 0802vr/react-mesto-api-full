 class Api {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    _getBearer() {
        const jwt = localStorage.getItem('jwt');
        return {
          'Authorization': `Bearer ${jwt}`,
          ...this._headers,
        };
      }
    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._getBearer(),
        })
            .then(this._checkResponse)
    }
    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: this._getBearer(),
        },
        )
            .then(this._checkResponse)
    }
    editProfile(name, about) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: "PATCH",
            headers: this._getBearer(),
            body: JSON.stringify({
                name,
                about
            })
        })
            .then(this._checkResponse)
    }
    addCard({ name, link }) {
        return fetch(`${this._baseUrl}/cards`, {
            method: "POST",
            headers: this._getBearer(),
            body: JSON.stringify({
                name,
                link
            })
        })
            .then(this._checkResponse)
    }
    removeCard(id) {
        return fetch(`${this._baseUrl}/cards/${id}`, {
            method: "DELETE",
            headers: this._getBearer(),

        })
            .then(this._checkResponse)
    }
    changeLikeCardStatus(id, isLiked) {
                return fetch(`${this._baseUrl}/cards/${id}/likes `, {
                method: isLiked ? 'DELETE' : 'PUT',
                headers: this._getBearer(),
    
            }).then((res) => {
                return this._checkResponse(res);
              });
                
 
    }
   /* deleteLike(id) {
        return fetch(`${this._baseUrl}/cards/${id}/likes `, {
            method: "DELETE",
            headers: this._headers

        })
            .then(this._checkResponse)
    }
    addLike(id) {
        return fetch(`${this._baseUrl}/cards/${id}/likes `, {
            method: "PUT",
            headers: this._headers

        })
            .then(this._checkResponse)
    }*/
    addAvatar(avatar) {
        return fetch(`${this._baseUrl}/users/me/avatar `, {
            method: "PATCH",
            headers: this._getBearer(),
            body: JSON.stringify({
                avatar
            })
        })
            .then(this._checkResponse)
    }
    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }
    

}

const api = new Api({ baseUrl: 'http://localhost:3000', headers: { 'Content-Type': 'application/json' } })

export default api;
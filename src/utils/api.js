class Api {
constructor({url, headers}){
    this._url = url;
    this._headers = headers;
}

_checkResponse(res) {
    if (res.ok) {
        return res.json();
    }
  return Promise.reject('Сервер не доступен')
}

//получение списка карточек в виде массива
getAllCards(){
return fetch ( `${this._url}/cards`, {
    method: "GET",
    headers:  this._headers,
})
.then(this._checkResponse)
}

//получение данных пользователя
getUserInfo(){
    return fetch ( `${this._url}/users/me`, {
        method: "GET",
        headers:  this._headers,
    })
    .then(this._checkResponse)
    }

//лайк карточки
setCardLike(cardId){
    return fetch ( `${this._url}/cards/likes/${cardId}`, {
        method: "PUT",
        headers:  this._headers,
    })
    .then(this._checkResponse)
     
    }

//удаление лайка карточки 
removeCardLike(cardId){
    return fetch ( `${this._url}/cards/likes/${cardId}`, {
        method: "DELETE",
        headers:  this._headers,
    })
    .then(this._checkResponse)
     
    }
   
changeLikeCardStatus(isLiked, cardId){
    return fetch ( `${this._url}/cards/likes/${cardId}`, {
        method: `${isLiked ? "DELETE" : "PUT"}`,
        headers:  this._headers,
    })
    .then(this._checkResponse)
     
    }   
    
//добавление карточки
addCard(data){
    return fetch( `${this._url}/cards`, {
        method: "POST",
        headers:  this._headers,
        body: JSON.stringify({
            name: data.name,
            link: data.link
        }),
    })
    .then(this._checkResponse)
     
    }

//редактирования профиля
editUserInfo(data){
    debugger
    return fetch( `${this._url}/users/me`, {
        method: 'PATCH',
        headers:  this._headers,
        body: JSON.stringify({
            name: data.name,
            about: data.about
        })
      })
      .then(this._checkResponse)
    }

//удаление карточки 
removeCard(cardId){
    return fetch ( `${this._url}/cards/${cardId}`, {
        method: "DELETE",
        headers:  this._headers,
    })
    .then(this._checkResponse)
    }

//изменение аватара 
editUserAvatar(userAvatar){
    return fetch( `${this._url}/users/me/avatar`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
            avatar: userAvatar.avatar
        })
      })
      .then(this._checkResponse)
    }

}

const api = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-30',
    headers: {
        authorization: '31260589-e34c-433a-a114-9db11ff4554e',
        "content-type": "application/json"
      }
});

export default api; 
import React from "react";
import Header from "./Header";
import Main from "./Main";
 
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";
import ProtectedRoute from "./ProtectedRoute";
import Success from "../image/Success.png";
import Fail from "../image/Fail.png";
import {
  Route,
  Redirect,
  Switch,
  useHistory,
  BrowserRouter,
   
} from "react-router-dom";
import api from "../utils/Api";
import Auth from "../utils/Auth.js";
import { CurrentUserContext } from "../context/CurrentUserContext";

function App() {
  const history = useHistory();
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isEditAvatarisPopupOpen, setEditAvatarisPopupOpen] =
    React.useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [cards, setCards] = React.useState([]);
  const [selectedCard, setSelectedCard] = React.useState({
    name: "",
    link: "",
  });
  const [currentUser, setCurrentUser] = React.useState({});

  const toolTipFail = {
    image: Fail,
    text: "Что-то пошло не так! Попробуйте ещё раз.",
  };
  const toolTipSuccess = {
    image: Success,
    text: "Вы успешно зарегистрировались!",
  };
  const [toolTip, setToolTip] = React.useState(toolTipFail);
  const [email, setEmail] = React.useState("");
  const [isSetTooltipOpen, setTooltipOpen] = React.useState(false);

 
  
  React.useEffect(() => {
    if (localStorage.getItem("jwt")) {
      const jwt = localStorage.getItem("jwt");

      Auth.checkToken(jwt)
        .then((token) => {
          if (token.data._id && token.data.email) {
            setEmail(token.data.email);
            setLoggedIn(true);
          }
          
        })
        .catch((error) => {
          console.log(error);
        });
    }
  
  }, []);
  

  const handleEditAvatarClick = () => {
    setEditAvatarisPopupOpen(true);
  };
  const handleEditProfileClick = () => {
    setEditProfilePopupOpen(true);
  };
  const handleAddPlaceClick = () => {
    setAddPlacePopupOpen(true);
  };
  const handleCardClick = (card) => {
    setSelectedCard({ name: card.name, link: card.link });
  };

  const closeAllPopups = () => {
    setEditAvatarisPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setSelectedCard({ link: "", name: "" });
    setTooltipOpen(false);
  };
   
  function getUserInfo(){
    
    api
      .getUserInfo()
      .then((userInfo) => {
        setCurrentUser(userInfo);
      })

      .catch((err) => {
        console.log(err); // тут ловим ошибку
      });
      
  }
  function getCard(){
    
    
      api
      .getInitialCards()
      .then((cardList) => {
        setCards(cardList);
      })

      .catch((err) => {
        console.log(err); // тут ловим ошибку
      });
       
  } 
  React.useEffect(() => {
    if (localStorage.getItem('jwt')){
    getUserInfo();
    getCard();
  }
  }, [loggedIn]);


  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.card.likes.some((i) => i._id === currentUser._id);

    api
      .changeLikeCardStatus(card.card._id, !isLiked)
      .then((newCard) => {
        setCards((cards) =>
          cards.map((c) => (c._id === card.card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err); // тут ловим ошибку
      });
  }
  function handleCardDelete(card) {
    api
      .removeCard(card._id)
      .then(() => {
        setCards(cards.filter((element) => element !== card));
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function handleUpdateUser(updateProfile) {
    api
      .editProfile(updateProfile.name, updateProfile.about)
      .then((newEdit) => {
        setCurrentUser(newEdit);
        closeAllPopups();
      })

      .catch((err) => {
        console.log(err); // тут ловим ошибку
      });
  }
  function handleUpdateAvatar({ avatar }) {
    api
      .addAvatar(avatar)
      .then((newAvatar) => {
        setCurrentUser(newAvatar);
        closeAllPopups();
      })

      .catch((err) => {
        console.log(err); // тут ловим ошибку
      });
  }
  function handleUpdateCard({ name, link }) {
    api
      .addCard({ name: name, link: link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })

      .catch((err) => {
        console.log(err); // тут ловим ошибку
      });
  }
  function handleRegister({ email, password }) {
    Auth.register({ email: email, password: password })
      .then(() => {
        setToolTip(toolTipSuccess);
        setTooltipOpen(true);
        history.push("/sign-in");
      })
      .catch(() => {
        setToolTip(toolTipFail);
        setTooltipOpen(true);
      });
  }

  function handleLogin({email, password}) {
    Auth.authorize({ email: email, password: password })
    
      .then((res) => {
         
        if(res.token){
        localStorage.setItem("jwt", res.token);
        console.log(localStorage)
        setEmail(email);
        setLoggedIn(true);
        history.push("/");     
      }
      
    })
    .catch((er) => {
       
      setToolTip(toolTipFail);
      setTooltipOpen(true);
    });
    }
  
   
  function handleTokenOut() {
    localStorage.removeItem("jwt");
    history.push("/sign-in");
    setLoggedIn(false);
  }

  return (
    <BrowserRouter>
      <div className="page">
        <CurrentUserContext.Provider value={currentUser}>
          <Header email={email} logOut={handleTokenOut} button="Выйти" />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onUpdateCard={handleUpdateCard}
          />

          <EditAvatarPopup
            isOpen={isEditAvatarisPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />

          <ImagePopup
            name={selectedCard.name}
            link={selectedCard.link}
            onClose={closeAllPopups}
          />
          <InfoTooltip
            isOpen={isSetTooltipOpen}
            data={toolTip}
            onClose={closeAllPopups}
          />

          <Switch>
          <Route path="/sign-up">
                {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-up" />}

                <Register onRegister={handleRegister} />
              </Route>

              <Route path="/sign-in">
                {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}

                <Login onLogin={handleLogin} />
              </Route>
            <ProtectedRoute
              exact
              path="/"
              loggedIn={loggedIn}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              component={Main}
            >
               
              
            </ProtectedRoute>
          </Switch>
        </CurrentUserContext.Provider>
      </div>
    </BrowserRouter>
  );
}

export default App;

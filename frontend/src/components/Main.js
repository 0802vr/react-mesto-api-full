import React from "react";
import Card from "./Card"
import Footer from "./Footer";
import {CurrentUserContext} from "../context/CurrentUserContext";
function Main({onEditAvatar, onEditProfile, onAddPlace, cards, onCardClick, onCardLike, onCardDelete}) {

    const  currentUser  = React.useContext(CurrentUserContext)
       
    
    console.log({cards})
    return (
        
        <main className="content">
            <section className="profile">
                <div className="profile__main-info">
                    <div className="profile__img-conteiner">
                        <img className="profile__avatar" src= {currentUser ? currentUser.avatar : null} alt="аватар" />
                        <button type="button" className="profile__avatar-button " alt="ручка" onClick={() => onEditAvatar()}></button>
                    </div>
                    <div className="profile__info">
                        <div className="profile__name-header">
                            <h1 className="profile__name">{ currentUser ? currentUser.name : null }</h1>
                            <button type="button" className="profile__edit-button" onClick={() => onEditProfile()}></button>
                        </div>
                        <p className="profile__job">{ currentUser ? currentUser.about : null }</p>
                    </div>
                </div>
                <button type="button" aria-label="добавить" className="profile__add-button" onClick={() => onAddPlace()}></button>
            </section>
           <ul className="photo-grid">
           
            { cards.map((card) => (
                
                    <Card key={card._id} card={card} onCardClick={onCardClick} onCardLike ={onCardLike} onCardDelete ={onCardDelete}/>
                ))}
            </ul>
            <Footer />
        </main>
       
    )
}

export default Main;
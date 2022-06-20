import React from "react";
import { CurrentUserContext } from "../context/CurrentUserContext";

function Card({ onCardClick, card, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);
  
  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
   
   const isLiked = card.likes.some(i => i === currentUser._id);
   console.log(isLiked)
   function handleClick() {
    onCardClick(card);
  }
   
  function handleDeleteClick() {
    onCardDelete(card);
  }
 
  return (
    <li className="photo-container" key={card._id}>
      <img
        className="photo-container__img"
        src={card.link}
        alt={card.name}
        onClick={handleClick}
      />
      <div className="photo-container__elements">
        <h2 className="photo-container__text">{card.name}</h2>
        <div className="photo-container__like-info">
          <button
            type="button"
            className={`photo-container__like ${
              isLiked ? "photo-container__like_active" : null
            }`}
            onClick={() => onCardLike(card)}
          ></button>
          <span className="photo-container__like_count">
            {card.likes.length}
          </span>
        </div>
      </div>
      <button
        type="button"
        className={`photo-container__dlt ${
          card.owner === currentUser._id
            ? null
            : "photo-container__dlt_hidden"
        }`}
        onClick={handleDeleteClick}
      ></button>
    </li>
  );
}
export default Card;

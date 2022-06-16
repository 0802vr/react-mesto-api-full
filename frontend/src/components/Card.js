import React from "react";
import { CurrentUserContext } from "../context/CurrentUserContext";

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = props.card.likes.some((i) => i._id === currentUser._id);

  function handleClick() {
    props.onCardClick(props.card);
  }
  function handleLikeClick() {
    props.onCardLike(props);
  }
  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  return (
    <li className="photo-container" key={props.card._id}>
      <img
        className="photo-container__img"
        src={props.card.link}
        alt={props.card.name}
        onClick={handleClick}
      />
      <div className="photo-container__elements">
        <h2 className="photo-container__text">{props.card.name}</h2>
        <div className="photo-container__like-info">
          <button
            type="button"
            className={`photo-container__like ${
              isLiked ? "photo-container__like_active" : null
            }`}
            onClick={handleLikeClick}
          ></button>
          <span className="photo-container__like_count">
            {props.card.likes.length}
          </span>
        </div>
      </div>
      <button
        type="button"
        className={`photo-container__dlt ${
          props.card.owner._id === currentUser._id
            ? null
            : "photo-container__dlt_hidden"
        }`}
        onClick={handleDeleteClick}
      ></button>
    </li>
  );
}
export default Card;

import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../context/CurrentUserContext";

function EditProfilePopup(props) {
  const { isOpen, onClose, onUpdateUser } = props;
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const currentUser = React.useContext(CurrentUserContext);

  function nameChange(e) {
    setName(e.target.value);
  }
  function descriptionChange(e) {
    setDescription(e.target.value);
  }
  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  return (
    <PopupWithForm
      name="edit"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Сохранить"
    >
      <h2 className="popup__title">Редактировать профиль</h2>

      <input
        className="popup__input popup__input_name_name"
        id="name-input"
        type="text"
        maxLength="40"
        minLength="2"
        name="inputFormName"
        placeholder="Ваше Имя"
        onChange={nameChange}
        value={name || ''}
        required
      />
      <span className="popup__error" id="name-input-error"></span>
      <input
        className="popup__input popup__input_name_job"
        id="job-input"
        type="text"
        maxLength="200"
        minLength="2"
        name="inputFormAddition"
        placeholder="Чем Вы занимаетесь"
        onChange={descriptionChange}
        value={description || ''}
        required
      />
      <span className="popup__error" id="job-input-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;

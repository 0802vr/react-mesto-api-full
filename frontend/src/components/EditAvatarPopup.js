import React from "react";
import PopupWithForm from "./PopupWithForm";
function EditAvatarPopup(props) {
  const { isOpen, onClose, onUpdateAvatar } = props;
  const refAvatar = React.useRef();

  React.useEffect(() => {
    refAvatar.current.value = "";
    
     
  }, [isOpen]);
   

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: refAvatar.current.value,
    });
    
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Сохранить"
    >
      <h2 className="popup__title">Обновить аватар</h2>

      <input
        className="popup__input popup__input_type_link popup__input_type_avatar"
        id="avatar-input"
        name="inputFormAddition"
        type="url"
        placeholder="Ссылка"
        ref={refAvatar}
        required
      />
      <span className="popup__error" id="avatar-input-error"></span>
    </PopupWithForm>
  );
}
export default EditAvatarPopup;

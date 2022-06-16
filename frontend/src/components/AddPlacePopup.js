import React from "react";
import PopupWithForm from "./PopupWithForm";
 

function AddPlacePopup(props) {
  const { isOpen, onClose, onUpdateCard } = props;
  const name = React.useRef();
  const link = React.useRef();

  React.useEffect(() => {
    name.current.value = "";
    link.current.value = "";
     
  }, [isOpen]);
  

   
  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    onUpdateCard({
      name: name.current.value,
      link: link.current.value
    });
    
  }
  
   
    return(
    <PopupWithForm
        name="add"
        title="Новое место"
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
        buttonText="Сохранить"
      >
        <h2 className="popup__title">Новое место</h2>
        <input
          className="popup__input popup__input_type_name"
          id="card-input"
          name="inputFormName"
          type="text"
          maxLength="30"
          minLength="2"
          placeholder="Место"
           
          ref={name}
          required
        />
        <span className="popup__error" id="card-input-error"></span>
        <input
          className="popup__input popup__input_type_link"
          id="link-input"
          name="inputFormAddition"
          type="url"
          placeholder="Ссылка"
          
          ref={link}
          required
        />
        <span className="popup__error" id="link-input-error"></span>
        
      </PopupWithForm>)
}
export default AddPlacePopup;
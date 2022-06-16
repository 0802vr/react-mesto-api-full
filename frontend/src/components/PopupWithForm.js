import React from "react";

function PopupWithForm(props){
    return(
        <div className={`popup popup_${props.name} ${props.isOpen && 'popup_opened'}`}>
          <div className="popup__overlay" onClick={() => props.onClose()} ></div>
          <div className="popup__container">
             <button type="button" className="popup__close-container" onClick={() => props.onClose()}></button>
               
             <form className={`popup__form popup__form-${props.name}`}  id={`${props.name}-form`} action="#" name="form" onSubmit={props.onSubmit} >
                <fieldset className="popup__fieldset">
                   {props.children}
                   <button type="submit" className="popup__save" >{props.buttonText}</button>
                </fieldset>
             </form>
          </div>
       </div>
    )
}
export default PopupWithForm;
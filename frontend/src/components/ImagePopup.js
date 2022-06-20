import React from "react";

function ImagePopup (props){
   
    return (
        <div className={`popup popup_photo ${props.link && 'popup_opened'}`}>
          <div className="popup__overlay" onClick={() => props.onClose()}></div>
          <div className="popup__slider">
             <button type="button" className="popup__close-container" onClick={() => props.onClose()}></button>
             <img className="popup__img" src={props.link} alt={props.name}/>
             <p className="popup__text">{props.name}</p>
          </div>
       </div>
    )
}
export default ImagePopup;
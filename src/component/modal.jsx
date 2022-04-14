import React from "react";

function Modal({show, setShow}){
    console.log(setShow)
    if(show){
        return (
            <>
              <div id="overlay">
                <div id="modalContent">
                  <p>This is ModalContent</p>
                  <button onClick={() => setShow(false)}>Close</button>
                </div>
              </div>
            </>
          );
    }else{
        return null;
    }
  
};

export default Modal;
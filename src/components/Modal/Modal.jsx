// Dependencies
import { useState } from "react"

const Modal = ({ modalContent, isOpen, closeButtonCallback }) => {

    return (
        <div className={`popup-wrapper ${isOpen ? 'is-open' : 'is-closed'}`}>
            <aside className="popup">
                <header className="popup-header">
                    <button className="popup-header__close" onClick={() => closeButtonCallback()}>Close</button>
                </header>
                <main className="popup-body">
                    <p className="popup-body__content">{modalContent}</p>
                </main>
            </aside>
        </div>
    )
}

export default Modal
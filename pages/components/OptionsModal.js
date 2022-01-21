import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import styles from "../../styles/OptionsModal.module.css"

// Check if question option has been selected beforehand. Ommit if it has. 

// On click, communicate selection and match to amount selection to STATE in Question component

const OptionsModal = ({ show, onClose, event, buttonId }) => {

    // Portal needed for modal. Here we put this in state to be used later.
    const [isBrowser, setIsBrowser] = useState(false);

    useEffect(() => {
        setIsBrowser(true);
    }, []);

    // Close modal when option button is clicked
    const handleCloseClick = () => {
        onClose();
    };

    // If show prop = true, show modal. Else null. 
    const modalContent = show ? (
        <div className={styles.modalOverlay} >
            <div className={styles.modal} >
                <div className={styles.modalHeader} >
                    <div className={styles.modalButtonGroup}>
                        <button
                            onClick={event => {
                                // addSelectionHandler(event, button1)
                                handleCloseClick()
                            }}
                        > Eating a banana</button>
                        <button
                            onClick={event => {
                                // addSelectionHandler(event, button2)
                                handleCloseClick()
                            }}
                        >Flying from LA to New York</button>
                        <button onClick={event => {
                            // addSelectionHandler(event, button3)
                            handleCloseClick()
                        }}>
                            Having a dental X-ray</button>
                    </div>
                </div>
            </div>
        </div>
    ) : null;

    // Portal needed for modal
    if (isBrowser) {
        return ReactDOM.createPortal(
            modalContent,
            document.getElementById("modal-root")
        );
    } else {
        return null;
    }

    const addSelectionHandler = (event, buttonId) => {
        console.log(event)
        console.log(buttonId)
    }

    const button1 = "Button 1";
    const button2 = "Button 2";
    const button3 = "Button 3";

    return (
        <div className={styles.main} >
            <div className={styles.buttongroup}>
                <button
                    onClick={event => {
                        addSelectionHandler(event, button1)
                    }}
                > Eating a banana</button>
                <button
                    onClick={event => {
                        addSelectionHandler(event, button2)
                    }}
                >Flying from LA to New York</button>
                <button onClick={event => {
                    addSelectionHandler(event, button3)
                }}>
                    Having a dental X-ray</button>
            </div>

        </div>
    )
}

export default OptionsModal;
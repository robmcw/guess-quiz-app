import React, { useEffect, useState, useContext } from "react";
import ReactDOM from "react-dom";
import styles from "../../styles/OptionsModal.module.css"
import { useRouter } from 'next/router';

// Check if question option has been selected beforehand. Ommit if it has. 

// On click, communicate selection and match to amount selection to STATE in Question component

const OptionsModal = ({ show, onClose, pieSelect, onGuess, option1Text, option2Text, option3Text, questionTitle }) => {

    const dynamicRoute = useRouter().asPath
    useEffect(() => {
        setIsBrowser(true);
        setOption1Selected(false),
            setOption2Selected(false),
            setOption3Selected(false)
    }, [dynamicRoute]);

    // Portal needed for modal. Here we put this in state to be used later.
    const [isBrowser, setIsBrowser] = useState(false);
    const [option1Selected, setOption1Selected] = useState(false);
    const [option2Selected, setOption2Selected] = useState(false);
    const [option3Selected, setOption3Selected] = useState(false);

    // Close modal when option button is clicked
    const addSelectionHandler = (buttonId, optionText) => {
        const guess = {
            [pieSelect]: optionText
        };
        onGuess(guess)
        switch (buttonId) {
            case 0:
                setOption1Selected(true)
                break;
            case 1:
                setOption2Selected(true)
                break;
            case 2:
                setOption3Selected(true)
                break;
        }
        onClose();
    };

    const option1 = () => {
        if (option1Selected === false) {
            return (
                <button
                    onClick={event => {
                        addSelectionHandler(0, option1Text)
                    }}
                > {option1Text}</button>
            )
        }
    }

    const option2 = () => {
        if (option2Selected === false) {
            return (
                <button
                    onClick={event => {
                        addSelectionHandler(1, option2Text)
                    }}
                >{option2Text}</button>
            )
        }
    }

    const option3 = () => {
        if (option3Selected === false) {
            return (
                <button onClick={event => {
                    addSelectionHandler(2, option3Text)
                }}>
                    {option3Text}</button>
            )
        }
    }

    // TODO: if option has been selected, do not show
    // If show prop = true, show modal. Else null. 
    const modalContent = () => {
        if (show) {
            return (
                <div className={styles.modalOverlay} >
                    <div className={styles.modal} >
                        <div className={styles.modalHeader} >

                            <div className={styles.modalButtonGroup}>
                                {questionTitle}
                                {option1()}
                                {option2()}
                                {option3()}
                            </div>
                        </div>
                    </div>
                </div>)
        } else {
            null
        }
    }

    // Portal needed for modal
    if (isBrowser) {
        return ReactDOM.createPortal(
            modalContent(),
            document.getElementById("modal-root")
        );
    } else {
        return null;
    }
}

export default OptionsModal;
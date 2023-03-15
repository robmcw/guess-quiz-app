
const ResetButton = ({ guessesComplete, guess1, onReset }) => {

    //Reset button only shows when gueeses are incomplete. 
    if (!guessesComplete && guess1) {
        return (
            <button
                onClick={() => {
                    onReset()
                }
                }
            >Reset
            </button>
        )
    } else {
        return (
            null
        )
    }
}

export default ResetButton;
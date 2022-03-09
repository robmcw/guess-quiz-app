import React from "react";


const ScoreContext = React.createContext({
    score: 0,
    onCorrectAnswer: () => {
    },
    value: ''
});

export default ScoreContext;
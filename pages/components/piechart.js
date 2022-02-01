
import { useState } from 'react';
import { Pie } from 'react-chartjs-2'
import Link from 'next/link'

const Piechart = ({ showResults, setShowResults, guessesComplete, questionId, questionTitle, onClick, setSelectPie, option1Text, option1Amount, option1Index, option2Text, option2Amount, option2Index, option3Text, option3Amount, option3Index, unit }) => {

    // Pie select states used to set colour of segment (blue or grey)
    const [pie1Selected, setPie1Selected] = useState(false);
    const [pie2Selected, setPie2Selected] = useState(false);
    const [pie3Selected, setPie3Selected] = useState(false);


    // If pie segment is clicked, set segment as selected and open modal
    const clickHandler = (index, option) => {
        setSelectPie(option)
        switch (index) {
            case 0:
                if (!pie1Selected) {
                    setPie1Selected(true)
                    onClick()
                }
                break;
            case 1:
                if (!pie2Selected) {
                    setPie2Selected(true)
                    onClick()
                }
                break;
            case 2:
                if (!pie3Selected) {
                    setPie3Selected(true)
                    onClick()
                }
                break;
        }
    }

    // Manage colour of selected and unselected pie segments
    const optionColors = {
        selected: '#DBDADA',
        option1: {
            unselected: '#0074C2',
        },
        option2: {
            unselected: '#0099FF',
        },
        option3: {
            unselected: '#71C3FB',
        }
    }

    const optionColor = (option, selected) => {
        if (selected === true) {
            let color = optionColors.selected
            return color
        }
        else {
            let color = optionColors[option].unselected
            return color
        }
    }

    console.log("Show resutls " + showResults)

    // If all pie segments are selected, show Results button, else show options
    if (guessesComplete && !showResults) {
        return (
            <button
                onClick={event => {
                    setShowResults(true)
                }}>
                Show results </button>
        )
    } else if (!showResults) {
        return (
            <div>
                <h1>  Here are 3 {questionTitle} . Click one to match it to a scenario.</h1>
                {<Pie
                    data={{
                        labels: [option1Amount + unit, option2Amount + unit, option3Amount + unit],
                        datasets: [
                            {
                                label: '# of votes',
                                data: [option1Amount, option2Amount, option3Amount
                                ],
                                backgroundColor: [
                                    optionColor('option1', pie1Selected),
                                    optionColor('option2', pie2Selected),
                                    optionColor('option3', pie3Selected),
                                ],
                                borderWidth: 5,
                                borderColor: '#ffffff',
                            }
                        ]
                    }}
                    height={400}
                    width={600}
                    options={{
                        onClick(evt) {
                            const points = this.getElementAtEvent(evt, 'nearest', { intersect: true }, true);
                            // Check which segment has been selected using index and pass to click handler. 
                            if (points[0]) {
                                switch (points[0]._index) {
                                    case option1Index:
                                        clickHandler(0, option1Amount);
                                        break;
                                    case option2Index:
                                        clickHandler(1, option2Amount);
                                        break;
                                    case option3Index:
                                        clickHandler(2, option3Amount);
                                        break;
                                }
                            }
                        },
                        maintainAspectRatio: false,
                        tooltips: {
                            enabled: false
                        },
                        legend: {
                            display: true
                        },
                        hover: { mode: null },

                        // TO DO – enable hover but only on segments that have not been selected. 

                        // onHover: (event, chartElement) => {
                        //     event.target.style.cursor = chartElement[0] ? 'pointer' : 'default';
                        // }

                    }}
                />}
            </div>
        )
    } else {
        return (
            null
        )
    }
}

export default Piechart;

import { useState } from 'react';
import { Pie } from 'react-chartjs-2'
import styles from '../../styles/Piechart.module.css'

const Piechart = ({ data, showResults, setShowResults, guessesComplete, onClick, setSelectPie }) => {

    const option1Amount = data.option1Amount
    const option1Index = data.option1Index
    const option2Amount = data.option2Amount
    const option2Index = data.option2Index
    const option3Amount = data.option3Amount
    const option3Index = data.option3Index
    const unit = data.unit


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

    // If all pie segments are selected, show Results button, else show options
    if (guessesComplete && !showResults) {
        return (
            <div className={"flexContainer"}>
                <h1> Great! Guesses complete. </h1>
                <button
                    onClick={event => {
                        setShowResults(true)
                    }}> Show results
                </button>
            </div>
        )
    } else if (!showResults) {
        return (
            <div>

                <div className={styles.piechart}>
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
                        height={350}
                        width={350}
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
                            hover: {
                                // { mode: null },
                                onHover: function (e) {
                                    var point = this.getElementAtEvent(e);
                                    if (point.length) e.target.style.cursor = 'pointer';
                                    else e.target.style.cursor = 'default';
                                }
                            }

                            // TO DO – enable hover but only on segments that have not been selected. 

                            // onHover: (event, chartElement) => {
                            //     event.target.style.cursor = chartElement[0] ? 'pointer' : 'default';
                            // }

                        }
                        }
                    />}
                </div>
            </div>
        )
    } else {
        return (
            null
        )
    }
}

export default Piechart;
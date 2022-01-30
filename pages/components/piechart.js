import { Pie } from 'react-chartjs-2'

const Piechart = ({ onClick, setSelectPie, option1Text, option1Amount, option1Index, option2Text, option2Amount, option2Index, option3Text, option3Amount, option3Index, unit }) => {

    const clickHandler = (option) => {
        onClick()
        setSelectPie(option)
        // TODO Set SELECTED state to SELECTED for option X
    }

    // If Option X is selected in the state, background colour for that option should be gray. 
    // TO DO: Create SELECTED state


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
        if (selected === false) {
            let color = optionColors.selected
            return color
        }
        else {
            let color = optionColors[option].unselected
            return color
        }
    }

    return (
        <div>
            {<Pie
                data={{
                    labels: [option1Amount + unit, option2Amount + unit, option3Amount + unit],
                    datasets: [
                        {
                            label: '# of votes',
                            data: [option1Amount, option2Amount, option3Amount],
                            backgroundColor: [
                                optionColor('option1', true),
                                optionColor('option2', true),
                                optionColor('option3', false),
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
                        switch (points[0]._index) {
                            case option1Index:
                                clickHandler(0);
                                break;
                            case option2Index:
                                clickHandler(1);
                                break;
                            case option3Index:
                                clickHandler(2);
                                break;
                        }
                    },
                    maintainAspectRatio: false,
                    tooltips: {
                        enabled: false
                    },
                    legend: {
                        display: true
                    }
                }}
            />}
        </div>
    )
}

export default Piechart;
import styles from "../../styles/Piechart.module.css"
import { Pie } from 'react-chartjs-2'


const Piechart = props => {
    return (
        <div>
            {<Pie
                data={{
                    labels: [props.option1 + props.unit, props.option2 + props.unit, props.option3 + props.unit],
                    datasets: [
                        {
                            label: '# of votes',
                            data: [props.option1, props.option2, props.option3],
                            backgroundColor: [
                                '#0074C2',
                                '#0099FF',
                                '#71C3FB',
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                            ],
                            borderWidth: 5,
                            borderColor: '#ffffff',
                        }
                    ]
                }}
                height={400}
                width={600}
                options={{
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
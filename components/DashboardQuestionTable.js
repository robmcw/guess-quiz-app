import styles from '../styles/DashboardQuestionTable.module.css'
import DashboardQuestionRow from '../components/DashboardQuestionRow'

const DashboardQuestionTable = (questions) => {

    const questionSet = questions.questions.questions

    // Get index number of each question (Key) and then map over each question and output data into a question table

    let table = Object.keys(questionSet).map((key) => {

        return (
            <div key={key} className={styles.flexContainer}>

                <table className={styles.questionTable}>

                    {/* <tr>
                        <td colSpan={5}>
                            <div className={styles.buttonGroup}>
                                <button className="button-sm"> Edit </button>
                                <button className="button-sm delete">Delete</button>
                            </div>
                        </td>
                    </tr> */}

                    <tbody>
                        <tr>

                            <td rowSpan={3}> {Number(key) + 1} </td>
                            <td rowSpan={3}> {questionSet[key].title} </td>
                            <td> {questionSet[key].option1Text} </td>
                            <td> {questionSet[key].option1Amount} </td>
                            <td rowSpan={3}> {questionSet[key].unit} </td>
                        </tr>
                        <tr>
                            <td> {questionSet[key].option2Text}</td>
                            <td>  {questionSet[key].option2Amount} </td>
                        </tr>
                        <tr>
                            <td> {questionSet[key].option3Text} </td>
                            <td> 3{questionSet[key].option3Amount}</td>
                        </tr>
                    </tbody>
                </table>


            </div>
        )
    })

    return (
        <div>
            {table}
        </div>
    )

}

export default DashboardQuestionTable
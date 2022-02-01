import styles from '../../styles/Home.module.css'
import Piechart from './Piechart'

//TO DO – write function to see if guess matches answer

const Results = ({ show }) => {
    if (show) {
        return (
            <div className={styles.container}>

                <main className={styles.main}>
                    <h1 className={styles.title}>
                        Correct!
                    </h1>

                    <p className={styles.subtitle}>
                        Wilst bananas are pretty radioactive when compared to other fruit and veg, just taking a flgiht from NY to LA exposes you to 1000% times more. At high altitude the air gets thinner and thinner air thus means fewer molecules to deflect incoming cosmic rays – radiation from outer space.
                    </p>

                    {/* To do: generate next question numner (n+1) to generate next question */}

                    <button className={styles.button}> Next quesiton </button>

                    <p>Piechart here</p>

                </main>

            </div>
        )
    }
    // Else if not correct, show INCORRECT page content
    else {
        return (
            null
        )
    }
}

export default Results;
import styles from '../../styles/Home.module.css'

//TO DO – write function to see if guess matches answer


const Results = ({ data, show, guess, answer }) => {

    const correctAnswer = JSON.stringify(answer) == JSON.stringify(guess);

    if (show && correctAnswer) {
        return (
            <div className={styles.container}>

                <main>
                    <h1>
                        Correct!
                    </h1>

                    {/* <p>
                        Wilst bananas are pretty radioactive when compared to other fruit and veg, just taking a flgiht from NY to LA exposes you to 1000% times more. At high altitude the air gets thinner and thinner air thus means fewer molecules to deflect incoming cosmic rays – radiation from outer space.
                    </p> */}

                    {/* To do: generate next question numner (n+1) to generate next question */}

                    <button> Next question </button>

                    <p>Piechart here</p>

                </main>

            </div>
        )
    }
    // Else if not correct, show INCORRECT page content
    else if (show && !correctAnswer) {
        return (
            <div>

                <main>
                    <h1>
                        Incorrect!
                    </h1>

                    <p>
                        Wilst bananas are pretty radioactive when compared to other fruit and veg, just taking a flgiht from NY to LA exposes you to 1000% times more. At high altitude the air gets thinner and thinner air thus means fewer molecules to deflect incoming cosmic rays – radiation from outer space.
                    </p>
                    <ul>
                        <li>{data.option1Text}: {data.option1Amount} {data.unit} </li>
                        <li>{data.option2Text}: {data.option2Amount} {data.unit}  </li>
                        <li>{data.option3Text}: {data.option3Amount} {data.unit}  </li>
                    </ul>

                    {/* <p >
                Wilst bananas are pretty radioactive when compared to other fruit and veg, just taking a flgiht from NY to LA exposes you to 1000% times more. At high altitude the air gets thinner and thinner air thus means fewer molecules to deflect incoming cosmic rays – radiation from outer space.
            </p> */}

                    {/* To do: generate next question numner (n+1) to generate next question */}

                    <button> Next quesiton </button>

                </main>

            </div>
        )
    } else {
        return (
            null
        )
    }
}

export default Results;
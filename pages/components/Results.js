import styles from '../../styles/Home.module.css'

//TO DO – write function to see if guess matches answer


const Results = ({ data, show, guess, answer }) => {

    const correctAnswer = JSON.stringify(answer) == JSON.stringify(guess);

    if (show && correctAnswer) {
        return (
            <div className={styles.container}>

                <main>

                    <h1>
                        You nailed it! 😎
                    </h1>

                    <p>{data.option1Text}: {data.option1Amount} {data.unit} </p>
                    <p>{data.option2Text}: {data.option2Amount} {data.unit}  </p>
                    <p>{data.option3Text}: {data.option3Amount} {data.unit}  </p>

                    {/* <p>
                        Wilst bananas are pretty radioactive when compared to other fruit and veg, just taking a flgiht from NY to LA exposes you to 1000% times more. At high altitude the air gets thinner and thinner air thus means fewer molecules to deflect incoming cosmic rays – radiation from outer space.
                    </p> */}

                    {/* To do: generate next question numner (n+1) to generate next question */}

                    <button> Next question </button>

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
                        Not quite! 😑
                    </h1>



                    {/* <p>
                        Wilst bananas are pretty radioactive when compared to other fruit and veg, just taking a flgiht from NY to LA exposes you to 1000% times more. At high altitude the air gets thinner and thinner air thus means fewer molecules to deflect incoming cosmic rays – radiation from outer space.
                    </p> */}

                    <p>{data.option1Text}: <b> {data.option1Amount} {data.unit} </b> </p>
                    <p>{data.option2Text}: <b> {data.option2Amount} {data.unit} </b>  </p>
                    <p>{data.option3Text}: <b> {data.option3Amount} {data.unit} </b>  </p>


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
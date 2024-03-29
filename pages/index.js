import Link from 'next/link'
import { Pie } from 'react-chartjs-2'

export default function Home() {

  const questionId = "1"

  return (
    <div className={'flexContainer'}>
      <h1>
        Piece of Pie
      </h1>
      <div className={"flexContainer"}>
        {<Pie
          data={{
            datasets: [
              {
                data: [20, 60, 20
                ],
                backgroundColor: [
                  '#0074C2', '#0099FF', '#71C3FB'
                ],
                borderWidth: 5,
                borderColor: '#ffffff',
              }
            ]
          }}
          height={250}
          width={250}
          options={{

            maintainAspectRatio: false,
            tooltips: {
              enabled: false
            },
            legend: {
              display: false
            },
            hover: {
              mode: null,
            }
          }
          }
        />}

      </div>
      <p>
        Who&apos;s richer: Donald Trump or Mark Zuckerberg?

      </p>
      <p>What&apos;s bigger: Lagos or New York?</p>
      <p>
        Play the quiz, match the segments and find out how much you really know.
      </p>


      <Link href={`/question/${questionId}`} passHref>
        <button> Start </button>
      </Link>
    </div>
  )
}

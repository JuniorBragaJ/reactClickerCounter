import { useState } from 'react'
import { useTimer } from 'react-timer-hook'; // https://www.npmjs.com/package/react-timer-hook
import './App.css'


function MyClickerCounter({ expiryTimestamp }) {
  const {
    seconds,
    start,
    restart,
  } = useTimer({ expiryTimestamp, autoStart: false, onExpire: () => console.warn('onExpire called') });


function handlePoints (count) { // Caso valor de cliques for maior que zero ele adiciona o valor a lista de pontuação
  if(count !== 0) {
    setPoints(points.concat(count))
  }
  else {
    console.log('The game has been reset!')
  }
}

  const [count, setCount] = useState(0)
  const [points, setPoints] = useState([])

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Contador de cliques </h1>

      <div className="App">
        <button
          onClick={() => {
            setCount(count + 1)
            start()
          }}
          disabled={seconds == 0 ? true : false}
        >
          Clique aqui
        </button>

        <button onClick={() => {
          setCount(0)
          const time = new Date();
          time.setSeconds(time.getSeconds() + 10);
          restart(time, false) // restart() primeiro argumento novo tempo, segundo boolean dizendo se ja reinicia contando o tempo ou não
          handlePoints(count)
        }}>
          Resetar
        </button>

        <div style={{ fontSize: '40px' }}>{`${seconds} Segundo(s) restantes`}</div>

        <h2 style={{ fontSize: '40px' }}>Cliques em 10 segundos: {count}</h2>
        <h3 style={{ fontSize: '30px' }}>Cliques por minuto: {count * 6}</h3>
        <BestScore points={[...points]}></BestScore>
      </div>

    </div>
  );
}

function BestScore({ points }) {
  const orderedPoints = points.sort((a, b)=> { return b - a })
  return (
    <>
      <ul> <span style={{ fontSize: '25px' }}>PONTUAÇÃO:</span>
        {orderedPoints.map((score, index) => {
          return (
            <div style={{ fontSize: '20px' }} key={index}>
              <span key={index}>{score} pts</span>
            </div>
          )
        })}
      </ul>
    </>
  )
}

export default function App() {
  const time = new Date();
  time.setSeconds(time.getSeconds() + 10);
  return (
    <div>
      <MyClickerCounter expiryTimestamp={time} />
    </div>
  );
}

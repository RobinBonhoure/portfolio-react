import { useState, useEffect, useRef } from 'react'
import { Physics } from '@react-three/rapier'
import useGame from './features/useGame.jsx'
import Lights from './features/Lights.jsx'
import { Level } from './features/Level.jsx'
import Player from './features/Player.jsx'
import Boss from './features/Boss.jsx'
import FireBall from './features/FireBall.jsx'

export default function Experience() {
    const [balls, setBall] = useState([])
    const [bossStage, setBossStage] = useState(1)

    const addBall = () => {
        let x = (Math.random() - 0.5) * 5.5
        let y = 0.5
        let z = (Math.random() - 2)
        setBall([...balls, <FireBall key={balls.length} position={[x, y, z]} velocity={Math.random() / 100} />])
    }

    const blocksCount = useGame((state) => state.blocksCount)
    const blocksSeed = useGame(state => state.blocksSeed)


    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         addBall()
    //     }, 1000)
    //     return () => {
    //         clearInterval(interval)
    //     }
    // }, [])

    // setTimeout(() => {
    //             addBall()
    // }, 2000)



    return <>

        <color args={['#bdedfc']} attach="background" />

        <Physics debug={false}>
            <Lights />
            <Level count={blocksCount} seed={blocksSeed} />
            <Player />
            {/* <Boss bossStage={bossStage} /> */}
            {[...balls]}
        </Physics>

    </>
}

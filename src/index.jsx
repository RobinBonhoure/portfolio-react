import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience.jsx'
import Nav from './components/Nav'


const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
    <>
        <Nav />
        <Canvas
            shadows
            camera={{
                fov: 45,
                near: 0.1,
                far: 200,
                position: [4, 2, 6]
            }}
        >
            <Experience />
        </Canvas>
    </>
)
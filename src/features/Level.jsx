import * as THREE from 'three'
import { CuboidCollider, RigidBody } from '@react-three/rapier'
import { useMemo, useState, useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'

const boxGeometry = new THREE.BoxGeometry(1, 1, 1)

const floor1Material = new THREE.MeshStandardMaterial({ color: '#000000' })

// Define the Floor component
function Floor({ position, movementOffset }) {
    const floor = useRef();




    return (
        <RigidBody
            ref={floor}
            type="kinematicPosition"
            position={[position[0], position[1] - 0.1, position[2]]}
            restitution={0.2}
            friction={1}
        >
            <mesh castShadow>
                <boxGeometry args={[5, 0.1, 1]} />
                <meshStandardMaterial flatShading color="#000000" />
            </mesh>
        </RigidBody>
    );
}

let prevTime = 0;

// Define the Level component
export function Level() {
    const numFloors = 3;
    const initialPosition = [0, 0, 4];
    const [floors, setFloors] = useState([]);
    const groupRef = useRef();

    
    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        if (Math.round(time)>Math.round(prevTime)) {
            console.log(Math.round(time),Math.round(prevTime))
            addFloor();
        }
        prevTime = time
        groupRef.current.position.z = time;
        // groupRef.current.setNextKinematicTranslation({ x: 0, y: 0, z: time });
        //   console.log(floor.current);
    });

    const initFloors = () => {
        for (let i = 0; i < numFloors; i++) {
            setFloors((prevFloors) => [
                ...prevFloors,
                <Floor key={floors.length} position={[initialPosition[0], initialPosition[1], initialPosition[2] - i]} velocity={Math.random() / 100} />,
            ]);
        }
    };

    const addFloor = () => {
        setFloors((prevFloors) => [
            ...prevFloors,
            <Floor key={floors.length} position={[initialPosition[0], initialPosition[1], initialPosition[2] - numFloors - floors.length]} velocity={Math.random() / 100} />,
        ]);
    };

    useEffect(() => {
        // initFloors();
        // const interval = setInterval(() => {
        //     addFloor();
        // }, 1000);

        // return () => {
        //     clearInterval(interval);
        // };
    }, []);


    // setTimeout(() => {
    //     addFloor();
    //     groupRef.current.position.z += 1;
    // }, 1000)

    return (
        <group ref={groupRef}>
            {[...floors]}
        </group>
    );
}
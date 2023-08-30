import * as THREE from 'three'
import { CuboidCollider, RigidBody } from '@react-three/rapier'
import { useMemo, useState, useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'

const boxGeometry = new THREE.BoxGeometry(1, 1, 1)

const floor1Material = new THREE.MeshStandardMaterial({ color: '#000000' })
const obstacleMaterial = new THREE.MeshStandardMaterial({ color: '#00ff00' })

export function Base({ position = [0, 0, 0] }) {
    return <group position={position}>
        <mesh geometry={boxGeometry} material={floor1Material} position={[0, - 0.1, 0]} scale={[6, 0.2, 6]} receiveShadow />
    </group>
}

// Ball Component
function Ball({ position, velocity }) {
    const ballRef = useRef();

    useFrame(() => {
        // Update ball position based on velocity
        ballRef.current.position.add(velocity);
    });

    return (
        <mesh ref={ballRef} position={position}>
            <sphereGeometry args={[0.1, 32, 32]} />
            <meshStandardMaterial color="red" />
        </mesh>
    );
}


export function Boss({ position = [0, 0, 0] }) {
    const boss = useRef()

    const [speed] = useState(() => (Math.random() + 0.2) * (Math.random() < 0.5 ? - 1 : 1))

    useFrame((state) => {
        const time = state.clock.getElapsedTime()

        // const rotation = new THREE.Quaternion()
        // rotation.setFromEuler(new THREE.Euler(0, time * speed, 0))
        // boss.current.setNextKinematicRotation(rotation)
    })

    return <group position={position}>
        <RigidBody ref={boss} type="kinematicPosition" position={[0, 0.5, 0]} restitution={0.2} friction={1}>
            <mesh geometry={boxGeometry} material={obstacleMaterial} scale={[1, 1, 1]} castShadow receiveShadow />
        </RigidBody>
    </group>
}



function Floor() {
    return <>
        <RigidBody type="fixed" restitution={0.2} friction={0}>
            <CuboidCollider
                type="fixed"
                args={[3, 0.1, 3]}
                position={[0, -0.1, 0]}
                restitution={0.2}
                friction={1}
            />
        </RigidBody>
    </>
}

export function Level() {
    return <>
        <Base position={[0, 0, 0]} />
        {/* <Boss position={[0, 0, 0]} /> */}
        <Floor />
    </>
}
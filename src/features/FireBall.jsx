import { useRapier, RigidBody } from '@react-three/rapier'
import { useFrame } from '@react-three/fiber'
import { useState, useEffect, useRef } from 'react'
import * as THREE from 'three'
import useGame from './useGame.jsx'


export default function FireBall(props) {
    const body = useRef()

    
    const impulse = { x: 0, y: 0, z: props.velocity || 0.1 }
    const torque = { x: props.velocity / 10, y: 0, z: 0 }

    


    // useFrame((state, delta) => {
    // })


    useEffect(() => {
        body.current.applyImpulse(impulse, true);
        body.current.applyTorqueImpulse(torque)
        return () => {
        }
    }, [])

    return <RigidBody
        ref={body}
        canSleep={false}
        colliders="cuboid"
        restitution={0.2}
        friction={3}
        linearDamping={0.5}
        angularDamping={0.5}
        position={props.position}
    >
        <mesh castShadow>
            <boxGeometry args={[0.3, 0.3, 0.3]} />
            <meshStandardMaterial flatShading color="#ff0000" />
        </mesh>
    </RigidBody>
}
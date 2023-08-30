import { useRapier, RigidBody } from '@react-three/rapier'
import { useFrame } from '@react-three/fiber'
import { useState, useEffect, useRef } from 'react'
import * as THREE from 'three'
import useGame from './useGame.jsx'

export default function Boss() {
    const body = useRef()

    useEffect(() => {
        return () => {
        }
    }, [])

    useFrame((state) => {
        const time = state.clock.getElapsedTime()

        const rotation = new THREE.Quaternion()
        rotation.setFromEuler(new THREE.Euler(0, time, 0))
        body.current.setNextKinematicRotation(rotation)
    })

    return <RigidBody
        type="kinematicPosition"
        ref={body}
        canSleep={false}
        colliders="cuboid"
        restitution={0.2}
        friction={1}
        linearDamping={0.5}
        angularDamping={0.5}
        position={[0, 0.5, 0]}
    >
        <mesh castShadow>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial flatShading color="#00ff00" />
        </mesh>
    </RigidBody>
}
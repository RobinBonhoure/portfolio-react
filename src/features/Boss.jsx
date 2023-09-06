import { useRapier, RigidBody } from '@react-three/rapier'
import { useFrame } from '@react-three/fiber'
import { useState, useEffect, useRef } from 'react'
import * as THREE from 'three'
import useGame from './useGame.jsx'

export default function Boss(props) {
    const body = useRef()
    const body2 = useRef()


    const bossStage = {
        1: {
            position: { x: 0, y: 0, z: 0 },
            size: { x: 6, y: 0.5, z: 0.1 },
        },
    }

    useEffect(() => {
        return () => {
        }
    }, [])

    useFrame((state) => {
        const time = state.clock.getElapsedTime()

        const rotation = new THREE.Quaternion()
        rotation.setFromEuler(new THREE.Euler(0, time, 0))
        body.current.setNextKinematicRotation(rotation)
        body2.current.setNextKinematicRotation(rotation * 2)

        // Generate random x and y between -5 and 5
        const x = Math.random() * 10 - 5;
        const y = Math.random() * 10 - 5;
        // body.current.setNextKinematicPosition([x, y, 0]);
    })

    return (
        <>
            <RigidBody
                type="kinematicPosition"
                ref={body}
                mass={1}
                canSleep={false}
                colliders="cuboid"
                restitution={2}
                friction={0}
                linearDamping={0.5}
                angularDamping={0.5}
                position={[bossStage[props.bossStage].position.x, bossStage[props.bossStage].position.y + bossStage[props.bossStage].size.y / 2, bossStage[props.bossStage].position.z]}
            >
                <mesh castShadow>
                    <boxGeometry args={[bossStage[props.bossStage].size.x, bossStage[props.bossStage].size.y, bossStage[props.bossStage].size.z]} />
                    <meshStandardMaterial flatShading color="#00ff00" />
                </mesh>
            </RigidBody>
            <RigidBody
                type="kinematicPosition"
                ref={body2}
                mass={1}
                canSleep={false}
                colliders="cuboid"
                restitution={2}
                friction={0}
                linearDamping={0.5}
                angularDamping={0.5}
                position={[bossStage[props.bossStage].position.x, bossStage[props.bossStage].position.y + bossStage[props.bossStage].size.y / 2 + 0.5, bossStage[props.bossStage].position.z]}
            >
                <mesh castShadow>
                    <boxGeometry args={[bossStage[props.bossStage].size.x, bossStage[props.bossStage].size.y, bossStage[props.bossStage].size.z]} />
                    <meshStandardMaterial flatShading color="#00ff00" />
                </mesh>
            </RigidBody>
        </>
    )
}
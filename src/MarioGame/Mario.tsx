import { useKeyboardControls, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { FC, useEffect, useRef, useState } from "react";
import { MarioControls } from ".";
import { Mesh } from "three";

const Mario: FC<any> = ({ state, setState }) => {
    const [sub, get] = useKeyboardControls<MarioControls>();

    // Ref for velocity (no need for useState here)
    const velocityRef = useRef<[number, number]>([0, 0]);
    const [runAnimationFrame, setRunAnimationFrame] = useState(0);
    const [runFrameTime, setRunFrameTime] = useState(0);

    const marioRef = useRef<Mesh>(null);

    // Load Mario textures
    const textures = useTexture({
        stay: "/images/mario/MarioStanding.bmp",
        run1: "/images/mario/MarioRun1.bmp",
        run2: "/images/mario/MarioRun2.bmp",
        run3: "/images/mario/MarioRun3.bmp",
        jump: "/images/mario/MarioJump.bmp",
        die: "/images/mario/MarioDead.bmp",
    });

    // Set current texture based on state and run frame
    let currentTexture = textures.stay;
    if (state === "RUN") {
        if (runAnimationFrame === 0) currentTexture = textures.run1;
        else if (runAnimationFrame === 1) currentTexture = textures.run2;
        else currentTexture = textures.run3;
    } else if (state === "JUMP") currentTexture = textures.jump;
    else if (state === "DIE") currentTexture = textures.die;

    useFrame((_, delta) => {
        if (!marioRef.current) return;

        const { left, right, jump } = get();
        let velocity = velocityRef.current;

        // Handle running left and right
        if (right) {
            setState("RUN");
            marioRef.current.scale.x = 1;
            velocity[0] = 0.05; // Move right
        } else if (left) {
            setState("RUN");
            marioRef.current.scale.x = -1;
            velocity[0] = -0.05; // Move left
        } else {
            setState("STAY");
            velocity[0] = 0;
        }

        // Handle jumping
        if (jump && marioRef.current.position.y === -5) {
            setState("JUMP");
            velocity[1] = 0.1; // Jump upwards
        }

        // Apply gravity if Mario is above the ground
        if (marioRef.current.position.y > -5) {
            velocity[1] -= 0.01; // Gravity effect
        } else {
            marioRef.current.position.y = -5;
            velocity[1] = 0; // Stop vertical movement at ground
        }

        // Update position based on velocity
        marioRef.current.position.x += velocity[0];
        marioRef.current.position.y += velocity[1];

        // Run animation logic: cycle through RUN1, RUN2, RUN3
        if (state === "RUN") {
            setRunFrameTime(runFrameTime + delta); // Increment frame time with delta time

            if (runFrameTime > 0.1) {
                // Change frame every 0.1 seconds (adjust for desired speed)
                setRunAnimationFrame((prev) => (prev + 1) % 3); // Cycle between 0, 1, and 2
                setRunFrameTime(0); // Reset frame time
            }
        } else {
            setRunAnimationFrame(0); // Reset run animation when not running
        }
    });

    useEffect(() => {
        // Subscribe to keyboard controls (cleanup included)
        // return sub();
    }, [sub]);

    return (
        <mesh ref={marioRef}>
            <planeGeometry args={[1, 1]} />
            <meshBasicMaterial map={currentTexture} transparent />
        </mesh>
    );
};

export default Mario;

import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import {
    KeyboardControls,
    KeyboardControlsEntry,
    OrbitControls,
} from "@react-three/drei";
import Mario from "./Mario";

export enum MarioControls {
    forward = "forward",
    back = "back",
    left = "left",
    right = "right",
    jump = "jump",
}

const map: KeyboardControlsEntry<MarioControls>[] = [
    { name: MarioControls.forward, keys: ["ArrowUp", "KeyW"] },
    { name: MarioControls.back, keys: ["ArrowDown", "KeyS"] },
    { name: MarioControls.left, keys: ["ArrowLeft", "KeyA"] },
    { name: MarioControls.right, keys: ["ArrowRight", "KeyD"] },
    { name: MarioControls.jump, keys: ["Space"] },
];

const MarioGame = () => {
    const [state, setState] = useState("STAY");

    return (
        <KeyboardControls map={map}>
            <Canvas
                orthographic
                camera={{
                    left: -10,
                    right: 10,
                    top: 10,
                    bottom: -10,
                    position: [0, 0, 10],
                }}
            >
                <ambientLight intensity={2} />
                {/* <OrbitControls /> */}
                <Mario state={state} setState={setState} />
                <mesh position={[0, 0, -10]}>
                    <boxGeometry args={[20, 20, 0.1]} />
                    <meshStandardMaterial color="white" />
                </mesh>
            </Canvas>
        </KeyboardControls>
    );
};

export default MarioGame;

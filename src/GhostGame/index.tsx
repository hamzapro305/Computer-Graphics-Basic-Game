import { Canvas } from "@react-three/fiber";
import Ghost from "./Ghost";
import { useAppSelector } from "../Redux/Hooks";
import { Text } from "@react-three/drei";
import GhostLoadingScreen from "./GhostLoadingScreen";
import { useState } from "react";

const GhostGame = () => {
    const [start, setStart] = useState(false);
    const { Ghosts: ghosts, killed } = useAppSelector((s) => s.Ghost);
    return (
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
            {/* <OrbitControls /> */}
            <ambientLight intensity={2} />
            <mesh position={[0, 0, -10]}>
                <boxGeometry args={[20, 20, 0.1, 1, 1]} />
                <meshStandardMaterial color="white" />
            </mesh>
            {start && (
                <Text position={[-8, -9, 0]} color="red">
                    Killed {killed}
                </Text>
            )}
            {ghosts.map((g) => (
                <Ghost key={g.id} gh={g} />
            ))}
            {!start && <GhostLoadingScreen setStart={setStart} />}
        </Canvas>
    );
};

export default GhostGame;

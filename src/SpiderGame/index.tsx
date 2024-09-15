import { Canvas } from "@react-three/fiber";
import SpiderLoadingScreen from "./SpiderLoadingScreen";
import { useState } from "react";
import Spider from "./Spider";

const SpiderGame = () => {
    const [isStart, setIsStart] = useState(false);
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
            <Spider />
            <mesh position={[0, 0, -10]}>
                <boxGeometry args={[20, 20, 0.1, 1, 1]} />
                <meshStandardMaterial color="white" />
            </mesh>
            {!isStart && <SpiderLoadingScreen setStart={setIsStart} />}
        </Canvas>
    );
};

export default SpiderGame;

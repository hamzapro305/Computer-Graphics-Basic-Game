import { Canvas } from "@react-three/fiber";
import Plane from "./Plane";
import { OrbitControls } from "@react-three/drei";
import LoadingScreen from "./LoadingScreen";
import { useState } from "react";

const App = () => {
    const [isStart, setIsStart] = useState(false);
    return (
        <main
            style={{
                width: "100vw",
                height: "100vh",
                background: "radial-gradient(#292929, #000000)",
            }}
        >
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
                <Plane />
                <mesh position={[0, 0, -10]}>
                    <boxGeometry args={[20, 20, 0.1, 1, 1]} />
                    <meshStandardMaterial color="white" />
                </mesh>
                {!isStart && <LoadingScreen setStart={setIsStart} />}
            </Canvas>
        </main>
    );
};

export default App;

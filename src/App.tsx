import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

const App = () => {
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
                <OrbitControls />
                <ambientLight intensity={2} />
                <mesh position={[0, 0, 0]}>
                    <boxGeometry args={[20, 20, 0.1, 1, 1]} />
                    <meshStandardMaterial transparent wireframe color="red" />
                </mesh>
                <mesh position={[0, 0, -10]}>
                    <boxGeometry args={[20, 20, 0.1, 1, 1]} />
                    <meshStandardMaterial color="white" />
                </mesh>
            </Canvas>
        </main>
    );
};

export default App;

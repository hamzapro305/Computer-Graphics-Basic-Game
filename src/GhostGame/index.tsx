import { Canvas } from "@react-three/fiber";

const GhostGame = () => {
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
        </Canvas>
    );
};

export default GhostGame;

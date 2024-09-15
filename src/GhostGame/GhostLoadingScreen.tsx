import { Text, useTexture } from "@react-three/drei";
import { FC } from "react";

const GhostLoadingScreen: FC<{ setStart: (val: boolean) => void }> = ({
    setStart,
}) => {
    const ghost = useTexture("/images/skullGif.gif");

    return (
        <group position={[0, 0, -5]} onClick={() => setStart(true)}>
            <mesh position={[0, 0, -1]}>
                <boxGeometry args={[20, 20, 0.1, 1, 1]} />
                <meshStandardMaterial color="white" map={ghost} />
            </mesh>
            <Text
                scale={[1, 1, 1]}
                position={[0, -8, 0]}
                fontSize={3}
                color="red"
            >
                Click to start
            </Text>
        </group>
    );
};

export default GhostLoadingScreen;

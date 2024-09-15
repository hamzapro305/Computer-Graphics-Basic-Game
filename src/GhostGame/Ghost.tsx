import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useState, useRef, FC } from "react";
import { Mesh } from "three";
import { useAppDispatch } from "../Redux/Hooks";
import { GhostActions } from "../Redux/slices/GhostSlice";

const generateRandomXY = () => [
    Math.random() * 20 - 10,
    Math.random() * 20 - 10,
];

const Ghost: FC<{ gh: { id: string; status: "BASIC" | "RED" } }> = ({ gh }) => {
    const skull = useTexture("/images/skull.png");
    const redSkull = useTexture("/images/red-skull.png");
    const dispatch = useAppDispatch();
    const ghostRef = useRef<Mesh>(null);
    const [Position, setPosition] = useState(() => {
        const [x, y] = generateRandomXY();
        return { x, y };
    });
    const speed = 0.02;

    const getTexture = () => {
        switch (gh.status) {
            case "BASIC":
                return skull;
            case "RED":
                return redSkull;
            default:
                return skull;
        }
    };

    const addGhost = () => {
        if (gh.status === "BASIC") {
            dispatch(GhostActions.updateGhost({ id: gh.id, status: "RED" }));
            dispatch(GhostActions.addGhost());
        } else {
            dispatch(GhostActions.removeGhost(gh.id));
            dispatch(GhostActions.addGhost());
        }
    };

    useFrame(() => {
        if (ghostRef?.current) {
            const skull = ghostRef.current;

            skull.position.x += Position.x * speed;
            skull.position.y += Position.y * speed;

            if (skull.position.x > 10 || skull.position.x < -10) {
                setPosition((dir) => ({ ...dir, x: -dir.x }));
            }
            if (skull.position.y > 10 || skull.position.y < -10) {
                setPosition((dir) => ({ ...dir, y: -dir.y }));
            }
            if (
                skull.position.x == Position.x &&
                skull.position.y == Position.y
            ) {
                const [x, y] = generateRandomXY();
                setPosition({ x, y });
            }
        }
    });

    return (
        <mesh onPointerEnter={addGhost} ref={ghostRef} position={[0, 0, -9]}>
            <boxGeometry args={[2, 4, 0.1, 1, 1]} />
            <meshStandardMaterial transparent map={getTexture()} />
        </mesh>
    );
};

export default Ghost;

useTexture.preload(["/images/spider.bmp", "/images/mak3.bmp"]);

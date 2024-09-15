import { PositionalAudio, useTexture } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useState, useRef, useEffect } from "react";
import { Mesh, Vector3 } from "three";

const Plane = () => {
    const [isDead, setIsDead] = useState(false);
    const spider = useTexture("/images/spider.bmp");
    const deadSpider = useTexture("/images/mak3.bmp");
    const spiderRef = useRef<Mesh>(null);
    const speed = 0.01;

    const { pointer } = useThree();

    const [Position, setPosition] = useState({ x: 0, y: 0 });

    console.log(Position);

    const generateRandomXY = () => {
        return [Math.random() * 20 - 10, Math.random() * 20 - 10];
    };

    const getAngleBetweenPoints = (
        x1: number,
        y1: number,
        x2: number,
        y2: number
    ): number => {
        const dx = x2 - x1;
        const dy = y2 - y1;

        // Calculate the angle in radians using atan2
        const angleRadians = Math.atan2(dy, dx);

        console.log(angleRadians);

        return angleRadians;
    };

    useFrame((state, delta) => {
        if (!isDead && spiderRef?.current) {
            const spider = spiderRef.current;

            // spider.position.x += Position.x * speed;
            // spider.position.y += Position.y * speed;

            if (spider.position.x > 10 || spider.position.x < -10) {
                setPosition((dir) => ({ ...dir, x: -dir.x }));
            }
            if (spider.position.y > 10 || spider.position.y < -10) {
                setPosition((dir) => ({ ...dir, y: -dir.y }));
            }

            if (
                spider.position.x == Position.x &&
                spider.position.y == Position.y
            ) {
                const [x, y] = generateRandomXY();
                setPosition({ x, y });
            }
        }
    });

    useFrame(({ camera }) => {
        // Set Direction of spider in moving position
        if (spiderRef.current) {
            const spider = spiderRef.current;
            // Convert pointer coordinates to world coordinates if necessary
            const Px = pointer.x * 10; // Adjust scaling if needed
            const Py = pointer.y * 10; // Adjust scaling if needed

            // Calculate the angle to face the pointer
            const angleRadians = getAngleBetweenPoints(
                spider.position.x,
                spider.position.y,
                Px,
                Py
            );

            // Apply the angle to the spider's rotation around the Z-axis
            spider.rotation.z = angleRadians * Math.PI/2;
        }
    });

    return (
        <mesh
            ref={spiderRef}
            position={[2, 0, 0]}
            onClick={() => setIsDead(true)}
        >
            <boxGeometry args={[2, 2, 0.1, 1, 1]} />
            <meshStandardMaterial
                transparent
                map={isDead ? deadSpider : spider}
            />
            {isDead && (
                <PositionalAudio
                    autoplay
                    loop={false}
                    url="/sound/shoot.wav"
                    distance={3}
                />
            )}
        </mesh>
    );
};

export default Plane;

useTexture.preload(["/images/spider.bmp", "/images/mak3.bmp"]);

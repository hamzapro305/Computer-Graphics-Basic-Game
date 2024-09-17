import { PositionalAudio, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useState, useRef } from "react";
import { Mesh } from "three";

const Spider = () => {
    const [isDead, setIsDead] = useState(false);
    const spider = useTexture("/images/spider/spider.bmp");
    const deadSpider = useTexture("/images/spider/mak3.bmp");
    const spiderRef = useRef<Mesh>(null);
    const [Position, setPosition] = useState({ x: 0, y: 0 });
    const speed = 0.02;
    
    const generateRandomXY = () => [
        Math.random() * 20 - 10,
        Math.random() * 20 - 10,
    ];

    useFrame(() => {
        if (!isDead && spiderRef?.current) {
            const spider = spiderRef.current;

            spider.position.x += Position.x * speed;
            spider.position.y += Position.y * speed;

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

    return (
        <mesh
            ref={spiderRef}
            position={[0, 0, -9]}
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

export default Spider;

useTexture.preload(["/images/spider.bmp", "/images/mak3.bmp"]);

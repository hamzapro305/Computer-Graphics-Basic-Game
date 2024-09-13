import { PositionalAudio, useTexture } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useState, useRef, useEffect } from "react";

const Plane = () => {
    const [isDead, setIsDead] = useState(false);
    const spider = useTexture("/images/spider.bmp");
    const deadSpider = useTexture("/images/mak3.bmp");
    const spiderRef = useRef<any>();
    const speed = 0.05; // Control the speed of the spider

    const { pointer } = useThree();

    const [direction, setDirection] = useState({ x: 1, y: 1 }); // Random initial direction

    // Randomize initial position
    useEffect(() => {
        if (spiderRef.current) {
            spiderRef.current.position.x = Math.random() * 20 - 10; // Between -10 and 10
            spiderRef.current.position.y = Math.random() * 20 - 10; // Between -10 and 10
        }
    }, []);

    useFrame(() => {
        const Px = pointer.x;
        const py = pointer.y;

        if (!isDead && spiderRef?.current) {
            const spider = spiderRef.current;

            // Update position based on direction
            spider.position.x += direction.x * speed;
            spider.position.y += direction.y * speed;

            // Check for boundaries and reverse direction if it hits the screen's edges
            if (spider.position.x > 10 || spider.position.x < -10) {
                setDirection((dir) => ({ ...dir, x: -dir.x })); // Reverse x direction
            }
            if (spider.position.y > 10 || spider.position.y < -10) {
                setDirection((dir) => ({ ...dir, y: -dir.y })); // Reverse y direction
            }
        }
    });

    return (
        <mesh
            ref={spiderRef}
            position={[0, 0, 0]} // Start position on the left
            onClick={() => setIsDead(true)} // Stop the spider and kill it
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

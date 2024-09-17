import GhostGame from "./GhostGame";
import MarioGame from "./MarioGame";
import StoreProvider from "./Redux/StoreProvider";
import SpiderGame from "./SpiderGame";

const App = () => {
    return (
        <StoreProvider>
            <main
                style={{
                    width: "100vw",
                    height: "100vh",
                    background: "radial-gradient(#292929, #000000)",
                }}
            >
                <SpiderGame />
                {/* <GhostGame /> */}
                {/* <MarioGame /> */}
            </main>
        </StoreProvider>
    );
};

export default App;

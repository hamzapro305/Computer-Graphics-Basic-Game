import GhostGame from "./GhostGame";
import SpiderGame from "./SpiderGame";

const App = () => {
    return (
        <main
            style={{
                width: "100vw",
                height: "100vh",
                background: "radial-gradient(#292929, #000000)",
            }}
        >
            {/* <SpiderGame /> */}
            <GhostGame />
        </main>
    );
};

export default App;

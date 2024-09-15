import GhostGame from "./GhostGame";
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
                {/* <SpiderGame /> */}
                <GhostGame />
            </main>
        </StoreProvider>
    );
};

export default App;

import { useState } from "react";
import VideoBackground from "./components/VideoBackground";
import AnimatedContent from "./components/AnimatedContent";

function App() {
    const [isVideoEnded, setIsVideoEnded] = useState(false);

    return (
        <div style={{ width: "100vw", height: "100vh", overflow: "hidden" }}>
            <VideoBackground onVideoEnd={() => setIsVideoEnded(true)} />
            {isVideoEnded && <AnimatedContent />}
        </div>
    );
}

export default App;

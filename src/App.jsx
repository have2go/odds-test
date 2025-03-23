import { useEffect, useState } from "react";
import VideoBackground from "./components/VideoBackground";
import AnimatedContent from "./components/AnimatedContent/AnimatedContent";

function App() {
    const [isAnimationStarted, setIsAnimationStarted] = useState(false);

    useEffect(() => {
        // Запускаем анимации через 5 секунд
        const timer = setTimeout(() => {
            setIsAnimationStarted(true);
        }, 1000); // 5 секунд

        return () => clearTimeout(timer); // Очищаем таймер при размонтировании компонента
    }, []);

    return (
        <div style={{ width: "100vw", height: "100vh", overflow: "hidden" }}>
            <VideoBackground />
            {isAnimationStarted && <AnimatedContent />}
        </div>
    );
}

export default App;

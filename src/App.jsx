import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AnimatedContent from "./components/AnimatedContent/AnimatedContent";
import AnimatedContentVariant2 from "./components/AnimatedContentVariant2/AnimatedContentVariant2";
import AnimatedContentVariant3 from "./components/AnimatedContentVariant3/AnimatedContentVariant3";

import VariantSelector from "./components/VariantSelector/VariantSelector";

import VideoBackground from "./components/VideoBackground/VideoBackground";
import VideoBackgroundVariant2 from "./components/VideoBackgroundVariant2/VideoBackgroundVariant2";

function App() {
    return (
        <Router>
            <div style={{ width: "100vw", height: "100vh", overflow: "hidden" }}>
                <Routes>
                    {/* Главная страница - выбор варианта */}
                    <Route path="/" element={<VariantSelector />} />

                    {/* Вариант 1 */}
                    <Route
                        path="/variant1"
                        element={
                            <>
                                <VideoBackground />
                                <AnimatedContent />
                            </>
                        }
                    />

                    {/* Вариант 2 */}
                    <Route
                        path="/variant2"
                        element={
                            <>
                                <VideoBackground />
                                <AnimatedContentVariant2 />
                            </>
                        }
                    />

                    {/* Вариант 3 */}
                    <Route
                        path="/variant3"
                        element={
                            <>
                                <VideoBackgroundVariant2 />
                                <AnimatedContentVariant3 />
                            </>
                        }
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;

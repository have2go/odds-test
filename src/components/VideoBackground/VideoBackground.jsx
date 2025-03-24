import { useEffect, useRef } from "react";

const VideoBackground = () => {
    const videoRef = useRef(null);

    useEffect(() => {
        const video = videoRef.current;

        // Убедимся, что видео загружено и воспроизводится корректно
        const handleCanPlay = () => {
            video.play(); // Начинаем воспроизведение, если оно не началось автоматически
        };

        video.addEventListener("canplay", handleCanPlay);
        return () => video.removeEventListener("canplay", handleCanPlay);
    }, []);

    return (
        <video
            ref={videoRef}
            autoPlay
            muted
            loop
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                zIndex: -1,
            }}
        >
            <source src="/video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
        </video>
    );
};

export default VideoBackground;

import { useEffect, useRef } from "react";

const VideoBackground = ({ onVideoEnd }) => {
    const videoRef = useRef(null);

    useEffect(() => {
        const video = videoRef.current;
        const handleEnded = () => {
            if (onVideoEnd) onVideoEnd();
        };

        video.addEventListener("ended", handleEnded);
        return () => video.removeEventListener("ended", handleEnded);
    }, [onVideoEnd]);

    return (
        <video
            ref={videoRef}
            autoPlay
            muted
            loop={false}
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

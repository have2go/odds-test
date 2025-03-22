import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

const AnimatedContent = () => {
    const textControls = useAnimation();
    const imageControls = useAnimation();
    const buttonControls = Array.from({ length: 4 }, () => useAnimation()); // Массив контроллеров для кнопок

    useEffect(() => {
        const sequence = async () => {
            // Анимация текста
            await textControls.start({ opacity: 1, y: 0, transition: { duration: 0.5 } });

            // Анимация картинки (после текста)
            await imageControls.start({
                opacity: 1,
                scale: 1,
                transition: { duration: 0.6, ease: "easeOut" },
            });

            // Анимация кнопок (последовательно)
            for (let i = 0; i < buttonControls.length; i++) {
                await buttonControls[i].start({
                    opacity: 1,
                    transition: { duration: 0.3 },
                });
            }
        };
        sequence();
    }, [textControls, imageControls, buttonControls]);

    return (
        <div
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                display: "flex",
                zIndex: 1,
                fontFamily: "'Roboto', sans-serif",
                padding: "0 5%",
                boxSizing: "border-box",
            }}
        >
            {/* Левая часть */}
            <div
                style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "white",
                }}
            >
                {/* Фраза */}
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={textControls}
                    style={{
                        fontSize: "4rem",
                        fontWeight: "bold",
                        marginBottom: "80px",
                        textShadow: "2px 2px 10px rgba(0, 0, 0, 0.8)",
                    }}
                >
                    What are the odds? ODDS is the answer
                </motion.h1>

                {/* Картинка */}
                <motion.img
                    initial={{ opacity: 0, scale: 0.8 }} // Начинаем с затемнения и меньшего размера
                    animate={imageControls}
                    src="/odds-station.png"
                    alt="ODDS Space Station"
                    style={{
                        width: "100%",
                        maxWidth: "700px",
                        height: "auto",
                    }}
                />
            </div>

            {/* Правая часть */}
            <div
                style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                {[...Array(4)].map((_, index) => (
                    <motion.button
                        key={index}
                        initial={{ opacity: 0 }} // Начинаем с прозрачности
                        animate={buttonControls[index]} // Каждая кнопка использует свой контроллер
                        whileHover={{ scale: 1.1 }}
                        style={{
                            display: "block",
                            margin: "10px 0",
                            padding: "15px 30px",
                            backgroundColor: "white",
                            color: "black",
                            border: "none",
                            borderRadius: "8px",
                            cursor: "pointer",
                            fontFamily: "'Roboto', sans-serif",
                            fontSize: "1.2rem",
                            fontWeight: "bold",
                        }}
                    >
                        Button {index + 1} {/* Добавляем +1, чтобы отображать номер кнопки начиная с 1 */}
                    </motion.button>
                ))}
            </div>
        </div>
    );
};

export default AnimatedContent;

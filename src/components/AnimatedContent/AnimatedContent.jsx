import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import styles from "./AnimatedContent.module.css";
import { Link } from "react-router-dom";

const AnimatedContent = () => {
    const textControls = useAnimation();
    const imageControls = useAnimation();
    const buttonControls = Array.from({ length: 4 }, () => useAnimation());

    // Состояния для хранения размеров шрифтов
    const [fontSizeSecond, setFontSizeSecond] = useState(110); // Размер шрифта для второго заголовка
    const fontSizeRatio = 121 / 121; // Соотношение размеров первого и второго заголовков (~0.79)

    useEffect(() => {
        const sequence = async () => {
            await textControls.start({ opacity: 1, y: 0, transition: { duration: 0.5 } });
            await imageControls.start({
                opacity: 1,
                x: 0,
                transition: { duration: 0.6, ease: "easeOut" },
            });

            for (let i = 0; i < buttonControls.length; i++) {
                await buttonControls[i].start({
                    opacity: 1,
                    transition: { duration: 0.15 },
                });
            }
        };
        sequence();
    }, [textControls, imageControls, buttonControls]);

    useEffect(() => {
        const updateScales = () => {
            const container = document.querySelector(`.${styles.leftColumn}`);
            if (!container) return;

            // Полная ширина и высота контейнера
            const containerWidth = container.offsetWidth;
            const containerHeight = container.offsetHeight;

            // Отступы слева, справа, сверху и снизу (из CSS)
            const paddingLeft = parseFloat(getComputedStyle(container).paddingLeft);
            const paddingRight = parseFloat(getComputedStyle(container).paddingRight);
            const paddingTop = parseFloat(getComputedStyle(container).paddingTop);
            const paddingBottom = parseFloat(getComputedStyle(container).paddingBottom);

            // Доступная ширина и высота для текста
            const availableWidth = containerWidth - (paddingLeft + paddingRight);
            const availableHeight = containerHeight - (paddingTop + paddingBottom);

            const titleFirst = "What are the odds?";
            const titleSecond = "ODDS is the answer";

            const canvas = document.createElement("canvas");
            const context = canvas.getContext("2d");

            if (!context) {
                console.error("Canvas context is not available");
                return;
            }

            // Рассчитываем оптимальный размер шрифта для второго заголовка на основе ширины
            context.font = `1px SFPro`; // Измеряем ширину текста для единичного размера шрифта
            const unitWidthSecond = context.measureText(titleSecond).width;

            // Вычисляем размер шрифта, чтобы текст занимал всю доступную ширину
            const optimalFontSizeWidth = (availableWidth / unitWidthSecond) * 0.95; // Уменьшаем на 5%

            // Рассчитываем высоту строки для обоих заголовков
            const lineHeightRatio = 1.2; // Пропорциональная высота строки относительно размера шрифта
            const totalLineHeight = fontSizeRatio * lineHeightRatio + lineHeightRatio; // Высота двух строк

            // Вычисляем размер шрифта, чтобы текст помещался в доступную высоту
            const optimalFontSizeHeight = availableHeight / totalLineHeight;

            // Окончательный размер шрифта — минимальное значение между шириной и высотой
            let optimalFontSize = Math.min(optimalFontSizeWidth, optimalFontSizeHeight);

            // Ограничение максимального размера шрифта для экранов <= 1280px
            if (window.innerWidth <= 1280) {
                optimalFontSize = Math.min(optimalFontSize, 54);
            }

            setFontSizeSecond(optimalFontSize); // Устанавливаем новый размер шрифта
        };

        // Обновляем масштабы при изменении размера окна
        window.addEventListener("resize", updateScales);
        updateScales(); // Инициализация

        return () => window.removeEventListener("resize", updateScales);
    }, []);

    return (
        <div className={styles.container}>
            <Link to="/" style={{ position: "absolute", top: 20, left: 20, color: "white", textDecoration: "none" }}>
                ← Назад
            </Link>
            <div className={styles.leftColumn}>
                {/* Первый заголовок */}
                <div className="">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={textControls}
                        className={styles.title}
                        style={{ fontSize: `${fontSizeSecond * fontSizeRatio}px` }} // Применяем пропорциональный размер
                    >
                        What are the odds?
                    </motion.h1>

                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={textControls}
                        className={styles.title}
                        style={{ fontSize: `${fontSizeSecond}px` }} // Применяем динамический размер шрифта
                    >
                        ODDS is the answer
                    </motion.h1>
                </div>

                <motion.img
                    initial={{ opacity: 0, x: "-5%" }} // Начинаем за пределами экрана слева
                    animate={imageControls} // Управляем анимацией через контроллер
                    src="/odds-station.png"
                    alt="ODDS Space Station"
                    className={styles.image}
                />
            </div>

            <div className={styles.rightColumn}>
                {["Is it a real problem?", "IDEAS", "Our approach", "We are open\nto collaborate with you"].map(
                    (text, index) => (
                        <motion.button
                            key={index}
                            initial={{ opacity: 0 }}
                            animate={buttonControls[index]}
                            className={styles.button}
                        >
                            <span>{text}</span> {/* Текст кнопки */}
                            <svg
                                width="33"
                                height="8"
                                viewBox="0 0 33 8"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M32.3536 4.35355C32.5488 4.15829 32.5488 3.84171 32.3536 3.64644L29.1716 0.464464C28.9763 0.269201 28.6597 0.269201 28.4645 0.464464C28.2692 0.659726 28.2692 0.976308 28.4645 1.17157L31.2929 4L28.4645 6.82842C28.2692 7.02369 28.2692 7.34027 28.4645 7.53553C28.6597 7.73079 28.9763 7.73079 29.1716 7.53553L32.3536 4.35355ZM4.37114e-08 4.5L32 4.5L32 3.5L-4.37114e-08 3.5L4.37114e-08 4.5Z"
                                    fill="black"
                                />
                            </svg>
                        </motion.button>
                    )
                )}
            </div>
        </div>
    );
};

export default AnimatedContent;

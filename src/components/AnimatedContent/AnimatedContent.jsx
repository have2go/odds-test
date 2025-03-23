import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import styles from "./AnimatedContent.module.css";

const AnimatedContent = () => {
    const textControls = useAnimation();
    const imageControls = useAnimation();
    const buttonControls = Array.from({ length: 4 }, () => useAnimation());

    useEffect(() => {
        const sequence = async () => {
            await textControls.start({ opacity: 1, y: 0, transition: { duration: 0.5 } });

            await imageControls.start({
                opacity: 1,
                scale: 1,
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

    return (
        <div className={styles.container}>
            <div className={styles.leftColumn}>
                <motion.h1 initial={{ opacity: 0, y: -20 }} animate={textControls} className={styles.title}>
                    What are the odds?
                    <br />
                    ODDS is the answer
                </motion.h1>

                <motion.img
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={imageControls}
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

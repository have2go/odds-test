import { useNavigate } from "react-router-dom";
import styles from "./VariantSelector.module.css";

const VariantSelector = () => {
    const navigate = useNavigate();

    const handleSelectVariant = variant => {
        navigate(`/variant${variant}`);
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Выберите вариант</h1>
            <div className={styles.variants}>
                {[1, 2, 3].map(variant => (
                    <button key={variant} className={styles.variantButton} onClick={() => handleSelectVariant(variant)}>
                        {variant}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default VariantSelector;

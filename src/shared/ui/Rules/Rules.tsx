import Button from "../Button";
import styles from "./Rules.module.scss";

interface IProps {
    onClick: () => void;
}

const Rules = ({ onClick }: IProps): JSX.Element => {
    return (
        <div className={styles.rules}>
            <div className={styles.header}>Правила</div>
            <div className={styles.content}>
                <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Corporis, non laborum atque repellendus assumenda labore cum
                    provident qui quaerat soluta sequi aliquid dignissimos nobis
                    ab facilis sapiente deserunt quae eum?
                </p>
                <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Corporis, non laborum atque repellendus assumenda labore cum
                    provident qui quaerat soluta sequi aliquid dignissimos nobis
                    ab facilis sapiente deserunt quae eum?
                </p>
                <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Corporis, non laborum atque repellendus assumenda labore cum
                    provident qui quaerat soluta sequi aliquid dignissimos nobis
                    ab facilis sapiente deserunt quae eum?
                </p>
                <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Corporis, non laborum atque repellendus assumenda labore cum
                    provident qui quaerat soluta sequi aliquid dignissimos nobis
                    ab facilis sapiente deserunt quae eum?
                </p>
                <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Corporis, non laborum atque repellendus assumenda labore cum
                    provident qui quaerat soluta sequi aliquid dignissimos nobis
                    ab facilis sapiente deserunt quae eum?
                </p>
                <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Corporis, non laborum atque repellendus assumenda labore cum
                    provident qui quaerat soluta sequi aliquid dignissimos nobis
                    ab facilis sapiente deserunt quae eum?
                </p>
                <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Corporis, non laborum atque repellendus assumenda labore cum
                    provident qui quaerat soluta sequi aliquid dignissimos nobis
                    ab facilis sapiente deserunt quae eum?
                </p>
                <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Corporis, non laborum atque repellendus assumenda labore cum
                    provident qui quaerat soluta sequi aliquid dignissimos nobis
                    ab facilis sapiente deserunt quae eum?
                </p>
                <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Corporis, non laborum atque repellendus assumenda labore cum
                    provident qui quaerat soluta sequi aliquid dignissimos nobis
                    ab facilis sapiente deserunt quae eum?
                </p>
                <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Corporis, non laborum atque repellendus assumenda labore cum
                    provident qui quaerat soluta sequi aliquid dignissimos nobis
                    ab facilis sapiente deserunt quae eum?
                </p>
                <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Corporis, non laborum atque repellendus assumenda labore cum
                    provident qui quaerat soluta sequi aliquid dignissimos nobis
                    ab facilis sapiente deserunt quae eum?
                </p>
            </div>
            <div className={styles.footer}>
                <Button content="Закрыть" onClick={onClick} />
            </div>
        </div>
    );
};

export default Rules;

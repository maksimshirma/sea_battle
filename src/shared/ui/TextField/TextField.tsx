import { ChangeEventHandler } from "react";
import styles from "./TextField.module.scss";

interface IProps {
    label: string;
    name: string;
    value: string;
    placeholder: string;
    onChange: (value: string) => void;
}

const TextField = ({
    label,
    name,
    value,
    placeholder,
    onChange,
}: IProps): JSX.Element => {
    const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        const target = event.target;
        const { value } = target;
        onChange(value);
    };

    return (
        <div className={styles.container}>
            <label htmlFor={name} className={styles.label}>
                {label}
            </label>
            <input
                id={name}
                name={name}
                type="text"
                onChange={handleChange}
                value={value}
                className={styles.input}
                autoComplete="off"
                placeholder={placeholder}
            />
        </div>
    );
};

export default TextField;

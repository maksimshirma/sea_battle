import { MouseEventHandler, useState } from "react";
import styles from "./SelectField.module.scss";

interface IOption {
    label: string;
    value: string;
}

interface IProps {
    name: string;
    onChange: (value: string) => void;
    options: IOption[];
}

const SelectField = ({ options }: IProps): JSX.Element => {
    const [mode, setMode] = useState<string>(options[0].value);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleClick: MouseEventHandler<HTMLDivElement> = () => {
        setIsOpen((prev) => !prev);
    };

    const handleChangeMode: MouseEventHandler<HTMLDivElement> = ({
        currentTarget,
    }) => {
        const newMode: string | undefined = currentTarget.dataset.state;
        if (newMode && mode !== newMode) {
            setMode(newMode);
        }
    };

    return (
        <div className={styles.select} onClick={handleClick}>
            <div className={styles.select_title}>{mode}</div>
            {isOpen && (
                <div className={styles.select_content}>
                    {options &&
                        options.map((option) => {
                            return (
                                <div
                                    key={option.value}
                                    className={styles.option}
                                    data-state={option.label}
                                    onClick={handleChangeMode}
                                >
                                    {option.value}
                                </div>
                            );
                        })}
                </div>
            )}
        </div>
    );
};

export default SelectField;

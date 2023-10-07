import { MouseEventHandler, useState } from "react";
import styles from "./SelectField.module.scss";

interface IOption {
    label: string;
    value: string;
}

interface IProps {
    onChange: (value: string) => void;
    options: IOption[];
    initialValue: string;
}

const SelectField = ({
    initialValue,
    options,
    onChange,
}: IProps): JSX.Element => {
    const [active, setActive] = useState<string>(initialValue);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleClick: MouseEventHandler<HTMLButtonElement> = () => {
        setIsOpen((prev) => !prev);
    };

    const handleChangeActive: MouseEventHandler<HTMLDivElement> = ({
        currentTarget,
    }) => {
        const newActive: string | undefined = currentTarget.dataset.state;
        if (newActive && active !== newActive) {
            setActive(newActive);
            onChange(newActive);
        }
    };

    return (
        <button className={styles.select} onClick={handleClick}>
            <span className={styles.select_title}>{active}</span>
            {isOpen && (
                <div className={styles.select_content}>
                    {options &&
                        options.map((option) => {
                            return (
                                <div
                                    key={option.value}
                                    className={styles.option}
                                    data-state={option.value}
                                    onClick={handleChangeActive}
                                >
                                    {option.value}
                                </div>
                            );
                        })}
                </div>
            )}
        </button>
    );
};

export default SelectField;

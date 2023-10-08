import { MouseEventHandler, useState } from "react";
import { TModes } from "../../../app/store/gameSlice/gameSlice";
import styles from "./SelectField.module.scss";

interface IOption {
    label: TModes;
    value: string;
}

interface IProps {
    onChange: (value: IOption) => void;
    options: IOption[];
    initialValue: IOption;
}

const SelectField = ({
    initialValue,
    options,
    onChange,
}: IProps): JSX.Element => {
    const [active, setActive] = useState<IOption>(initialValue);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleClick: MouseEventHandler<HTMLButtonElement> = () => {
        setIsOpen((prev) => !prev);
    };

    const handleChangeActive: MouseEventHandler<HTMLDivElement> = ({
        currentTarget,
    }) => {
        const label = currentTarget.dataset.label as TModes;
        const newActive = options.find(
            (el: IOption) => el.label === label
        ) as IOption;
        setActive(newActive);
        onChange(newActive);
    };

    return (
        <button className={styles.select} onClick={handleClick}>
            <span className={styles.select_title}>{active.value}</span>
            {isOpen && (
                <div className={styles.select_content}>
                    {options &&
                        options.map((option) => {
                            return (
                                <div
                                    key={option.value}
                                    className={styles.option}
                                    data-label={option.label}
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

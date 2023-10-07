import IconsSVG from "./icons.svg";

interface IProps {
    name: string;
    color: string;
    size: string;
}

function Icons({ name, color, size }: IProps) {
    return (
        <svg fill={color} stroke={color} width={size} height={size}>
            <use xlinkHref={`${IconsSVG}#icon-${name}`} />
        </svg>
    );
}

export default Icons;

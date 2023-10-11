export type TDirection = "row" | "col";

export interface IShip {
    id: number;
    size: number;
    direction: TDirection;
    placed: boolean;
    x: number;
    y: number;
    shots?: number;
    startI?: number;
    startJ?: number;
    endI?: number;
    endJ?: number;
}

export const ships: IShip[] = [
    {
        id: 1,
        size: 4,
        direction: "row",
        placed: false,
        x: 0,
        y: 0,
    },
    {
        id: 2,
        size: 3,
        direction: "row",
        placed: false,
        x: 0,
        y: 0,
    },
    {
        id: 3,
        size: 3,
        direction: "row",
        placed: false,
        x: 0,
        y: 0,
    },
    {
        id: 4,
        size: 2,
        direction: "row",
        placed: false,
        x: 0,
        y: 0,
    },
    {
        id: 5,
        size: 2,
        direction: "row",
        placed: false,
        x: 0,
        y: 0,
    },
    {
        id: 6,
        size: 2,
        direction: "row",
        placed: false,
        x: 0,
        y: 0,
    },
    {
        id: 7,
        size: 1,
        direction: "row",
        placed: false,
        x: 0,
        y: 0,
    },
    {
        id: 8,
        size: 1,
        direction: "row",
        placed: false,
        x: 0,
        y: 0,
    },
    {
        id: 9,
        size: 1,
        direction: "row",
        placed: false,
        x: 0,
        y: 0,
    },
    {
        id: 10,
        size: 1,
        direction: "row",
        placed: false,
        x: 0,
        y: 0,
    },
];

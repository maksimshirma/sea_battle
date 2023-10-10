export const shot = (field: number[][], i: number, j: number): number[][] => {
    let value;
    if (field[i][j] === 1) {
        value = 2;
        field[i][j] = value;
        return field;
    }
    value = 3;
    field[i][j] = value;
    return field;
};

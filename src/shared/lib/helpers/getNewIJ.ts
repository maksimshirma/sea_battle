export const getNewIJ = ({
    startI,
    startJ,
    endI,
    endJ,
}: {
    startI: number;
    startJ: number;
    endI: number;
    endJ: number;
}): {
    newStartI: number;
    newStartJ: number;
    newEndI: number;
    newEndJ: number;
} => {
    let newStartI = startI;
    let newStartJ = startJ;
    let newEndI = endI;
    let newEndJ = endJ;
    if (startI > 0) newStartI -= 1;
    if (startJ > 0) newStartJ -= 1;
    if (endI < 9) newEndI += 1;
    if (endJ < 9) newEndJ += 1;
    return { newStartI, newStartJ, newEndI, newEndJ };
};

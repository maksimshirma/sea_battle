export function getRandomFrom<T>(...args: T[]): T {
    const index = Math.floor(Math.random() * args.length);
    return args[index];
}

/**
 * A utility function that delays the invocation of a given function until after a specified
 * wait time has elapsed since the last time the debounced function was invoked.
 *
 * @param func The function to debounce.
 * @param waitFor The number of milliseconds to delay.
 * @returns A debounced version of the provided function.
 */
export function debounce<T extends (...args: any[]) => void>(
    func: T,
    waitFor: number
) {
    let timeout: NodeJS.Timeout | null = null;

    const debounced = (...args: Parameters<T>) => {
        if (timeout !== null) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(() => {
            func(...args);
        }, waitFor);
    };

    return debounced as (...args: Parameters<T>) => void;
}

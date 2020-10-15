import { useEffect, useState } from "react";

export type Size = [number, number];

/**
 * Returns the current window size as [width, height]
 */
export function useWindowSize(): Size {
    const [windowSize, setWindowSize] = useState<Size | undefined>(void 0);

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);

        function handleResize() {
            setWindowSize([window.innerWidth, window.innerHeight]);
        }
    }, []);

    return windowSize ?? [window.innerWidth, window.innerHeight];
}

/**
 * Ensures state refresh every provided interval
 * @param msec The number of msec between each interval
 */
export function useInterval(msec: number | undefined): number {
    const [intervalNumber, setIntervalNumber] = useState(0);

    useEffect(() => {
        if (msec === undefined)
            return;

        const handle = window.setInterval(handleInterval, msec);
        return () => window.clearInterval(handle);

        function handleInterval() {
            setIntervalNumber(i => i + 1);
        }
    }, [msec]);

    return intervalNumber;
}
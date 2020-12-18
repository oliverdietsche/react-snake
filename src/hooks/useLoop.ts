import { useEffect } from 'react';

export const useLoop = (loop: () => void, intervalMs: number) => {
	useEffect(() => {
		const loopInterval = setInterval(loop, intervalMs);
		return () => {
			clearInterval(loopInterval);
		};
	}, [intervalMs, loop]);
};

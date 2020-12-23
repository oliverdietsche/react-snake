import { useRef } from 'react';

export const useSpeed = (initialSpeed: number) => {
	const speed = useRef(initialSpeed);

	const increaseSpeed = (value: number) => (speed.current = speed.current + value);

	const decreaseSpeed = (value: number) => (speed.current = speed.current - value);

	const setSpeed = (value: number) => (speed.current = value);

	const getIntervalMs = () => 1000 / speed.current;

	return { speed: speed.current, increaseSpeed, decreaseSpeed, setSpeed, getIntervalMs };
};

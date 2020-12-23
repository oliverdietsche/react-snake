import { useCallback, useEffect, useRef } from 'react';
import { TDirection } from '../types';

export const useSnakeMovement = (initialDirection: TDirection) => {
	const currentDirection = useRef<TDirection>(initialDirection);
	const nextDirection = useRef<TDirection>(initialDirection);

	const onKeyDown = useCallback((event: KeyboardEvent) => {
		const handleUp = () => {
			if (currentDirection.current === 'down') return;
			nextDirection.current = 'up';
		};
		const handleLeft = () => {
			if (currentDirection.current === 'right') return;
			nextDirection.current = 'left';
		};
		const handleDown = () => {
			if (currentDirection.current === 'up') return;
			nextDirection.current = 'down';
		};
		const handleRight = () => {
			if (currentDirection.current === 'left') return;
			nextDirection.current = 'right';
		};
		switch (event.code) {
			case 'KeyW':
				return handleUp();
			case 'ArrowUp':
				return handleUp();
			case 'KeyA':
				return handleLeft();
			case 'ArrowLeft':
				return handleLeft();
			case 'KeyS':
				return handleDown();
			case 'ArrowDown':
				return handleDown();
			case 'KeyD':
				return handleRight();
			case 'ArrowRight':
				return handleRight();
			default:
				return;
		}
	}, []);

	const setDirection = (newDirection: TDirection) => (nextDirection.current = newDirection);

	useEffect(() => {
		document.addEventListener('keydown', onKeyDown);
		return () => {
			document.removeEventListener('keydown', onKeyDown);
		};
	}, [onKeyDown]);

	return { currentDirection, nextDirection, setDirection };
};

import { useCallback, useEffect, useRef } from 'react';
import { TDirection } from '../types';

export const useSnakeMovement = (alwaysDirection = false) => {
	const direction = useRef<TDirection | null>(alwaysDirection ? 'right' : null);

	const onKeyDown = useCallback(
		(event: KeyboardEvent) => {
			const handleUp = () => {
				if (direction.current === 'down') return;
				direction.current = 'up';
			};
			const handleLeft = () => {
				if (direction.current === 'right') return;
				direction.current = 'left';
			};
			const handleDown = () => {
				if (direction.current === 'up') return;
				direction.current = 'down';
			};
			const handleRight = () => {
				if (direction.current === 'left') return;
				direction.current = 'right';
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
		},
		[direction]
	);

	const onKeyUp = useCallback(
		(event: KeyboardEvent) => {
			if (alwaysDirection) return;
			const handleKeyUp = () => {
				if (direction.current === 'up') return;
				direction.current = null;
			};
			const handleKeyLeft = () => {
				if (direction.current === 'left') return;
				direction.current = null;
			};
			const handleKeyDown = () => {
				if (direction.current === 'down') return;
				direction.current = null;
			};
			const handleKeyRight = () => {
				if (direction.current === 'right') return;
				direction.current = null;
			};
			switch (event.code) {
				case 'KeyW':
					return handleKeyUp();
				case 'ArrowUp':
					return handleKeyUp();
				case 'KeyA':
					return handleKeyLeft();
				case 'ArrowLeft':
					return handleKeyLeft();
				case 'KeyS':
					return handleKeyDown();
				case 'ArrowDown':
					return handleKeyDown();
				case 'KeyD':
					return handleKeyRight();
				case 'ArrowRight':
					return handleKeyRight();
				default:
					return;
			}
		},
		[alwaysDirection]
	);

	useEffect(() => {
		document.addEventListener('keydown', onKeyDown);
		document.addEventListener('keyup', onKeyUp);
		return () => {
			document.removeEventListener('keydown', onKeyDown);
			document.removeEventListener('keyup', onKeyUp);
		};
	}, [onKeyDown, onKeyUp]);

	return { direction: direction.current };
};

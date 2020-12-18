import { useCallback, useEffect, useRef } from 'react';
import { TDirection } from '../types';

export const useSnakeMovement = (delay: number) => {
	const lastKeyPress = useRef(Date.now());
	const direction = useRef<TDirection>('right');

	const onKeyDown = useCallback(
		(event: KeyboardEvent) => {
			if (Date.now() - lastKeyPress.current < delay * 0.5) return;
			lastKeyPress.current = Date.now();
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
		[direction, delay]
	);

	useEffect(() => {
		document.addEventListener('keydown', onKeyDown);
		return () => {
			document.removeEventListener('keydown', onKeyDown);
		};
	}, [onKeyDown]);

	return { direction: direction.current };
};

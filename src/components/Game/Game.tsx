/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { Container, Grid } from '@material-ui/core';
import { useCallback, useRef, useState } from 'react';
import { BOARD_SIZE, ROW_COUNT } from '../../config/GameConfig';
import { useLoop, useSnakeMovement } from '../../hooks';
import { useSpeed } from '../../hooks/ useSpeed';
import { ICoordinate, ISnake } from '../../interfaces';
import {
	areMatchingCoordinates,
	generateBoard,
	getRandomCoordinate,
	isCoordinateOnBoard,
	isFieldOfType,
	nextSnakeHead
} from '../../services';
import { TBoard, TDirection } from '../../types';
import { Board } from '../Board';
import { StatusBar } from '../StatusBar';

const INITIAL_VALUES: { points: number; snake: ISnake; speed: number; direction: TDirection } = {
	points: 0,
	// create fresh object everytime snake gets accessed
	get snake() {
		return {
			head: {
				row: Math.floor(ROW_COUNT / 2),
				col: 0,
			},
			tail: [],
		};
	},
	speed: 5,
	direction: 'right',
};

export function Game() {
	const [board, setBoard] = useState<TBoard>(generateBoard());
	const points = useRef(INITIAL_VALUES.points);
	const snake = useRef<ISnake>(INITIAL_VALUES.snake);
	const food = useRef(getRandomCoordinate());
	const { increaseSpeed, setSpeed, getIntervalMs } = useSpeed(INITIAL_VALUES.speed);
	const { currentDirection, nextDirection, setDirection } = useSnakeMovement(INITIAL_VALUES.direction);
	const pause = useRef(false);

	const isFieldEmpty = useCallback(
		(coordinate: ICoordinate) => {
			if (board[coordinate.row][coordinate.col] === 'empty') return true;
			return false;
		},
		[board]
	);

	const getRandomEmptyCoordinate = useCallback(() => {
		let randomCoordinate = getRandomCoordinate();
		while (!isFieldEmpty(randomCoordinate)) {
			randomCoordinate = getRandomCoordinate();
		}
		return randomCoordinate;
	}, [isFieldEmpty]);

	const restartGame = () => {
		points.current = INITIAL_VALUES.points;
		snake.current = INITIAL_VALUES.snake;
		setSpeed(INITIAL_VALUES.speed);
		setDirection(INITIAL_VALUES.direction);
		setBoard(generateBoard());
		pause.current = false;
	};

	useLoop(() => {
		if (pause.current) return;
		currentDirection.current = nextDirection.current;
		const nextHead = nextSnakeHead(snake.current, currentDirection.current);
		if (!isCoordinateOnBoard(nextHead) || isFieldOfType(nextHead, 'snake', board)) {
			pause.current = true;
			return;
		} // GAME OVER

		snake.current.tail.unshift(snake.current.head);
		snake.current.head = nextHead;
		const colletedFood = areMatchingCoordinates(nextHead, food.current);
		const fieldToRemove = !colletedFood ? snake.current.tail.pop() : null;
		if (colletedFood) {
			points.current = points.current + 1;
			increaseSpeed(0.2);
			food.current = getRandomEmptyCoordinate();
		}

		setBoard((currentBoard) => {
			currentBoard[food.current.row][food.current.col] = 'food';
			if (fieldToRemove) currentBoard[fieldToRemove.row][fieldToRemove.col] = 'empty';
			currentBoard[nextHead.row][nextHead.col] = 'snake';
			return [...currentBoard]; // change refference so that react rerenders
		});
	}, getIntervalMs());

	return (
		<Container maxWidth="md">
			<Grid container spacing={2}>
				<Grid item xs={12}>
					<div
						css={css`
							width: ${BOARD_SIZE.width}px;
							margin: 0 auto;
						`}
					>
						<StatusBar points={points.current} restart={restartGame} />
						<Board displayGrid={false} board={board} />
					</div>
				</Grid>
			</Grid>
		</Container>
	);
}

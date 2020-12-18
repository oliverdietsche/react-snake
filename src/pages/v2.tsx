/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { Container, Grid } from '@material-ui/core';
import { useCallback, useRef, useState } from 'react';
import { BoardV2, StatusBar } from '../components';
import { BOARD_SIZE, COL_COUNT, ROW_COUNT } from '../config/GameConfig';
import { useLoop, useSnakeMovement } from '../hooks';
import { useSpeed } from '../hooks/ useSpeed';
import { ICoordinate, ISnake } from '../interfaces';
import { areMatchingCoordinates, generateBoard, getRandomCoordinate, nextSnakeHead } from '../services';
import { TFieldType } from '../types';

export default function GameView() {
	const [board, setBoard] = useState<TFieldType[][]>(generateBoard());
	const points = useRef(0);
	const snake = useRef<ISnake>({
		head: {
			row: Math.floor(ROW_COUNT / 2),
			col: 0,
		},
		tail: [],
	});
	const { increaseSpeed, getIntervalMs } = useSpeed(6);
	const { direction } = useSnakeMovement(getIntervalMs());

	const isFieldEmpty = useCallback((coordinate: ICoordinate) => {
		if (coordinate.row < 0 || coordinate.row > ROW_COUNT - 1) return false;
		if (coordinate.col < 0 || coordinate.col > COL_COUNT - 1) return false;
		if (snake.current.tail.filter((tailPart) => areMatchingCoordinates(tailPart, coordinate)).length > 0)
			return false;
		return true;
	}, []);

	const getRandomEmptyCoordinate = useCallback(() => {
		let randomCoordinate = getRandomCoordinate();
		while (!isFieldEmpty(randomCoordinate)) {
			randomCoordinate = getRandomCoordinate();
		}
		return randomCoordinate;
	}, [isFieldEmpty]);

	const food = useRef(getRandomEmptyCoordinate());

	useLoop(() => {
		const nextHead = nextSnakeHead(snake.current, direction);
		if (!isFieldEmpty(nextHead)) return; // GAME OVER

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
						<StatusBar points={points.current} />
						<BoardV2 displayGrid={false} board={board} />
					</div>
				</Grid>
			</Grid>
		</Container>
	);
}

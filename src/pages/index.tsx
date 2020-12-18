/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { Container, Grid } from '@material-ui/core';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Board, StatusBar } from '../components';
import { BOARD_SIZE, COL_COUNT, ROW_COUNT } from '../config/GameConfig';
import { useLoop, useSnakeMovement } from '../hooks';
import { useSpeed } from '../hooks/ useSpeed';
import { ICoordinate, ISnake } from '../interfaces';
import { areMatchingCoordinates, getRandomCoordinate, nextSnakeHead } from '../services';
import { TFieldType } from '../types';

export default function GameView() {
	const [rerender, setRerender] = useState(false);
	const points = useRef(0);
	const food = useRef<ICoordinate>();
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

	const fieldEvaluation = useCallback((coordinate: ICoordinate): TFieldType => {
		if (areMatchingCoordinates(snake.current.head, coordinate)) return 'snake';
		if (food.current && areMatchingCoordinates(food.current, coordinate)) return 'food';
		for (const tailPart of snake.current.tail) {
			if (areMatchingCoordinates(tailPart, coordinate)) return 'snake';
		}
		return 'empty';
	}, []);

	useEffect(() => {
		food.current = getRandomEmptyCoordinate();
	}, [getRandomEmptyCoordinate]);

	useLoop(() => {
		const nextHead = nextSnakeHead(snake.current, direction);
		if (!isFieldEmpty(nextHead)) return; // GAME OVER
		snake.current.tail.unshift(snake.current.head);
		snake.current.head = nextHead;
		if (food.current && !areMatchingCoordinates(nextHead, food.current)) {
			snake.current.tail.pop();
		} else {
			points.current = points.current + 1;
			increaseSpeed(0.2);
			food.current = getRandomEmptyCoordinate();
		}
		setRerender(!rerender);
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
						<Board
							displayGrid={false}
							rowCount={ROW_COUNT}
							colCount={COL_COUNT}
							fieldEvaluation={fieldEvaluation}
						/>
					</div>
				</Grid>
			</Grid>
		</Container>
	);
}

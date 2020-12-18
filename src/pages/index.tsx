import { Container, Grid } from '@material-ui/core';
import React, { useCallback, useEffect, useState } from 'react';
import { Board } from '../components';
import { useSnakeMovement } from '../hooks';
import { ICoordinate, ISnake } from '../interfaces';
import { areMatchingCoordinates, nextSnakeHead } from '../services';
import { TFieldType } from '../types';

const INTERVAL = 200;
const ROW_COUNT = 10;
const COL_COUNT = 10;

const getRandomCoordinate = (): ICoordinate => {
	return {
		row: Math.floor(Math.random() * ROW_COUNT),
		col: Math.floor(Math.random() * COL_COUNT),
	};
};

export default function GameView() {
	const [food, setFood] = useState({ row: -1, col: -1 });
	const [snake, setSnake] = useState<ISnake>({
		head: {
			row: Math.floor(ROW_COUNT / 2),
			col: 0,
		},
		tail: [],
	});
	const { direction } = useSnakeMovement(INTERVAL);

	const isFieldEmpty = useCallback(
		(coordinate: ICoordinate) => {
			if (coordinate.row < 0 || coordinate.row > ROW_COUNT - 1) return false;
			if (coordinate.col < 0 || coordinate.col > COL_COUNT - 1) return false;
			if (snake.tail.filter((tailPart) => areMatchingCoordinates(tailPart, coordinate)).length > 0) return false;
			return true;
		},
		[snake.tail]
	);

	const getRandomEmptyCoordinate = useCallback(() => {
		let randomCoordinate = getRandomCoordinate();
		while (!isFieldEmpty(randomCoordinate)) {
			randomCoordinate = getRandomCoordinate();
		}
		return randomCoordinate;
	}, [isFieldEmpty]);

	const fieldEvaluation = useCallback(
		(coordinate: ICoordinate): TFieldType => {
			if (areMatchingCoordinates(snake.head, coordinate)) return 'snake';
			if (areMatchingCoordinates(food, coordinate)) return 'food';
			for (const tailPart of snake.tail) {
				if (areMatchingCoordinates(tailPart, coordinate)) return 'snake';
			}
			return 'empty';
		},
		[food, snake.head, snake.tail]
	);

	const loop = useCallback(() => {
		const nextHead = nextSnakeHead(snake, direction);
		if (!isFieldEmpty(nextHead)) return; // GAME OVER
		setSnake((currentSnake) => {
			currentSnake.tail.unshift(currentSnake.head);
			currentSnake.head = nextHead;
			if (!areMatchingCoordinates(nextHead, food)) {
				currentSnake.tail.pop();
			} else {
				setFood(getRandomEmptyCoordinate());
			}
			return { ...currentSnake };
		});
	}, [direction, food, getRandomEmptyCoordinate, isFieldEmpty, snake]);

	useEffect(() => {
		setFood(getRandomCoordinate());
	}, []);

	useEffect(() => {
		const loopInterval = setInterval(loop, INTERVAL);
		return () => {
			clearInterval(loopInterval);
		};
	}, [loop]);

	return (
		<Container maxWidth="md">
			<Grid container spacing={2}>
				<Grid item xs={12}>
					<Board displayGrid={false} rowCount={ROW_COUNT} colCount={COL_COUNT} fieldEvaluation={fieldEvaluation} />
				</Grid>
			</Grid>
		</Container>
	);
}

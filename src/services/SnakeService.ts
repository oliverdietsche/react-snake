import { COL_COUNT, ROW_COUNT } from '../config/GameConfig';
import { ICoordinate, ISnake } from '../interfaces';
import { TBoard, TDirection, TFieldType } from '../types';

export const nextSnakeHead = (snake: ISnake, direction: TDirection): ICoordinate => {
	switch (direction) {
		case 'up':
			return {
				row: snake.head.row - 1,
				col: snake.head.col,
			};
		case 'left':
			return {
				row: snake.head.row,
				col: snake.head.col - 1,
			};
		case 'down':
			return {
				row: snake.head.row + 1,
				col: snake.head.col,
			};
		case 'right':
			return {
				row: snake.head.row,
				col: snake.head.col + 1,
			};
		default:
			return {
				row: 0,
				col: 0,
			};
	}
};

export const areMatchingCoordinates = (c1: ICoordinate, c2: ICoordinate) => {
	if (c1.row !== c2.row) return false;
	if (c1.col !== c2.col) return false;
	return true;
};

export const getRandomCoordinate = (): ICoordinate => {
	return {
		row: Math.floor(Math.random() * ROW_COUNT),
		col: Math.floor(Math.random() * COL_COUNT),
	};
};

export const generateBoard = () => {
	const board: TBoard = [];
	for (let row = 0; row < ROW_COUNT; row++) {
		board.push([]);
		for (let col = 0; col < COL_COUNT; col++) {
			board[row].push('empty');
		}
	}
	return board;
};

export const isCoordinateOnBoard = (coordinate: ICoordinate) => {
	if (coordinate.row < 0 || coordinate.row > ROW_COUNT - 1) return false;
	if (coordinate.col < 0 || coordinate.col > COL_COUNT - 1) return false;
	return true;
};

export const isFieldOfType = (coordinate: ICoordinate, type: TFieldType, board: TBoard) => {
	if (!isCoordinateOnBoard(coordinate)) return false; // TODO: error handling
	if (board[coordinate.row][coordinate.col] === type) return true;
	return false;
};

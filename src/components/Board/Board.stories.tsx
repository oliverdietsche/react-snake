import React from 'react';
import { EMPTY_10X10_BOARD, RANDOM_10X10_BOARD } from '../../mocks/Board';
import { Board, IBoardProps } from './Board';

export default {
	title: 'Components / BoardV2',
	component: Board,
};

export const Interactive = (args: IBoardProps) => <Board {...args} />;
const INTERACTIVE_PROPS: IBoardProps = {
	board: EMPTY_10X10_BOARD,
	displayGrid: false,
};
Interactive.args = INTERACTIVE_PROPS;

export const EmptyFieldsGridVisible = () => <Board displayGrid board={EMPTY_10X10_BOARD} />;

export const EmptyFieldsGridHidden = () => <Board displayGrid={false} board={EMPTY_10X10_BOARD} />;

export const RandomFieldsGridVisible = () => <Board displayGrid board={RANDOM_10X10_BOARD} />;

export const RandomFieldsGridHidden = () => <Board displayGrid={false} board={RANDOM_10X10_BOARD} />;

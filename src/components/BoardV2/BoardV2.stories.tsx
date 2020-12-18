import React from 'react';
import { EMPTY_10X10_BOARD, RANDOM_10X10_BOARD } from '../../mocks/Board';
import { BoardV2, IBoardV2Props } from './BoardV2';

export default {
	title: 'Components / BoardV2',
	component: BoardV2,
};

export const Interactive = (args: IBoardV2Props) => <BoardV2 {...args} />;
const INTERACTIVE_PROPS: IBoardV2Props = {
	board: EMPTY_10X10_BOARD,
	displayGrid: false,
};
Interactive.args = INTERACTIVE_PROPS;

export const EmptyFieldsGridVisible = () => <BoardV2 displayGrid board={EMPTY_10X10_BOARD} />;

export const EmptyFieldsGridHidden = () => <BoardV2 displayGrid={false} board={EMPTY_10X10_BOARD} />;

export const RandomFieldsGridVisible = () => <BoardV2 displayGrid board={RANDOM_10X10_BOARD} />;

export const RandomFieldsGridHidden = () => <BoardV2 displayGrid={false} board={RANDOM_10X10_BOARD} />;

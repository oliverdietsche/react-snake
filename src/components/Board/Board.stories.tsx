import React from 'react';
import { IBoardProps, Board } from './Board';

export default {
	title: 'Components / Board',
	component: Board,
};

export const Interactive = (args: IBoardProps) => <Board {...args} />;
const INTERACTIVE_PROPS: IBoardProps = {
	colCount: 10,
	rowCount: 10,
	displayGrid: false,
};
Interactive.args = INTERACTIVE_PROPS;

export const GridVisible = () => <Board displayGrid colCount={10} rowCount={10} />;

export const GridHidden = () => <Board displayGrid={false} colCount={10} rowCount={10} />;

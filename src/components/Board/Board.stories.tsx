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
};
Interactive.args = INTERACTIVE_PROPS;

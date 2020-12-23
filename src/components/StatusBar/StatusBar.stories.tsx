import React from 'react';
import { IStatusBarProps, StatusBar } from './StatusBar';

export default {
	title: 'Components / StatusBar',
	component: StatusBar,
};

export const Interactive = (args: IStatusBarProps) => <StatusBar {...args} />;
const INTERACTIVE_PROPS: IStatusBarProps = {
	points: 12,
	restart: () => {},
};
Interactive.args = INTERACTIVE_PROPS;

export const Static = () => <StatusBar points={19} restart={() => {}} />;

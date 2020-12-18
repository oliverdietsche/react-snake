import React from 'react';
import { Field, IFieldProps } from './Field';

export default {
	title: 'Components / Field',
	component: Field,
};

const SIZE = { width: 50, height: 50 };

export const Interactive = (args: IFieldProps) => <Field {...args} />;
const INTERACTIVE_PROPS: IFieldProps = {
	type: 'empty',
	size: SIZE,
	displayGrid: true,
};
Interactive.args = INTERACTIVE_PROPS;

export const Empty = () => <Field displayGrid={false} type="empty" size={SIZE} />;
export const Snake = () => <Field displayGrid={false} type="snake" size={SIZE} />;
export const Food = () => <Field displayGrid={false} type="food" size={SIZE} />;

export const EmptyWithGrid = () => <Field displayGrid type="empty" size={SIZE} />;
export const SnakeWithGrid = () => <Field displayGrid type="snake" size={SIZE} />;
export const FoodWithGrid = () => <Field displayGrid type="food" size={SIZE} />;

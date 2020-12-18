import React from 'react';
import { IFieldProps, Field } from './Field';

export default {
	title: 'Components / Field',
	component: Field,
};

export const Interactive = (args: IFieldProps) => <Field {...args} />;
const INTERACTIVE_PROPS: IFieldProps = {
	type: 'empty',
	size: { width: 50, height: 50 },
};
Interactive.args = INTERACTIVE_PROPS;

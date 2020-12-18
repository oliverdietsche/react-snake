import React from 'react';
import { ThemeProvider } from '../src/theme/ThemeProvider';

const withThemeProvider = (Story, context) =>
	console.log(context) || (
		<ThemeProvider>
			<Story />
		</ThemeProvider>
	);

export const decorators = [withThemeProvider];

export const parameters = {
	actions: { argTypesRegex: '^on[A-Z].*' },
};

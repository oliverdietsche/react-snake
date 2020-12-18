import { createMuiTheme, responsiveFontSizes, Theme } from '@material-ui/core/styles';

export const THEME: Theme = responsiveFontSizes(
	createMuiTheme({
		palette: {
			type: 'light',
			primary: {
				light: '#A928FF',
				main: '#8000ff',
				dark: '#4F009E',
				contrastText: '#fff',
			},
			secondary: {
				light: '#ff4081',
				main: '#f50057',
				dark: '#c51162',
				contrastText: '#fff',
			},
		},
	})
);

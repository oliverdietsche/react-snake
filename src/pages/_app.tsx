import type { AppProps } from 'next/app';
import React from 'react';
import { ThemeProvider } from '../theme/ThemeProvider';

/**
 * Overwrites default App and allows to add page-wide shared code
 * @param Component - The page component that gets rendered
 * @param pageProps - The props that belong to the page component
 */
function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ThemeProvider>
			<Component {...pageProps} />
		</ThemeProvider>
	);
}

export default MyApp;

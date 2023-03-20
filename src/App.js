import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from './utils/theme';
import { routes } from './utils/constants';

export const App = () => {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<RouterProvider router={createBrowserRouter(routes)} />
		</ThemeProvider>
	);
};

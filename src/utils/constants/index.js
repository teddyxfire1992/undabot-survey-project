import { Home } from '../../screens/home';
import { Result } from '../../screens/result';
import { Error } from '../../screens/error';
import { Layout } from '../../components/layout';

export const MOCK_API_URL = 'http://localhost:3500/api/v1';

export const genericErrorMessage = {
	title: 'Error',
	message: 'Something went wrong. Please try again later.',
};

export const isDevelopment = process.env.NODE_ENV === 'development';

export const routes = [
	{
		path: '/',
		element: <Layout />,
		errorElement: <Error />,
		children: [
			{
				path: '/',
				element: <Home />,
			},
			{
				path: 'result',
				element: <Result />,
			},
		],
	},
];

import { screen, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Home } from '../screens/home';

describe('Home screen test', () => {
	it('Should initially render loading text', async () => {
		render(
			<BrowserRouter>
				<Home />
			</BrowserRouter>
		);
		const messageElement = screen.getByTestId('loading-message');
		expect(messageElement).toBeInstanceOf(HTMLSpanElement);
	});
});

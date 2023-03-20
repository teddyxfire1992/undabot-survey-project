import ReactDOM from 'react-dom/client';
import { App } from './App';
import { mockServer } from './mock-server';
import { isDevelopment } from './utils/constants';

if (isDevelopment) {
	mockServer();
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

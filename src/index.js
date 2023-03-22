import ReactDOM from 'react-dom/client';
import { App } from './App';
import { mockServer } from './mock-server';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

mockServer();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

serviceWorkerRegistration.register();

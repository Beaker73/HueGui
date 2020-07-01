import React from 'react';
import ReactDOM from 'react-dom';
import { initializeIcons, registerIcons } from '@fluentui/react';

import App from './App';
import { HueIcon } from './Components/HueIcon';

import * as serviceWorker from './serviceWorker';

initializeIcons();
registerIcons({
	icons: {
		Bridge: <HueIcon />
	}
});

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

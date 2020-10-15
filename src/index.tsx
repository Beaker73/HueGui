import React from 'react';
import ReactDOM from 'react-dom';
import { StoreProvider } from 'easy-peasy';
import { initializeIcons, registerIcons } from '@fluentui/react';

import { store } from "./Store";
import * as serviceWorker from './serviceWorker';

import App from './App';
import { HueIcon } from './Components/HueIcon';


initializeIcons();
registerIcons({
	icons: {
		Bridge: <HueIcon iconName="Bridge" />,
		Room: <HueIcon iconName="Room" />,
		Bulb: <HueIcon iconName="Bub" />,
	}
});

ReactDOM.render(
	<React.StrictMode>
		<StoreProvider store={store}>
			<App />
		</StoreProvider>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './components/App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';

messaging().setBackgroundMessageHandler(async () => {
})

AppRegistry.registerComponent(appName, () => App);

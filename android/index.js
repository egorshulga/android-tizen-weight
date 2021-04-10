import { AppRegistry } from 'react-native'
import { AppView } from './source/AppView'
import { name as appName } from './app.json'

AppRegistry.registerComponent(appName, () => AppView)

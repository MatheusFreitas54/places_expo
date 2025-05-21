import { createStaticNavigation } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import HomePage from './src/pages/Home'
import PlacePage from './src/pages/Place'

const Routes = createNativeStackNavigator({
  screens: {
    Home: HomePage,
    Place: PlacePage,
  }
})

const Navigation = createStaticNavigation(Routes)

export default function App() {
  return (
    <Navigation />
  );
}

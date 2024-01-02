import { createStackNavigator } from '@react-navigation/stack';
import Delivery from './Delivery';
import Main from './Main';

const Stack = createStackNavigator();

const MainStack = () => {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Main" component={Main}/>
            <Stack.Screen name="Delivery" component={Delivery}/>
        </Stack.Navigator>
    )
}

export default MainStack;
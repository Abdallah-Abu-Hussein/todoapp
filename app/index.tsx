import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import List from './List';
import Auth from './Auth'

const Stack = createNativeStackNavigator();

export default function index() {
	return (
		<NavigationContainer independent={true}>
			<Stack.Navigator initialRouteName="Auth">
        <Stack.Screen name="Auth" component={Auth} />
				<Stack.Screen name="My Todos" component={List} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}
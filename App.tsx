import { StyleSheet } from "react-native";
import HomeScreen from "./src/Views/HomeScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoadingScreen from "./src/Views/ErrorScreen";

export type RootStackParamList = {
	Home: undefined;
	Loading: undefined;
	Details: undefined;
	Navigation: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="Home">
				<Stack.Screen name="Home" component={HomeScreen} />
				<Stack.Screen
					name="Loading"
					component={LoadingScreen}
					options={{ headerShown: false }}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});

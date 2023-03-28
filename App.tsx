import { StyleSheet } from "react-native";
import HomeScreen from "./src/Views/HomeScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";

import LoadingScreen from "./src/Views/LoadingScreen";
import { Business, RemoteReview } from "./src/types";
import Details from "./src/Views/Details";

export type RootStackParamList = {
	Home: undefined;
	Loading: undefined;
	Details: {
		business: Business;
		reviews: RemoteReview["reviews"];
	};
	Navigation: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
	return (
		<NavigationContainer>
			<StatusBar style="auto" />
			<Stack.Navigator initialRouteName="Home">
				<Stack.Screen
					name="Home"
					component={HomeScreen}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="Loading"
					component={LoadingScreen}
					options={{ headerShown: false }}
				/>
				<Stack.Screen name="Details" component={Details} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});

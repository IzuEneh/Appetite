import { StyleSheet } from "react-native";
import HomeScreen from "./src/Views/HomeScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoadingScreen from "./src/Views/LoadingScreen";
import DetailsScreen from "./src/Views/DetailsScreen";
import { Business, Review } from "./src/types";
import Details from "./src/Views/Details";

export type RootStackParamList = {
	Home: undefined;
	Loading: undefined;
	Details: {
		business: Business;
		reviews: Review["reviews"];
	};
	Navigation: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
	return (
		<NavigationContainer>
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

import { StyleSheet } from "react-native";
import HomeScreen from "./src/Views/HomeScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoadingScreen from "./src/Views/LoadingScreen";
import DetailsScreen from "./src/Views/DetailsScreen";

export type RootStackParamList = {
	Home: undefined;
	Loading: undefined;
	Details: {
		businesses: Business[];
	};
	Navigation: undefined;
};

export type Business = {
	alias: string;
	categories: Array<{ alias: string; title: string }>;
	coordinates: {
		latitude: number;
		longitude: number;
	};
	display_phone: string;
	distance: number;
	id: string;
	image_url: string;
	is_closed: boolean;
	location: {
		address1: string;
		address2: string;
		address3: string;
		city: string;
		country: string;
		display_address: string[];
		state: string;
		zip_code: string;
	};
	name: string;
	phone: string;
	price: string;
	rating: number;
	review_count: number;
	transactions: string[];
	url: string;
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
				<Stack.Screen name="Details" component={DetailsScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});

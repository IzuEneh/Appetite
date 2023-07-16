import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";

import Details from "Modules/Details/";
import { SearchScreen } from "Modules/SearchScreen/";
import HomeScreen from "Modules/Drawer/Drawer";
import SavedRestaurantProvider from "Modules/Common/api/SavedState";

export type RootStackParamList = {
	Home: undefined;
	Details: {
		id: string;
	};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
	return (
		<NavigationContainer>
			<StatusBar style="auto" />
			<SavedRestaurantProvider>
				<Stack.Navigator initialRouteName="Home">
					<Stack.Screen
						name="Home"
						component={HomeScreen}
						options={{ headerShown: false }}
					/>
					<Stack.Screen name="Details" component={Details} />
				</Stack.Navigator>
			</SavedRestaurantProvider>
		</NavigationContainer>
	);
}

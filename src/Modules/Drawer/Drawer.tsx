import * as React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { SearchScreen } from "Modules/SearchScreen";

export type DrawerParamList = {
	Search: undefined;
};

const Drawer = createDrawerNavigator<DrawerParamList>();

function HomeScreen() {
	return (
		<Drawer.Navigator initialRouteName="Search">
			<Drawer.Screen
				name="Search"
				component={SearchScreen}
				options={{ headerShown: false }}
			/>
		</Drawer.Navigator>
	);
}

export default HomeScreen;

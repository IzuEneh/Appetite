import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { SearchScreen } from "Modules/SearchScreen";
import ListView from "./ListView";

export type DrawerParamList = {
	Search: undefined;
	Saved: undefined;
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
			<Drawer.Screen
				name="Saved"
				component={ListView}
				options={{ headerShown: false }}
			/>
		</Drawer.Navigator>
	);
}

export default HomeScreen;

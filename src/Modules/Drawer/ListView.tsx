import React from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import RestaurantTile from "./RestaurantTile";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Feather } from "@expo/vector-icons";
import { RootStackParamList } from "App";
import { DrawerParamList } from "./Drawer";
import { useSavedRestaurants } from "Modules/Common/api/SavedState";

type NavProp = CompositeScreenProps<
	DrawerScreenProps<DrawerParamList, "Saved">,
	NativeStackScreenProps<RootStackParamList>
>;

function ListView({ navigation }: NavProp) {
	const { saved } = useSavedRestaurants();

	const handlePress = (id: string) => {
		navigation.navigate("Details", { id });
	};

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Feather
					name="sidebar"
					size={44}
					color="black"
					onPress={navigation.toggleDrawer}
				/>
			</View>
			<FlatList
				data={saved}
				renderItem={({ item }) => (
					<RestaurantTile
						restaurant={item}
						onPress={() => handlePress(item.id)}
					/>
				)}
				ItemSeparatorComponent={() => <View style={styles.separator} />}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	header: {
		height: 75,
		justifyContent: "center",
	},
	container: {
		paddingHorizontal: 16,
		paddingTop: 48,
	},
	separator: {
		borderColor: "#94a3b8",
		borderWidth: 1,
	},
});

export default ListView;

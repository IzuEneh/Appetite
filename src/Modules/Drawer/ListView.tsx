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

const DATA = [
	{
		categories: [{ alias: "italian", title: "Italian" }],
		id: "nuuqDBCPz82rk2jm1-yi_w",
		image_url:
			"https://s3-media3.fl.yelpcdn.com/bphoto/Q-5ghR1UrOvDJtzFdKv2cw/o.jpg",
		name: "Amici Italian Grill",
	},
	{
		categories: [{ alias: "chinese", title: "Chinese" }],
		id: "RwZxc7vqYGOj99K1CYildQ",
		image_url:
			"https://s3-media2.fl.yelpcdn.com/bphoto/rAHNQuLBf0f2bkMcWgEKjA/o.jpg",
		name: "Ginger Beef Bistro House",
	},
	{
		categories: [{ alias: "dimsum", title: "Dim Sum" }],
		id: "mkQ31BFYV8ri7znJpHd7Ww",
		image_url:
			"https://s3-media2.fl.yelpcdn.com/bphoto/VljMdi95cuN7QG6tR52Qdw/o.jpg",
		name: "T.Pot China Bistro",
	},
	{
		categories: [{ alias: "pizza", title: "Pizza" }],
		id: "r92duI6MtSi1-seaIeQUWA",
		image_url:
			"https://s3-media4.fl.yelpcdn.com/bphoto/-9dyFfjHXQrGrP1TxCBdtQ/o.jpg",
		name: "Pizza Panorama",
	},
	{
		categories: [{ alias: "indpak", title: "Indian" }],
		id: "7UxTPaoqbbd-ZKc_7gbMow",
		image_url:
			"https://s3-media4.fl.yelpcdn.com/bphoto/co1wXvrjYNSYXIfO931I8w/o.jpg",
		name: "JPs Indian Bistro",
	},
	{
		categories: [{ alias: "vietnamese", title: "Vietnamese" }],
		id: "tps4NEm5BpoXm1YnBdEQkQ",
		image_url:
			"https://s3-media2.fl.yelpcdn.com/bphoto/tMQsWe8S9xYzL60vezocwg/o.jpg",
		name: "Saigon Pearl Vietnamese Restaurant",
	},
];

type NavProp = CompositeScreenProps<
	DrawerScreenProps<DrawerParamList, "Saved">,
	NativeStackScreenProps<RootStackParamList>
>;

function ListView({ navigation }: NavProp) {
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
				data={DATA}
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

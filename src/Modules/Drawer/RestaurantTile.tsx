import { Category } from "Modules/Common/api/types";
import { Categories } from "Modules/Details";
import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";

type SavedRestaurant = {
	id: string;
	name: string;
	image_url: string;
	categories: Category[];
};

type Props = {
	restaurant: SavedRestaurant;
	onPress: () => void;
};

function RestaurantTile({ restaurant, onPress }: Props) {
	return (
		<TouchableOpacity onPress={onPress}>
			<View style={styles.container}>
				<Image source={getImage(restaurant.image_url)} style={styles.image} />
				<View style={styles.textContainer}>
					{/**Title and category tiles */}
					<Text style={styles.title}>{restaurant.name}</Text>
					<Categories categories={restaurant.categories} />
				</View>
				<Entypo name="chevron-small-right" size={24} color="#94a3b8" />
			</View>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		flexDirection: "row",
		paddingVertical: 16,
		paddingHorizontal: 8,
		gap: 8,
	},
	image: {
		width: 85,
		height: 85,
		borderRadius: 8,
	},
	textContainer: {
		flex: 1,
		justifyContent: "flex-end",
		gap: 8,
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
	},
});

const getImage = (url: string) => {
	if (!url || url.length === 0) {
		return require("../../assets/default_image.png");
	}

	return { uri: url };
};

export default RestaurantTile;

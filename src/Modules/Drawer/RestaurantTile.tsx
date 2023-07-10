import { Category } from "Modules/Common/api/types";
import { Categories } from "Modules/Details";
import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

type SavedRestaurant = {
	id: string;
	name: string;
	image_url: string;
	categories: Category[];
};

type Props = {
	restaurant: SavedRestaurant;
};

function RestaurantTile({ restaurant }: Props) {
	return (
		<View style={styles.container}>
			<Image source={getImage(restaurant.image_url)} style={styles.image} />
			<View style={styles.textContainer}>
				{/**Title and category tiles */}
				<Text style={styles.title}>{restaurant.name}</Text>
				<Categories categories={restaurant.categories} />
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
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

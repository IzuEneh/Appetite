import React from "react";
import {
	View,
	StyleSheet,
	ImageBackground,
	Text,
	ViewStyle,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { Business } from "../../../Common/api/types";
import { Categories } from "Modules/Details/";
import Rating from "../../../Common/components/Rating";

type Props = {
	business: Business;
	style?: ViewStyle;
};

function Card({ business, style }: Props) {
	return (
		<ImageBackground
			style={[styles.cardImage, style]}
			source={{ uri: business.image_url }}
			resizeMode="cover"
		>
			<LinearGradient
				colors={["transparent", "black"]}
				locations={[0.7, 1]}
				style={styles.titleBackground}
			>
				<View style={styles.subTitleContainer}>
					<Categories
						categories={business.categories}
						color="white"
						style={styles.categories}
					/>
					<Rating
						rating={business.rating}
						textStyle={styles.rating}
						size={24}
					/>
				</View>
				<Text style={styles.cardTitle}>{business.name}</Text>
			</LinearGradient>
		</ImageBackground>
	);
}

const styles = StyleSheet.create({
	cardImage: {
		overflow: "hidden",
		borderRadius: 20,
	},
	titleBackground: {
		flex: 1,
		flexDirection: "column-reverse",
		padding: 16,
		gap: 8,
	},
	subTitleContainer: {
		flexDirection: "row",
	},
	categories: {
		flex: 1,
		flexWrap: "wrap",
	},
	rating: {
		color: "white",
	},
	cardTitle: {
		color: "#fff",
		fontSize: 24,
		fontWeight: "bold",
	},
});

export default Card;

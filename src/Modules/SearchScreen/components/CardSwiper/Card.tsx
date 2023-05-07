import React from "react";
import {
	View,
	StyleSheet,
	ImageBackground,
	Text,
	ViewStyle,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { Business } from "../../../../types";
import Categories from "../../../Details/components/Categories";
import Rating from "../../../Common/components/Rating";

type Props = {
	business: Business;
	style?: ViewStyle;
};

function Card({ business, style }: Props) {
	return (
		<View style={[style]}>
			<ImageBackground
				style={styles.cardImage}
				source={{ uri: business.image_url }}
				resizeMode="cover"
			>
				<LinearGradient
					colors={["transparent", "black"]}
					style={styles.titleBackground}
				>
					<View style={styles.subTitleContainer}>
						<Categories categories={business.categories} color="white" />
						<Rating
							rating={business.rating}
							textStyle={styles.rating}
							size={24}
						/>
					</View>
					<Text style={styles.cardTitle}>{business.name}</Text>
				</LinearGradient>
			</ImageBackground>
		</View>
	);
}

const styles = StyleSheet.create({
	cardImage: {
		width: "100%",
		height: "100%",
		overflow: "hidden",
		borderRadius: 20,
		flexDirection: "column-reverse",
	},
	cardTitle: {
		color: "#fff",
		fontSize: 24,
		fontWeight: "bold",
	},
	titleBackground: {
		width: "100%",
		height: "33%",
		flexDirection: "column-reverse",
		padding: 16,
		gap: 8,
	},
	subTitleContainer: {
		flexDirection: "row",
		// flex: 1,
	},
	rating: {
		color: "white",
	},
});

export default Card;

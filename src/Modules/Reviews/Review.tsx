import React from "react";
import { View, Text, StyleSheet, Image, ViewStyle } from "react-native";

import { LocalReview } from "../../types";
import Rating from "./Rating";

type Props = {
	review: LocalReview;
	style?: ViewStyle;
};

function Review({ review, style }: Props) {
	return (
		<View style={[styles.review, style]} key={review.id}>
			<Image source={{ uri: review.user.image_url }} style={styles.image} />
			<View style={styles.textContainer}>
				<View style={styles.topBar}>
					<Text style={styles.text}>{review.user.name}</Text>
					<Rating rating={review.rating} />
				</View>
				<Text style={{ fontSize: 16 }}>{review.text}</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	review: {
		flexDirection: "row",
		gap: 8,
		alignItems: "center",
	},
	image: {
		height: 60,
		width: 60,
		borderRadius: 100,
	},
	topBar: {
		flexDirection: "row",
		// justifyContent: "space-between",
		gap: 10,
		alignItems: "center",
	},
	text: {
		fontSize: 18,
		fontWeight: "bold",
	},
	textContainer: {
		// paddingHorizontal: 8,
	},
});

export default Review;

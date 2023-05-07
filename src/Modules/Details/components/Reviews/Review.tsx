import React from "react";
import { View, Text, StyleSheet, Image, ViewStyle } from "react-native";

import { LocalReview } from "../../../../types";
import Rating from "../../../Common/components/Rating";

type Props = {
	review: LocalReview;
	style?: ViewStyle;
};

function Review({ review, style }: Props) {
	return (
		<View style={[styles.container, style]}>
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
	container: {
		flexDirection: "row",
		gap: 16,
		alignItems: "center",
	},
	image: {
		height: 65,
		width: 65,
		borderRadius: 100,
	},
	topBar: {
		flexDirection: "row",
		gap: 10,
		alignItems: "center",
		justifyContent: "space-between",
	},
	text: {
		fontSize: 18,
		fontWeight: "bold",
	},
	textContainer: {
		flex: 1,
		gap: 4,
	},
});

export default Review;

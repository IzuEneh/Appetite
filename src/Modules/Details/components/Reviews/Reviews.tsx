import React from "react";
import { View, Text, StyleSheet, Image, ViewStyle } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import { RemoteReview } from "../../types";
import Review from "./Review";

type Props = {
	reviews: RemoteReview["reviews"];
	style?: ViewStyle;
};

function Reviews({ reviews, style }: Props) {
	return (
		<View style={[styles.container, style]}>
			<Text style={styles.title}>Reviews</Text>
			<View style={styles.reviewContainer}>
				{reviews.slice(0, 5).map((review) => (
					<Review key={review.id} review={review} />
				))}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		gap: 8,
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
	},
	reviewContainer: {
		gap: 16,
	},
});

export default Reviews;

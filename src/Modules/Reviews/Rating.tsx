import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";

function Rating({ rating, size }: { rating: string; size?: number }) {
	return (
		<View style={styles.container}>
			<Text style={styles.text}>{rating}</Text>
			<AntDesign name="star" size={size || 15} color="black" />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
	},
	text: {
		fontSize: 14,
		marginRight: 8,
	},
});

export default Rating;

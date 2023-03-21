import React from "react";
import { View, Text, StyleSheet, TextStyle } from "react-native";
import { AntDesign } from "@expo/vector-icons";

function Rating({
	rating,
	size,
	textStyle,
}: {
	rating: string;
	size?: number;
	textStyle?: TextStyle;
}) {
	return (
		<View style={styles.container}>
			<Text style={[styles.text, textStyle]}>{rating}</Text>
			<AntDesign name="star" size={size || 15} color="#eab308" />
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

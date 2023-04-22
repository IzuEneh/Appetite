import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import Checkbox from "expo-checkbox";

function CheckBoxItem({ label }: { label: string }) {
	const [isSelected, setIsSelected] = useState(false);
	return (
		<TouchableOpacity
			style={styles.checkbox}
			onPress={() => setIsSelected(!isSelected)}
		>
			<Checkbox value={isSelected} />
			<Text style={styles.categoryName}>{label}</Text>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	checkbox: {
		flexDirection: "row",
		alignItems: "center",
		marginRight: 20,
		gap: 10,
	},
	categoryName: {
		fontSize: 16,
		lineHeight: 24,
	},
});

export default CheckBoxItem;

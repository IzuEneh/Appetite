import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import Checkbox from "expo-checkbox";

type Props = {
	label: string;
	onPress: () => void;
	isSelected: boolean;
};

const CheckBoxItem = ({ label, onPress, isSelected }: Props) => {
	return (
		<TouchableOpacity style={styles.checkbox} onPress={onPress}>
			<Checkbox value={isSelected} />
			<Text style={styles.categoryName}>{label}</Text>
		</TouchableOpacity>
	);
};

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
		textTransform: "capitalize",
	},
});

export default CheckBoxItem;

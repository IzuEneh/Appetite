import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import Checkbox from "expo-checkbox";

type Props = {
	label: string;
	onPress: (label: string, isSelected: boolean) => void;
};

const CheckBoxItem = ({ label, onPress }: Props) => {
	const [isSelected, setIsSelected] = useState(false);
	return (
		<TouchableOpacity
			style={styles.checkbox}
			onPress={() => {
				setIsSelected(!isSelected);
				onPress(label, !isSelected);
			}}
		>
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
	},
});

export default CheckBoxItem;

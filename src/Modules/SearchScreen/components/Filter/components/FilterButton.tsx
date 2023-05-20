import React, { useState } from "react";
import { TouchableOpacity, StyleSheet, ViewStyle } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

type Props = {
	onChoose: () => void;
	style?: ViewStyle;
};

const FilterButton = ({ onChoose, style }: Props) => {
	return (
		<TouchableOpacity style={[styles.button, style]} onPress={onChoose}>
			<FontAwesome5 name="filter" size={28} color="white" />
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	button: {
		width: 75,
		height: 75,
		borderRadius: 50,
		backgroundColor: "#90a96e",
		justifyContent: "center",
		alignItems: "center",
	},
});

export default FilterButton;

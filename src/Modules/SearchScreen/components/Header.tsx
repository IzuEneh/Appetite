import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { Feather } from "@expo/vector-icons";

import FilterButton from "./Filter/components/FilterButton";

type Props = {
	onFilter: () => void;
	onSideBar: () => void;
	style?: ViewStyle;
};

function Header({ onFilter, onSideBar, style }: Props) {
	return (
		<View style={[styles.container, style]}>
			<Feather name="sidebar" size={44} color="black" onPress={onSideBar} />
			<FilterButton onChoose={onFilter} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 16,
	},
});

export default Header;

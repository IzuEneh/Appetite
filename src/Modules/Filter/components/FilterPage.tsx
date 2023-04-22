import React from "react";
import { View, StyleSheet, Text, TouchableHighlight } from "react-native";

import Filter from "./Filter";
import { TouchableOpacity } from "react-native-gesture-handler";
import { FilterState, useFilters } from "../api/FilterContext";

type Props = {
	onUpdateFilter: (filters: FilterState) => void;
	onCancel: () => void;
};

const FilterPage = ({ onUpdateFilter, onCancel }: Props) => {
	const filters = useFilters();

	return (
		<View style={styles.container}>
			<Filter style={styles.filter} />
			<View style={styles.formButtonContainer}>
				<TouchableHighlight
					style={styles.formButton}
					onPress={onCancel}
					underlayColor="#e2e8f0"
				>
					<Text style={[styles.buttonText, styles.cancelText]}>Cancel</Text>
				</TouchableHighlight>
				<TouchableHighlight
					underlayColor="#7dd3fc"
					style={[styles.formButton, styles.updateButton]}
					onPress={() => {
						console.log("pressed");
						onUpdateFilter(filters);
					}}
				>
					<Text style={[styles.buttonText, styles.updateText]}>Update</Text>
				</TouchableHighlight>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: "white",
		paddingTop: 8,
		paddingBottom: 100,
		paddingHorizontal: 16,
		flex: 1,
		justifyContent: "flex-start",
		alignItems: "flex-start",
	},
	filter: {
		flex: 1,
		width: "100%",
	},
	formButtonContainer: {
		flexDirection: "row",
		justifyContent: "space-evenly",
		gap: 10,
		paddingTop: 8,
		width: "100%",
	},
	formButton: {
		paddingVertical: 8,
		paddingHorizontal: 16,
		borderColor: "#0ea5e9",
		borderWidth: 2,
		borderRadius: 5,
	},
	buttonText: {
		fontSize: 22,
	},
	updateButton: {
		backgroundColor: "#0ea5e9",
	},
	updateText: {
		color: "white",
	},
	cancelText: {
		color: "#0ea5e9",
	},
});

export default FilterPage;

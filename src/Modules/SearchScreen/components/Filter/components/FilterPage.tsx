import React from "react";
import { View, StyleSheet } from "react-native";

import Filter from "./Filter";
import { FilterState, useFilters } from "../api/FilterContext";
import ButtonBar from "./BottomBar";

type Props = {
	onUpdateFilter: (filters: FilterState) => void;
	onCancel: () => void;
};

const FilterPage = ({ onUpdateFilter, onCancel }: Props) => {
	const filters = useFilters();
	const handleUpdate = () => onUpdateFilter(filters);

	return (
		<View style={styles.container}>
			<Filter style={styles.filter} />
			<ButtonBar onCancel={onCancel} onUpdate={handleUpdate} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		paddingBottom: 100,
		flex: 1,
		justifyContent: "flex-start",
		alignItems: "flex-start",
	},
	filter: {
		flex: 1,
		width: "100%",
	},
});

export default FilterPage;

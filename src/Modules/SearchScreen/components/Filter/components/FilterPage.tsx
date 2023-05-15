import React, { useState } from "react";
import { View, StyleSheet } from "react-native";

import Filter from "./Filter";
import { FilterState } from "../api/FilterContext";
import ButtonBar from "./BottomBar";

type Props = {
	filters: FilterState;
	onUpdateFilter: (filters: FilterState) => void;
	onCancel: () => void;
};

const FilterPage = ({ filters, onUpdateFilter, onCancel }: Props) => {
	const [tempFilters, setTempFilters] = useState(filters);

	const handleUpdate = () => {
		onUpdateFilter(tempFilters);
	};

	const handleCancel = () => {
		setTempFilters(filters);
		onCancel();
	};

	const handleAddItem = (item: string) => {
		if (item.includes("$")) {
			setTempFilters({
				...tempFilters,
				prices: tempFilters.prices.concat(item),
			});

			return;
		}

		setTempFilters({
			...tempFilters,
			categories: tempFilters.categories.concat(item),
		});
	};

	const handleRemoveItem = (item: string) => {
		if (item.includes("$")) {
			setTempFilters({
				...tempFilters,
				prices: tempFilters.prices.filter((price) => price != item),
			});

			return;
		}

		setTempFilters({
			...tempFilters,
			categories: tempFilters.categories.filter((cat) => cat != item),
		});
	};

	return (
		<View style={styles.container}>
			<Filter
				style={styles.filter}
				categories={tempFilters.categories}
				onAdd={handleAddItem}
				onRemove={handleRemoveItem}
			/>
			<ButtonBar onCancel={handleCancel} onUpdate={handleUpdate} />
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
	},
});

export default FilterPage;

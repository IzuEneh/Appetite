import React, { useState } from "react";
import { View, StyleSheet } from "react-native";

import { FilterState } from "../api/FilterState";
import ButtonBar from "./BottomBar";
import CategoryFilter from "./CategoryFilter";
import PriceFilter from "./PriceFilter";

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

	const handleAddPrice = (item: string) => {
		setTempFilters({
			...tempFilters,
			prices: tempFilters.prices.concat(item),
		});
	};

	const handleRemovePrice = (item: string) => {
		setTempFilters({
			...tempFilters,
			prices: tempFilters.prices.filter((price) => price != item),
		});
	};

	const handleAddCategory = (item: { alias: string; title: string }) =>
		setTempFilters({
			...tempFilters,
			categories: tempFilters.categories.concat(item),
		});

	const handleRemoveCategory = (item: { alias: string; title: string }) =>
		setTempFilters({
			...tempFilters,
			categories: tempFilters.categories.filter((cat) => cat != item),
		});

	return (
		<View style={styles.container}>
			<View style={styles.filter}>
				<PriceFilter
					selected={tempFilters.prices}
					onAdd={handleAddPrice}
					onRemove={handleRemovePrice}
				/>
				<CategoryFilter
					categories={tempFilters.categories}
					onAdd={handleAddCategory}
					onRemove={handleRemoveCategory}
				/>
			</View>
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
		gap: 10,
	},
});

export default FilterPage;

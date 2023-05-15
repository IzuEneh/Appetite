import React from "react";
import { StyleSheet, ViewStyle, View } from "react-native";

import FilterSection from "./FilterSection";
import CategoryFilter from "./CategoryFilter";

const prices = ["$", "$$", "$$$", "$$$$"];

type Props = {
	style?: ViewStyle;
	categories: string[];
	onAdd: (data: string) => void;
	onRemove: (data: string) => void;
};

const Filter = ({ style, categories, onAdd, onRemove }: Props) => {
	return (
		<View style={[styles.container, style]}>
			<FilterSection
				title="prices"
				data={prices}
				orientation="row"
				onAdd={onAdd}
				onRemove={onRemove}
			/>
			<CategoryFilter
				categories={categories}
				onAdd={onAdd}
				onRemove={onRemove}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		gap: 10,
	},
});


export default Filter;

import React from "react";
import {
	StyleSheet,
	ViewStyle,
	View,
	Text,
	TouchableOpacity,
	Pressable,
} from "react-native";
import AutocompleteInput from "react-native-autocomplete-input";
import { AntDesign } from "@expo/vector-icons";

import FilterSection from "./FilterSection";
import { categories } from "../../../../../categories";
import { useFilters, useFiltersDispatch } from "../api/FilterContext";

const prices = ["$", "$$", "$$$", "$$$$"];
const flatCategories = categories.flatMap((section) => section.data);

const filterCategories = (query: string) => {
	return flatCategories.filter((category) =>
		category.alias.toLowerCase().includes(query.toLowerCase())
	);
};

const Filter = ({ style }: { style?: ViewStyle }) => {
	const updateFilters = useFiltersDispatch();
	const { categories } = useFilters();

	const [query, setQuery] = React.useState("");
	const queriedCategories = React.useMemo(
		() => filterCategories(query),
		[query]
	);

	const suggestions = React.useMemo(
		() =>
			queriedCategories.length === 1 &&
			queriedCategories[0].title.toLowerCase() === query.toLowerCase()
				? []
				: queriedCategories,
		[queriedCategories, query]
	);

	return (
		<View style={[styles.container, style]}>
			<FilterSection title="prices" data={prices} orientation="row" />
			<AutocompleteInput
				placeholder="Enter a category..."
				autoCorrect={false}
				value={query}
				onChangeText={setQuery}
				hideResults={query.length <= 0}
				data={suggestions}
				onSubmitEditing={() => {
					if (queriedCategories.length === 1) {
						setQuery("");
						updateFilters({
							type: "add",
							data: {
								section: "categories",
								payload: queriedCategories[0].alias,
							},
						});
					}
				}}
				flatListProps={{
					keyboardShouldPersistTaps: "always",
					renderItem: ({ item }) => (
						<TouchableOpacity
							key={item.alias}
							onPress={() => {
								setQuery("");
								updateFilters({
									type: "add",
									data: {
										section: "categories",
										payload: item.alias,
									},
								});
							}}
						>
							<Text>{item.title}</Text>
						</TouchableOpacity>
					),
				}}
			/>

			<View style={styles.categoryContainer}>
				{categories.map((category) => (
					<View style={styles.category} key={category}>
						<Text>{category}</Text>
						<Pressable
							onPress={() => {
								updateFilters({
									type: "remove",
									data: {
										section: "categories",
										payload: category,
									},
								});
							}}
						>
							<AntDesign name="close" size={24} color="#082f49" />
						</Pressable>
					</View>
				))}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		gap: 10,
	},
	header: {
		fontSize: 32,
		backgroundColor: "#fff",
	},
	category: {
		paddingHorizontal: 5,
		paddingVertical: 4,
		backgroundColor: "#7dd3fc",
		borderRadius: 10,
		alignItems: "center",
		justifyContent: "space-between",
		borderWidth: 2,
		borderColor: "#0284c7",
		flexDirection: "row",
		gap: 10,
	},
	categoryContainer: {
		flexDirection: "row",
		flexWrap: "wrap",
		gap: 8,
	},
});

export default Filter;

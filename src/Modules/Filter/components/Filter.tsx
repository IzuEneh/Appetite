import React from "react";
import {
	StyleSheet,
	ScrollView,
	ViewStyle,
	SectionList,
	View,
	Text,
	TouchableOpacity,
	TextInput,
	TextInputProps,
} from "react-native";
import FilterSection from "./FilterSection";
import { categories } from "../../../categories";
import CheckBoxItem from "./CheckBoxItem";
import { FlatList } from "react-native-gesture-handler";
import AutocompleteInput from "react-native-autocomplete-input";
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

			<View>
				{categories.map((category) => (
					<View style={styles.category}>
						<Text>{category}</Text>
					</View>
				))}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		height: "75%",
		gap: 10,
	},
	header: {
		fontSize: 32,
		backgroundColor: "#fff",
	},
	category: {
		paddingHorizontal: 5,
		paddingVertical: 2,
		backgroundColor: "blue",
	},
});

export default Filter;

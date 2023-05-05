import React from "react";
import {
	StyleSheet,
	ScrollView,
	ViewStyle,
	SectionList,
	View,
	Text,
	TouchableOpacity,
} from "react-native";
import FilterSection from "./FilterSection";
import { categories } from "../../../categories";
import CheckBoxItem from "./CheckBoxItem";
import { FlatList } from "react-native-gesture-handler";
import AutocompleteInput from "react-native-autocomplete-input";

const prices = ["$", "$$", "$$$", "$$$$"];
const flatCategories = categories.flatMap((section) => section.data);

const filterCategories = (query: string) => {
	return flatCategories.filter((category) =>
		category.alias.toLowerCase().includes(query.toLowerCase())
	);
};

const Filter = ({ style }: { style?: ViewStyle }) => {
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
				flatListProps={{
					keyboardShouldPersistTaps: "always",
					renderItem: ({ item }) => (
						<TouchableOpacity onPress={() => setQuery(item.title)}>
							<Text>{item.title}</Text>
						</TouchableOpacity>
					),
				}}
			/>
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
});

export default Filter;

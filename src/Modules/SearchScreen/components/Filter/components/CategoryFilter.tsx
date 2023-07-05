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

import { categories } from "../../../../../categories";
import { Category } from "../../../../Common/api/types";

const flatCategories = categories.flatMap((section) => section.data);

type Props = {
	style?: ViewStyle;
	categories: Category[];
	onAdd: (data: Category) => void;
	onRemove: (data: Category) => void;
};

function CategoryFilter({ style, categories, onAdd, onRemove }: Props) {
	const [query, setQuery] = React.useState("");
	const queriedCategories = React.useMemo(
		() => filterCategories(query),
		[query]
	);

	const suggestions = React.useMemo(
		() =>
			queriedCategories.length === 1 &&
			queriedCategories[0].title.toLowerCase() === query.toLowerCase() &&
			queriedCategories[0].title.length === query.length
				? []
				: queriedCategories,
		[queriedCategories, query]
	);

	return (
		<View style={[styles.container, style]}>
			<Text style={styles.header}>categories</Text>
			<AutocompleteInput
				style={styles.input}
				placeholder="Enter a category..."
				autoCorrect={false}
				value={query}
				onChangeText={setQuery}
				hideResults={query.length <= 0}
				data={suggestions}
				onSubmitEditing={() => {
					if (queriedCategories.length === 1) {
						setQuery("");
						onAdd(queriedCategories[0]);
					}
				}}
				flatListProps={{
					keyboardShouldPersistTaps: "always",
					renderItem: ({ item }) => (
						<TouchableOpacity
							key={item.alias}
							onPress={() => {
								setQuery("");
								onAdd(item);
							}}
						>
							<Text>{item.title}</Text>
						</TouchableOpacity>
					),
				}}
			/>

			<View style={styles.categoryContainer}>
				{categories.map((category) => (
					<View style={styles.category} key={category.alias}>
						<Text>{category.title}</Text>
						<Pressable
							onPress={() => {
								onRemove(category);
							}}
						>
							<AntDesign name="close" size={24} color="#082f49" />
						</Pressable>
					</View>
				))}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: "100%",
	},
	header: {
		fontSize: 32,
		backgroundColor: "#fff",
		textTransform: "capitalize",
		marginBottom: 5,
	},
	input: {
		width: "100%",
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
		marginTop: 10,
	},
});

const filterCategories = (query: string) => {
	return flatCategories.filter((category) =>
		category.alias.toLowerCase().includes(query.toLowerCase())
	);
};

export default CategoryFilter;

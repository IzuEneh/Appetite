import React, { useState } from "react";
import { TouchableOpacity, StyleSheet, Text, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useActionSheet } from "@expo/react-native-action-sheet";

type Props = {
	onChoose: (category: string) => void;
};

const FilterButton = ({ onChoose }: Props) => {
	const { showActionSheetWithOptions } = useActionSheet();
	const [categories, setCategories] = useState([
		"Restaurants",
		"Bars",
		"Coffee & Tea",
		"Bakeries",
		"Desserts",
		"Fast Food",
		"Pizza",
		"Chinese",
		"Mexican",
		"Italian",
		"Seafood",
		"Thai",
		"Japanese",
		"Vietnamese",
		"Indian",
		"Cancel",
	]);

	const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

	const handleCategoryChange = (itemValue: string, itemIndex: number) => {
		const newSelectedCategories = [...selectedCategories];
		if (newSelectedCategories.includes(itemValue)) {
			newSelectedCategories.splice(newSelectedCategories.indexOf(itemValue), 1);
		} else {
			newSelectedCategories.push(itemValue);
		}
		setSelectedCategories(newSelectedCategories);
		console.log(`Selected categories: ${newSelectedCategories}`);
	};

	const handlePress = () => {
		// const destructiveButtonIndex = -1;
		// const cancelButtonIndex = options.length - 1;
		// showActionSheetWithOptions(
		// 	{
		// 		options,
		// 		cancelButtonIndex,
		// 		destructiveButtonIndex,
		// 	},
		// 	(selectedIndex: number | undefined) => {
		// 		switch (selectedIndex) {
		// 			case 1:
		// 				onChoose(options[selectedIndex]);
		// 				break;
		// 			case cancelButtonIndex:
		// 				return;
		// 		}
		// 	}
		// );
		onChoose(selectedCategories.join(", "));
	};

	return <TouchableOpacity style={styles.button} onPress={handlePress} />;
};

const styles = StyleSheet.create({
	button: {
		width: 75,
		height: 75,
		borderRadius: 50,
		backgroundColor: "green",
	},
});

export default FilterButton;

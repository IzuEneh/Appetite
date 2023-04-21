import React, { useState } from "react";
import {
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
	FlatList,
} from "react-native";
import Checkbox from "expo-checkbox";

const categories = [
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
];

const prices = ["$", "$$", "$$$", "$$$$"];

const CheckboxItem = ({ label }: { label: string }) => {
	const [isSelected, setIsSelected] = useState(false);
	return (
		<TouchableOpacity
			style={styles.checkbox}
			onPress={() => setIsSelected(!isSelected)}
		>
			<Checkbox value={isSelected} />
			<Text style={styles.categoryName}>{label}</Text>
		</TouchableOpacity>
	);
};

const CategoryForm = () => {
	return (
		<View style={styles.container}>
			<Text style={styles.header}>Prices</Text>
			<View style={{ flexDirection: "row" }}>
				{prices.map((price) => (
					<CheckboxItem label={price} key={price} />
				))}
			</View>
			<Text style={styles.header}>Categories</Text>
			<FlatList
				data={categories}
				renderItem={({ item }) => <CheckboxItem label={item} key={item} />}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		height: "85%",
		gap: 10,
	},
	checkbox: {
		flexDirection: "row",
		alignItems: "center",
		marginRight: 20,
		gap: 10,
	},
	categoryName: {
		fontSize: 16,
		lineHeight: 24,
	},
	header: {
		fontSize: 32,
		backgroundColor: "#fff",
	},
});

export default CategoryForm;

import React from "react";
import { StyleSheet, ScrollView, ViewStyle } from "react-native";
import FilterSection from "./FilterSection";

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

const Filter = ({ style }: { style?: ViewStyle }) => {
	return (
		<ScrollView style={[styles.container, style]}>
			<FilterSection title="prices" data={prices} orientation="row" />
			<FilterSection title="categories" data={categories} />
		</ScrollView>
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

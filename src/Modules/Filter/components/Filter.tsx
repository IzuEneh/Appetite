import React from "react";
import { StyleSheet, ScrollView } from "react-native";
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

const Filter = () => {
	return (
		<ScrollView style={styles.container}>
			<FilterSection title="Prices" data={prices} orientation="row" />
			<FilterSection title="Categories" data={categories} />
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

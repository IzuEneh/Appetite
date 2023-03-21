import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import { Business } from "../../../types";
import Rating from "../../Reviews/Rating";
import Categories from "./Categories";

type Props = {
	business: Business;
};

function BusinessHeader({ business }: Props) {
	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.title}>{business.name}</Text>
				<Rating rating={business.rating} size={24} textStyle={styles.rating} />
			</View>
			<Categories categories={business.categories} />
			{business.price ? (
				<Text style={styles.price}>Price: {business.price}</Text>
			) : null}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		width: "100%",
		gap: 8,
	},
	rating: {
		fontSize: 20,
		fontWeight: "500",
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
	},
	header: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	price: {
		fontSize: 16,
	},
});

export default BusinessHeader;

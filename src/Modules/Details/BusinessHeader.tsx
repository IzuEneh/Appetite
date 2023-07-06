import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { Business } from "Modules/Common/api/types";
import Rating from "Modules/Common/components/Rating";
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
			<Categories categories={business.categories} style={styles.categories} />
			{business.price ? (
				<Text style={styles.price}>Price: {business.price}</Text>
			) : null}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		gap: 8,
		flex: 1,
	},
	rating: {
		fontSize: 20,
		fontWeight: "500",
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		flex: 1,
	},
	header: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		gap: 16,
	},
	price: {
		fontSize: 16,
	},
	categories: {
		flex: 1,
		flexWrap: "wrap",
	},
});

export default BusinessHeader;

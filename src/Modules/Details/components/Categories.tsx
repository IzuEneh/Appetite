import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Business } from "../../../types";

type Props = {
	categories: Business["categories"];
};

function Categories({ categories }: Props) {
	return (
		<View style={styles.container}>
			{categories.map((cat) => (
				<View style={styles.category} key={cat.alias}>
					<Text style={styles.categoryText}>{cat.title}</Text>
				</View>
			))}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		width: "100%",
		flexDirection: "row",
		gap: 8,
	},
	category: {
		paddingHorizontal: 8,
		paddingVertical: 2,
		borderColor: "black",
		borderWidth: 2,
		borderRadius: 10,
	},
	categoryText: {
		fontSize: 14,
	},
});

export default Categories;

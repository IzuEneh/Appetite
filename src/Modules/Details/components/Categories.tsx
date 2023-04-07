import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Business } from "../../../types";

type Props = {
	categories: Business["categories"];
	color?: string;
};

function Categories({ categories, color }: Props) {
	return (
		<View style={styles.container}>
			{categories.map((cat) => (
				<View
					style={[styles.category, { borderColor: color || "black" }]}
					key={cat.alias}
				>
					<Text style={[styles.categoryText, { color: color || "black" }]}>
						{cat.title}
					</Text>
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

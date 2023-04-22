import React from "react";
import { StyleSheet, View, Text } from "react-native";
import CheckBoxItem from "./CheckBoxItem";

type Props = {
	title: string;
	data: string[];
	orientation?: "row" | "column";
};

const FilterSection = ({ title, data, orientation }: Props) => {
	return (
		<View>
			<Text style={styles.header}>{title}</Text>
			<View style={{ flexDirection: orientation ?? undefined }}>
				{data.map((item) => (
					<CheckBoxItem label={item} key={item} />
				))}
			</View>
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

export default FilterSection;

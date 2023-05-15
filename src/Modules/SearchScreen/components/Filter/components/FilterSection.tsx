import React from "react";
import { StyleSheet, View, Text } from "react-native";
import CheckBoxItem from "./CheckBoxItem";

type Props = {
	title: "prices" | "categories";
	data: string[];
	orientation?: "row" | "column";
	onAdd: (data: string) => void;
	onRemove: (data: string) => void;
};

const FilterSection = ({
	title,
	data,
	orientation,
	onAdd,
	onRemove,
}: Props) => {
	return (
		<View>
			<Text style={styles.header}>{title}</Text>
			<View style={{ flexDirection: orientation ?? undefined }}>
				{data.map((item) => (
					<CheckBoxItem
						label={item}
						key={item}
						onPress={(item, isSelected) => {
							if (isSelected) {
								onAdd(item);
							} else {
								onRemove(item);
							}
						}}
					/>
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
		textTransform: "capitalize",
	},
});

export default FilterSection;

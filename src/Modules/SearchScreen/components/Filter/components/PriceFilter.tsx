import React from "react";
import { StyleSheet, View, Text } from "react-native";
import CheckBoxItem from "./CheckBoxItem";

type Props = {
	selected: string[];
	onAdd: (data: string) => void;
	onRemove: (data: string) => void;
};

const prices = ["$", "$$", "$$$", "$$$$"];

const PriceFilter = ({ onAdd, onRemove, selected }: Props) => {
	return (
		<View>
			<Text style={styles.header}>prices</Text>
			<View style={{ flexDirection: "row" }}>
				{prices.map((item) => (
					<CheckBoxItem
						label={item}
						key={item}
						isSelected={selected.includes(item)}
						onPress={() => {
							if (!selected.includes(item)) {
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
	header: {
		fontSize: 32,
		backgroundColor: "#fff",
		textTransform: "capitalize",
	},
});

export default PriceFilter;

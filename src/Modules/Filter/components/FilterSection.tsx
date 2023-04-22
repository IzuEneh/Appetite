import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { useFiltersDispatch } from "../api/FilterContext";
import CheckBoxItem from "./CheckBoxItem";

type Props = {
	title: "prices" | "categories";
	data: string[];
	orientation?: "row" | "column";
};

const FilterSection = ({ title, data, orientation }: Props) => {
	const updateFilters = useFiltersDispatch();
	const [selected, setSelected] = React.useState<string[]>([]);

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
								updateFilters({
									type: "add",
									data: {
										section: title,
										payload: item,
									},
								});
							} else {
								updateFilters({
									type: "remove",
									data: {
										section: title,
										payload: item,
									},
								});
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
